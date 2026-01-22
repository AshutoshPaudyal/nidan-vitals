package com.example.nidan_vitals.enums;

public enum VitalSignCode {
    BMI("39156-5"),
    WEIGHT("29463-7"),
    HEIGHT("8302-2"),
    SYSTOLIC_BLOOD_PRESSURE("8480-6"),
    DIASTOLIC_BLOOD_PRESSURE("8462-4");
    private final String code;

    VitalSignCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
