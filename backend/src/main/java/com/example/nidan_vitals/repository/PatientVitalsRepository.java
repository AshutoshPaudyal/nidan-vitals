package com.example.nidan_vitals.repository;

import com.example.nidan_vitals.model.PatientVitals;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientVitalsRepository extends JpaRepository<PatientVitals,Long> {
    Page<PatientVitals> findAllByPatientEntity_PatientIdContainingIgnoreCaseOrderByRecordedAtDesc(String patientId, Pageable pageable);

    Page<PatientVitals> findAllByBmiStatusOrderByRecordedAtDesc(String status, Pageable pageable);

    Page<PatientVitals> findAllByPatientEntity_PatientIdContainingIgnoreCaseAndBmiStatusOrderByRecordedAtDesc(String patientId, String status, Pageable pageable);
}
