import './App.css'
import PatientRegistryDashboard from "./pages/PatientRegistryDashboard.jsx";
import {Routes,Route} from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<PatientRegistryDashboard/>}/>
      </Routes>
  )
}

export default App
