package com.example.nidan_vitals.serviceimpl;

import ca.uhn.fhir.context.FhirContext;
import ca.uhn.fhir.parser.IParser;
import com.example.nidan_vitals.dtos.PatientRequestDTO;
import com.example.nidan_vitals.dtos.ResponseMessage;
import com.example.nidan_vitals.exception.InvalidFHIRPatientException;
import com.example.nidan_vitals.exception.PatientNotFoundException;
import com.example.nidan_vitals.model.PatientEntity;
import com.example.nidan_vitals.repository.PatientRepository;
import com.example.nidan_vitals.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepository patientRepository;
    private final FhirContext fhirContext = FhirContext.forR4();
    @Override
    public ResponseMessage savePatient(PatientRequestDTO request) {
        // Validate duplicate ID
        if (patientRepository.findByPatientId(request.getPatientId()).isPresent()) {
            throw new PatientNotFoundException("Patient " + request.getPatientId() + " already exists");
        }
        // Build FHIR R4 Patient Resource
        var fhirPatient = createFhirPatientResource(request);
        // Validate
        var validator = fhirContext.newValidator().validateWithResult(fhirPatient);
        if (!validator.isSuccessful()) {
            throw new InvalidFHIRPatientException("Invalid FHIR Patient: " + validator.getMessages().toString());
        }
        // Encode to JSON string
        IParser jsonParser = fhirContext.newJsonParser().setPrettyPrint(true);
        String fhirJson = jsonParser.encodeResourceToString(fhirPatient);
        // Create/Save Entity
        var patientEntity = getPatientEntity(request, fhirJson);
        patientRepository.save(patientEntity);
        // Return Success Message
        return ResponseMessage.builder()
                .message("Patient Information Saved Successfully")
                .build();
    }
    @Override
    public List<String> getAllPatientIds(String patientId) {
        return null;
    }

    private static PatientEntity getPatientEntity(PatientRequestDTO request, String fhirJson) {
        return PatientEntity.builder()
                .patientId(request.getPatientId())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .birthDate(request.getBirthDate())
                .gender(request.getGender())
                .fhirJson(fhirJson)
                .build();
    }

    private Patient createFhirPatientResource(PatientRequestDTO request) {
        var patient = new Patient();
        patient.setId(request.getPatientId());

        var name = patient.addName();
        name.setUse(HumanName.NameUse.OFFICIAL);
        name.setFamily(request.getLastName());
        name.addGiven(request.getFirstName());

        if (request.getBirthDate() != null) {
            patient.setBirthDateElement(DateType.parseV3(request.getBirthDate()));
        }

        if (request.getGender() != null) {
            patient.setGender(Enumerations.AdministrativeGender.valueOf(request.getGender().toUpperCase()));
        }

        patient.setMeta(new Meta().addProfile("http://hl7.org/fhir/StructureDefinition/Patient"));

        return patient;
    }
}
