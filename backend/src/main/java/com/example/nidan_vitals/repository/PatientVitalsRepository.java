package com.example.nidan_vitals.repository;

import com.example.nidan_vitals.model.PatientVitals;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientVitalsRepository extends JpaRepository<PatientVitals,Long> {
}
