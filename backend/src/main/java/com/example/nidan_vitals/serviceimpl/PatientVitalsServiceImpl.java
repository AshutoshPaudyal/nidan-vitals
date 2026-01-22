package com.example.nidan_vitals.serviceimpl;

import ca.uhn.fhir.context.FhirContext;
import com.example.nidan_vitals.dtos.PatientVitalsRequestDTO;
import com.example.nidan_vitals.dtos.PatientVitalsResponseDTO;
import com.example.nidan_vitals.dtos.ResponseMessage;
import com.example.nidan_vitals.enums.ObservationCategoryCode;
import com.example.nidan_vitals.enums.VitalSignCode;
import com.example.nidan_vitals.exception.InvalidFHIRObservationException;
import com.example.nidan_vitals.exception.PatientNotFoundException;
import com.example.nidan_vitals.model.PatientVitals;
import com.example.nidan_vitals.repository.PatientRepository;
import com.example.nidan_vitals.repository.PatientVitalsRepository;
import com.example.nidan_vitals.service.PatientVitalsService;
import lombok.RequiredArgsConstructor;
import org.hl7.fhir.r4.model.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientVitalsServiceImpl implements PatientVitalsService {

    private final PatientVitalsRepository patientVitalsRepository;
    private final PatientRepository patientRepository;
    private final FhirContext fhirContext = FhirContext.forR4();

    @Override
    public ResponseMessage savePatientVitals(PatientVitalsRequestDTO request) {
        // Validate Patient exists
        var patientEntity = patientRepository.findByPatientId(request.getPatientId())
                .orElseThrow(() -> new PatientNotFoundException("Patient " + request.getPatientId() + " does not exist"));

        // Build FHIR R4 Observation (using frontend BMI)
        var fhirObservation = createFhirObservationResource(request);

        // Validate FHIR
        var validator = fhirContext.newValidator().validateWithResult(fhirObservation);
        if (!validator.isSuccessful()) {
            throw new InvalidFHIRObservationException("Invalid FHIR Observation: " + validator.getMessages().toString());
        }

        // Encode to JSON
        var jsonParser = fhirContext.newJsonParser().setPrettyPrint(true);
        var fhirJson = jsonParser.encodeResourceToString(fhirObservation);

        // Save Entity
        var patientVitals = PatientVitals.builder().patientEntity(patientEntity).heightInCm(request.getHeightInCm())
                .weightInKg(request.getWeightInKg())
                .bmi(request.getBmi())
                .systolicBP(request.getSystolicBP())
                .diastolicBP(request.getDiastolicBP())
                .bmiStatus(request.getBmiStatus().toUpperCase())
                .bloodPressureStatus(request.getBloodPressureStatus().toUpperCase())
                .fhirJson(fhirJson)
                .build();
        patientVitalsRepository.save(patientVitals);

        return ResponseMessage.builder().message("Patient Vitals added successfully").build();
    }

    @Override
    public Page<PatientVitalsResponseDTO> getAllPatientVitals(String patientId, String status, Pageable pageable) {
        return null;
    }

    private Observation createFhirObservationResource(PatientVitalsRequestDTO request) {
        Observation observation = new Observation();
        observation.setStatus(Observation.ObservationStatus.FINAL);

        // Code
        var code = new CodeableConcept();
        code.addCoding()
                .setSystem("http://loinc.org")
                .setCode(ObservationCategoryCode.VITAL_SIGNS.getCode())
                .setDisplay("Vital signs, weight, height, and BMI panel");
        code.setText("Vital Signs Panel");
        observation.setCode(code);

        // Category
        var category = new CodeableConcept();
        category.addCoding()
                .setSystem("http://terminology.hl7.org/CodeSystem/observation-category")
                .setCode("vital-signs")
                .setDisplay("Vital Signs");
        observation.addCategory(category);

        // Subject
        var subject = new Reference();
        subject.setReference("Patient/" + request.getPatientId());
        observation.setSubject(subject);

        // Effective time
        observation.setEffective(new DateTimeType(Date.from(Instant.now())));

        // Components
        observation.setComponent(createComponents(request.getHeightInCm(), request.getWeightInKg(), request.getBmi(),
                request.getSystolicBP(), request.getDiastolicBP()));

        return observation;
    }

    private List<Observation.ObservationComponentComponent> createComponents(double height, double weight, double bmi, int systolic, int diastolic) {
        List<Observation.ObservationComponentComponent> components = new ArrayList<>();

        components.add(createComponent(VitalSignCode.HEIGHT.getCode(), "Body height", height, "cm", "cm"));
        components.add(createComponent(VitalSignCode.WEIGHT.getCode(), "Body weight", weight, "kg", "kg"));
        components.add(createComponent(VitalSignCode.BMI.getCode(), "Body mass index", bmi, "kg/m2", "kg/m2"));
        components.add(createComponent(VitalSignCode.SYSTOLIC_BLOOD_PRESSURE.getCode(), "Systolic blood pressure", systolic, "mm[Hg]", "mmHg"));
        components.add(createComponent(VitalSignCode.DIASTOLIC_BLOOD_PRESSURE.getCode(), "Diastolic blood pressure", diastolic, "mm[Hg]", "mmHg"));

        return components;
    }

    private Observation.ObservationComponentComponent createComponent(String loincCode, String display, double value, String unitCode, String unit) {
        Observation.ObservationComponentComponent component = new Observation.ObservationComponentComponent();

        var code = new CodeableConcept();
        code.addCoding().setSystem("http://loinc.org").setCode(loincCode).setDisplay(display);
        component.setCode(code);

        var quantity = new Quantity();
        quantity.setValue(value).setUnit(unit).setSystem("http://unitsofmeasure.org").setCode(unitCode);
        component.setValue(quantity);

        return component;
    }

}
