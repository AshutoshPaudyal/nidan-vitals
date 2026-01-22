package com.example.nidan_vitals.enums;

public enum ObservationCategoryCode {

    VITAL_SIGNS("85353-1");

    private final String code;

    ObservationCategoryCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
