package com.example.nidan_vitals.controller;

import com.example.nidan_vitals.dtos.PatientVitalsRequestDTO;
import com.example.nidan_vitals.dtos.PatientVitalsResponseDTO;
import com.example.nidan_vitals.dtos.ResponseMessage;
import com.example.nidan_vitals.service.PatientVitalsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("/api/fhir")
@RequiredArgsConstructor
public class PatientVitalsController {

    private final PatientVitalsService patientVitalsService;

    @PostMapping("/observation")
    public ResponseEntity<ResponseMessage> createPatientVitals(@Valid @RequestBody PatientVitalsRequestDTO patientVitalsRequestDTO) {
        return new ResponseEntity<>(patientVitalsService.savePatientVitals(patientVitalsRequestDTO), CREATED);
    }

    @GetMapping("/observation")
    public ResponseEntity<Page<PatientVitalsResponseDTO>> getAllPatientVitals(@RequestParam(required = false) String patientId,
                                                                              @RequestParam(required = false) String status,
                                                                              Pageable pageable) {
        return new ResponseEntity<>(patientVitalsService.getAllPatientVitals(patientId, status, pageable), OK);
    }

}
