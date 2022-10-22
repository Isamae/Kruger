package com.example.back.rest;

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

import com.kruger.models.ERole;
import com.kruger.models.Role;
import com.kruger.models.User;
import com.kruger.payload.request.LoginRequest;
import com.kruger.payload.request.SignupRequest;
import com.kruger.payload.response.JwtResponse;
import com.kruger.payload.response.MessageResponse;
import com.kruger.repositories.RoleRepository;
import com.kruger.repositories.UserRepository;
import com.kruger.security.jwt.JwtUtils;
import com.kruger.security.services.UserDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600, methods = { RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE })
@RestController
@RequestMapping("/api/auth")
public class AuthREST {
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest){
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUserName(),loginRequest.getPassword()));
		
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
	public ResponseEntity<?> registerUser(@Validated @RequestBody SignupRequest signUpRequest){
		if(userRepository.existsByUsername(signUpRequest.getCI())){
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: User is alredy taken!"));
		}
		if(userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email  is alredy in use!"));
		}
		
		if(userRepository.existsByCI(signUpRequest.getCI())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: CI  is alredy in use!"));
		}
		
		User user = new User();
		user.setName(signUpRequest.getName());
		user.setUsername(signUpRequest.getCI());
		user.setLastname(signUpRequest.getLastname());
		user.setEmail(signUpRequest.getEmail());
		user.setCI(signUpRequest.getCI());
		user.setPassword(encoder.encode(signUpRequest.getPassword()));
		
		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();
		
		if(strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error; Role is no found"));
			roles.add(userRole);
		}else {
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
			userRepository.save(user);
			
		}
		return ResponseEntity.ok(new MessageResponse("User: registered succeddfully!"));
	}

}
