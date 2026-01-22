package com.example.nidan_vitals.repository;

import com.example.nidan_vitals.model.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PatientRepository extends JpaRepository<PatientEntity, Long> {
    Optional<PatientEntity> findByPatientId(String patientId);
}