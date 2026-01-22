package com.example.nidan_vitals.service;

import com.example.nidan_vitals.dtos.PatientVitalsRequestDTO;
import com.example.nidan_vitals.dtos.PatientVitalsResponseDTO;
import com.example.nidan_vitals.dtos.ResponseMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PatientVitalsService {
    ResponseMessage savePatientVitals(PatientVitalsRequestDTO request);

    Page<PatientVitalsResponseDTO> getAllPatientVitals(String patientId, String status, Pageable pageable);
}
