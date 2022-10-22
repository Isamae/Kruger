package com.kruger.models;

public class InvalidDataException extends Exception {

	private static final long serialVersionUID = 1L;

	public InvalidDataException(String cause) {
		super(cause);
	}

}	