package com.example.nidan_vitals.dtos;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientVitalsResponseDTO {
    private String patientId;
    private Double heightInCm;
    private Double weightInKg;
    private Double bmi;
    private Integer systolicBP;
    private Integer diastolicBP;
    private String bmiStatus;
    private String bloodPressureStatus;
    private Instant recordedAt;
}
