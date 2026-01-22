package com.example.nidan_vitals.controller;

import com.example.nidan_vitals.dtos.PatientRequestDTO;
import com.example.nidan_vitals.dtos.ResponseMessage;
import com.example.nidan_vitals.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/fhir")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping("/patients")
    public ResponseEntity<ResponseMessage> createPatient(@Valid @RequestBody PatientRequestDTO patientRequestDTO) {
        return new ResponseEntity<>(patientService.savePatient(patientRequestDTO), CREATED);
    }

    @GetMapping("/patients")
    public List<String> getAllPatientIds(@RequestParam(required = false) String patientId){
        return patientService.getAllPatientIds(patientId);
    }

}
