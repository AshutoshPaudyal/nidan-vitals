package com.example.nidan_vitals.repository;

import com.example.nidan_vitals.model.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PatientRepository extends JpaRepository<PatientEntity, Long> {

}