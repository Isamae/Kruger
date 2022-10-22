package com.vacunado.back.rest;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vacunado.back.models.ERole;
import com.vacunado.back.models.Role;
import com.vacunado.back.models.User;
import com.vacunado.back.payload.request.LoginRequest;
import com.vacunado.back.payload.response.JwtResponse;
import com.vacunado.back.payload.response.MessageResponse;
import com.vacunado.back.repositories.RoleRepository;
import com.vacunado.back.security.jwt.JwtUtils;
import com.vacunado.back.security.services.UserDetailsImpl;
import com.vacunado.back.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600, methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/api/auth")
public class AuthREST {
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserService userService;
	
	@Autowired
	RoleRepository roleRepository; 
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest){
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		return ResponseEntity.ok(new JwtResponse(jwt,
				userDetails.getId(),
				userDetails.getUsername(),
				userDetails.getEmail(),
				roles,
				userDetails.getCI()));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Validated @RequestBody String signUpRequest) throws JsonMappingException, JsonProcessingException{
		
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode jsonNode = objectMapper.readTree(signUpRequest);
		
		if(!userService.findByEmail(jsonNode.get("email").asText()).isEmpty() ) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already taken!"));
		}
		
		if(!userService.findByCI(jsonNode.get("CI").asText()).isEmpty()) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: CI is already taken!"));
		}
		
		User user = new User();
		user.setName(jsonNode.get("name").asText());
		user.setUsername(jsonNode.get("CI").asText());
		user.setLastname(jsonNode.get("lastname").asText());
		user.setEmail(jsonNode.get("email").asText());
		user.setCI(jsonNode.get("CI").asText());
		user.setPassword(encoder.encode(jsonNode.get("password").asText()));
		
		Set<String> strRoles = new HashSet<>();
		strRoles.add("user");
		strRoles.add("admin");
		Set<Role> roles = new HashSet<>();
		strRoles.forEach(role -> {
			switch(role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error:Role is no found"));
					roles.add(adminRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
						.orElseThrow(()-> new RuntimeException("Error:Role is no found"));
					roles.add(userRole);
			}
		});
		
		user.setRoles(roles);
		userService.save(user);
		return ResponseEntity.ok(new MessageResponse ("User registered successfully!"));

	}

}
