package com.vacunado.back.security.jwt;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.vacunado.back.security.services.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;


@Component
public class JwtUtils {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
	
	private String jwtSecrect = "krugerSecretKey";
	private int jwtExpirationMs = 86400000;
	
	public String generateJwtToken(Authentication authentication) {
		UserDetailsImpl userPrincipal = (UserDetailsImpl)authentication.getPrincipal();
		
		return Jwts.builder()
				.setSubject(userPrincipal.getUsername())
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512,jwtSecrect)
				.compact();
	}
	
	public String getUserNameFromJwtToken(String token) {
		return Jwts.parser().setSigningKey(jwtSecrect).parseClaimsJws(token).getBody().getSubject();
	}
	
	public boolean validateJwtToken(String authtoken) {
		try {
			Jwts.parser().setSigningKey(jwtSecrect).parseClaimsJws(authtoken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature:{}",e.getMessage());
		}
		catch (MalformedJwtException e) {
			logger.error("Invalid JWT token:{}",e.getMessage());
		}
		catch (ExpiredJwtException e) {
			logger.error("JWT token is expired:{}",e.getMessage());
		}
		catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported:{}",e.getMessage());
		}
		catch (IllegalArgumentException e) {
			logger.error("JWT claims string empy:{}",e.getMessage());
		}
		return false;
	}
}
