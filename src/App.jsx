import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import SelectLaptopScreen from './screens/SelectLaptopScreen'
import LaptopsDisponiblesScreen from './screens/LaptopsDisponiblesScreen'
import HorarioReservaScreen from './screens/HorarioReservaScreen'
import ResumenReservaScreen from './screens/ResumenReservaScreen'
import QRScreen from './screens/QRScreen'
import ProfileScreen from './screens/ProfileScreen'

function PrivateRoute({ children }) {
  const auth = localStorage.getItem('bookit_auth')
  return auth ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <div className="app-shell">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/home" element={<PrivateRoute><HomeScreen /></PrivateRoute>} />
          <Route path="/nueva-solicitud" element={<PrivateRoute><SelectLaptopScreen /></PrivateRoute>} />
          <Route path="/laptops-disponibles" element={<PrivateRoute><LaptopsDisponiblesScreen /></PrivateRoute>} />
          <Route path="/horario-reserva" element={<PrivateRoute><HorarioReservaScreen /></PrivateRoute>} />
          <Route path="/resumen" element={<PrivateRoute><ResumenReservaScreen /></PrivateRoute>} />
          <Route path="/qr" element={<PrivateRoute><QRScreen /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
