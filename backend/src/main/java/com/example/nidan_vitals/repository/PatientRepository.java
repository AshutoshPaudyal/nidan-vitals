package com.example.nidan_vitals.repository;

import com.example.nidan_vitals.model.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface PatientRepository extends JpaRepository<PatientEntity, Long> {
    Optional<PatientEntity> findByPatientId(String patientId);

    @Query("SELECT p.patientId FROM PatientEntity p")
    List<String> findAllPatientIds();

    @Query("SELECT p.patientId FROM PatientEntity p WHERE LOWER(p.patientId) LIKE LOWER(CONCAT('%', :patientId, '%'))")
    List<String> findPatientIdsLike(@Param("patientId") String patientId);
}