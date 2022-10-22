package com.kruger.payload.response;

import java.util.List;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private String CI;
	public List<String> roles;
	
	public JwtResponse(String accessToken, Long id, String username, String email,List<String> roles, String CI) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.CI = CI;
	}
	
	public String getAccessToken() {
		return token;
	}
	
	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}
	
	public String getTokenType() {
		return type;
	}
	
	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setCI(String cI) {
		CI = cI;
	}
	
	public String getCI() {
		return CI;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public List<String> getRoles() {
		return roles;
	}
	
	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
}
