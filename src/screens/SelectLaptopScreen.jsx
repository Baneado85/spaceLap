import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function SelectLaptopScreen() {
  const navigate = useNavigate()

  function selectModel(model) {
    sessionStorage.setItem('bookit_model', model)
    navigate('/laptops-disponibles')
  }

  return (
    <div className="screen">
      <div className="sub-header">
        <h2>Seleccionar Laptop</h2>
        <button className="back-link" onClick={() => navigate('/home')}>← Volver</button>
      </div>

      <div className="laptop-cards">
        <div className="laptop-card" onClick={() => selectModel('Dell')}>
          <div className="laptop-placeholder">
            <svg width="120" height="100" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="180" height="120" rx="8" fill="#1a1a1a"/>
              <rect x="20" y="20" width="160" height="100" rx="4" fill="#111"/>
              <rect x="25" y="25" width="150" height="90" rx="3" fill="#222"/>
              <rect x="60" y="130" width="80" height="8" rx="4" fill="#333"/>
              <rect x="0" y="138" width="200" height="10" rx="5" fill="#1a1a1a"/>
              <text x="100" y="75" textAnchor="middle" fill="#555" fontSize="18" fontWeight="bold" fontFamily="Arial">DELL</text>
            </svg>
          </div>
          <span className="info-icon">ℹ️</span>
        </div>

        <div className="laptop-card" onClick={() => selectModel('Lenovo')}>
          <span className="laptop-badge">Lenovo</span>
          <div className="laptop-placeholder-lenovo">
            <svg width="120" height="100" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="180" height="120" rx="8" fill="#111"/>
              <rect x="20" y="20" width="160" height="100" rx="4" fill="#0a0a0a"/>
              <rect x="25" y="25" width="150" height="90" rx="3" fill="#1a1e3a"/>
              <rect x="25" y="25" width="75" height="45" fill="#1e3a5f"/>
              <rect x="100" y="25" width="75" height="45" fill="#3a1e1e"/>
              <rect x="25" y="70" width="75" height="45" fill="#1e4a1e"/>
              <rect x="100" y="70" width="75" height="45" fill="#2a1e4a"/>
              <rect x="60" y="130" width="80" height="8" rx="4" fill="#333"/>
              <rect x="0" y="138" width="200" height="10" rx="5" fill="#111"/>
              <text x="100" y="60" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="14" fontFamily="Arial">Windows</text>
            </svg>
          </div>
          <span className="info-icon">ℹ️</span>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
