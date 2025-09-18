import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CropPredictorPage from './components/CropPredictorPage';
// Note: Component imports used inside `CropPredictorPage` are not required here.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/predictor" element={<CropPredictorPage />} />
      </Routes>
    </Router>
  );
}

export default App;