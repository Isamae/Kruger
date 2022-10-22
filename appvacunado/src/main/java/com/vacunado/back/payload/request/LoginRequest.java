package com.vacunado.back.payload.request;

public class LoginRequest{
	private String username;
	private String CI;
	private String password;
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	public void setCI(String cI) {
		CI = cI;
	}
	
	public String getCI() {
		return CI;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
}
