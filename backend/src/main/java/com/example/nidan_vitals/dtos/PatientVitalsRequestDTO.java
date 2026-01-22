package com.example.nidan_vitals.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientVitalsRequestDTO {
    @NotBlank(message = "Patient ID is required")
    private String patientId;

    @NotNull(message = "Height is required")
    @Positive(message = "Height must be a positive number")
    private Double heightInCm;

    @NotNull(message = "Weight is required")
    @Positive(message = "Weight must be a positive number")
    private Double weightInKg;

    @NotNull(message = "BMI is required")
    @Positive(message = "BMI must be a positive number")
    private Double bmi;

    @NotNull(message = "Systolic BP is required")
    @Positive(message = "Systolic BP must be a positive number")
    private Integer systolicBP;

    @NotNull(message = "Diastolic BP is required")
    @Positive(message = "Diastolic BP must be a positive number")
    private Integer diastolicBP;

    @NotBlank(message = "BMI status is required")
    private String bmiStatus;

    @NotBlank(message = "Blood pressure status is required")
    private String bloodPressureStatus;
}
