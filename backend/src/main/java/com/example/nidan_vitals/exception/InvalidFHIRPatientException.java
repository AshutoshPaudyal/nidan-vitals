package com.example.nidan_vitals.exception;

public class InvalidFHIRPatientException extends RuntimeException{

    public InvalidFHIRPatientException(String message) {
        super(message);
    }
}
