package com.example.nidan_vitals.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Entity
@Table(name = "patient_vitals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class PatientVitals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)  // DB column for the link
    private PatientEntity patientEntity;

    @Column(nullable = false)
    private Double heightInCm; // in cm

    @Column(nullable = false)
    private Double weightInKg; // in kg

    @Column(nullable = false)
    private Double bmi;

    @Column(nullable = false)
    private String bmiStatus;

    @Column(nullable = false)
    private Integer systolicBP;

    @Column(nullable = false)
    private Integer diastolicBP;

    @Column(nullable = false)
    private String bloodPressureStatus;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String fhirJson; // Store the complete FHIR Observation JSON

    @Column(nullable = false)
    @CreatedDate
    private Instant recordedAt;

}