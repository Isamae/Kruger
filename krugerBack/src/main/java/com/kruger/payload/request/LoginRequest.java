package com.kruger.payload.request;

public class LoginRequest{
	private String userName;
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
	
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getUserName() {
		return userName;
	}
	
}
