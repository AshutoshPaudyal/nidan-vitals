package com.example.nidan_vitals.exception;

public class InvalidFHIRObservationException extends RuntimeException{

    public InvalidFHIRObservationException(String message) {
        super(message);
    }
}
