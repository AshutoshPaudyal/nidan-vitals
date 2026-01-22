package com.example.nidan_vitals.service;

import com.example.nidan_vitals.dtos.PatientRequestDTO;
import com.example.nidan_vitals.dtos.ResponseMessage;

import java.util.List;

public interface PatientService {

    ResponseMessage savePatient(PatientRequestDTO request);

    List<String> getAllPatientIds(String patientId);
}

