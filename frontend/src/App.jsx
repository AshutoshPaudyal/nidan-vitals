import './App.css'
import PatientRegistryDashboard from "./pages/PatientRegistryDashboard.jsx";
import {Routes,Route} from "react-router-dom";
import AddPatient from "./pages/AddPatient.jsx";
import AddVitals from "./pages/AddVitals.jsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<PatientRegistryDashboard/>}/>
          <Route path="/add-patient" element={<AddPatient/>}/>
          <Route path="/add-vitals" element={<AddVitals/>}/>
      </Routes>
  )
}

export default App
