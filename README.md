# Nidan Vitals – Full-Stack Vitals Dashboard

A full-stack Vitals Dashboard built for nurses to record patient vitals, calculate health risks (BMI) in real-time, and manage patient records using global healthcare standards (FHIR R4).

---

## Project Overview

Nidan Vitals is a clinical decision support tool for nurses. Key functionality includes:

### 1. Patient Registry (Dashboard)

- Search patients by Patient ID  
- Filter patients by health risk levels: Underweight | Normal | Overweight | Obese  
- Empty state message: "No patient found"  
- Registry table displaying Patient ID, BMI, Blood Pressure, and a color-coded status badge  

### 2. Vitals Entry Form (Real-Time Logic)

- Real-time BMI calculation (BMI = kg/m²) as height and weight are typed  
- Dynamic categorization: Underweight, Normal, Overweight, Obese  
- Visual alerts:
  - Red: BMI ≥ 30 (Obese) or Blood Pressure ≥ 140/90 (Hypertension)
  - Orange: Overweight
  - Green: Normal

### 3. Backend & Data

- FHIR R4 Observation resource compliant JSON payload  
- Patient entity to store patient details along with FHIR JSON  
- PatientVitals entity to store vitals records including BMI and blood pressure status  
- Swagger UI implemented for API exploration and testing  

---

## Technical Stack

- Frontend: React (JavaScript)
- Backend: Spring Boot (Java)
- Styling: Tailwind CSS
- Form Handling: react-hook-form
- API Documentation: Swagger (Springdoc OpenAPI)
- FHIR Compliance: Standard JSON structure for Observation resources

---

## Features

- Real-time BMI calculation and dynamic categorization  
- Patient search and filtering by health risk (Underweight → Obese)  
- Visual alerts for critical vitals  
- FHIR R4 compliant backend for interoperability  
- Swagger-based API documentation  

---

## API Endpoints

### Patient APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/fhir/patients | Create a new patient. Accepts PatientRequestDTO JSON |
| GET | /api/fhir/patients | Retrieve all patient IDs. Supports optional query param: patientId |

### Vitals APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/fhir/observation | Save a new FHIR vitals record (Observation JSON) |
| GET | /api/fhir/observation | Retrieve vitals records with search and obesity filters |

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm
- Java (JDK 17+)
- Maven

---
###  Clone the repository (develop branch)
   ```bash
   git clone -b develop "https://github.com/YOUR-USERNAME/REPO-NAME.git"
   cd REPO-NAME
```
### Frontend Setup (React + Tailwind)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
2. Install all required dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm run dev
4. Open the app at:
   ```bash
   http://localhost:5173

### Backend Setup (Spring Boot + Java)

1. Navigate to the backend folder:
   ```bash
   cd backend
2. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
3. Swagger UI is available at:
   ```bash
   http://localhost:8080/swagger-ui.html

Note: Make sure both frontend and backend servers are running simultaneously.


### Environment Variables
For development purposes, a .env file has been pushed to the repository to make local setup easier.
In production, environment variables should be configured securely and never committed.

### Visual Demo

Video / GIF demo link:
https://drive.google.com/file/d/16zdFy38VV9_kn8HxOc3yUIFqrbqgbcLE/view?usp=sharing

This demo showcases patient search, filtering, and real-time BMI calculation.

   
