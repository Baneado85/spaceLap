import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function HorarioReservaScreen() {
  const navigate = useNavigate()
  const slot = sessionStorage.getItem('bookit_slot') || '15:00–17:30 hrs'
  const parts = slot.replace(' hrs', '').split('–')
  const [inicio, setInicio] = useState(parts[0] || '15:00')
  const [fin, setFin] = useState(parts[1] || '17:30')

  function handleAceptar() {
    sessionStorage.setItem('bookit_inicio', inicio)
    sessionStorage.setItem('bookit_fin', fin)
    navigate('/resumen')
  }

  return (
    <div className="screen">
      <div className="sub-header">
        <h2>Horario de reserva</h2>
        <button className="back-link" onClick={() => navigate('/laptops-disponibles')}>← Volver</button>
      </div>

      <div className="horario-body">
        <div className="horario-card">
          <div className="horario-img">
            <svg width="200" height="140" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5" width="190" height="110" rx="8" fill="#111"/>
              <rect x="15" y="15" width="170" height="90" rx="4" fill="#0a0a0a"/>
              <rect x="20" y="20" width="160" height="80" rx="3" fill="#1a1e3a"/>
              <rect x="20" y="20" width="80" height="40" fill="#1e3a5f"/>
              <rect x="100" y="20" width="80" height="40" fill="#3a1e1e"/>
              <rect x="20" y="60" width="80" height="40" fill="#1e4a1e"/>
              <rect x="100" y="60" width="80" height="40" fill="#2a1e4a"/>
              <rect x="65" y="115" width="70" height="6" rx="3" fill="#333"/>
              <rect x="0" y="121" width="200" height="8" rx="4" fill="#111"/>
              <text x="7" y="132" fill="#E3000F" fontSize="9" fontWeight="bold" fontFamily="Arial">Lenovo</text>
            </svg>
          </div>
          <div className="horario-form">
            <div className="horario-format-label">Formato de 24 horas</div>
            <div className="horario-field">
              <label>Ingrese la hora de inicio:</label>
              <input
                type="text"
                value={inicio}
                onChange={e => setInicio(e.target.value)}
                maxLength={5}
              />
            </div>
            <div className="horario-field">
              <label>Ingrese la hora de fin:</label>
              <input
                type="text"
                value={fin}
                onChange={e => setFin(e.target.value)}
                maxLength={5}
              />
            </div>
            <button className="btn-aceptar" onClick={handleAceptar}>Aceptar</button>
          </div>
        </div>

        <div className="info-footer" style={{ margin: '12px 0 0' }}>
          <span>ℹ️</span>
          <span>Selecciona tu horario de reserva según los horarios disponibles.</span>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
