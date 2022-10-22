package com.kruger.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kruger.models.User;

public class UserDetailsImpl implements UserDetails{
	private static final long serialVersionUID = 1L;
	
	private long id;
	private String username;
	private String email;
	private String CI;
	
	@JsonIgnore
	private String password;
	private Collection<? extends GrantedAuthority> authorities;
	
	public UserDetailsImpl(Long id, String username, String email, String password, String CI,Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
		this.CI = CI;
	}
	
	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());
		return new UserDetailsImpl(
				user.getId(), 
				user.getUserName(), 
				user.getEmail(), 
				user.getPassword(),
				user.getCI(), 
				authorities);
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities(){
		return authorities;
	}
	
	public String getCI() {
		return CI;
	}
	
	public String getEmail() {
		return email;
	}
	
	public long getId() {
		return id;
	}
	
	public String getPassword() {
		return password;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	
	public void setCI(String cI) {
		this.CI = cI;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	@Override
	public boolean equals(Object o) {
		if(this == o) {
			return true;
		}
		if( o == null || getClass() != o.getClass())
			return false;
		
		UserDetailsImpl user =(UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}
	
	
	
}
