import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function ResumenReservaScreen() {
  const navigate = useNavigate()
  const laptop = sessionStorage.getItem('bookit_laptop') || 'C10210026'
  const inicio = sessionStorage.getItem('bookit_inicio') || '15:00'
  const fin = sessionStorage.getItem('bookit_fin') || '17:30'

  const today = new Date()
  const fecha = `${String(today.getDate()).padStart(2,'0')}/${String(today.getMonth()+1).padStart(2,'0')}/${today.getFullYear()}`

  function handleSalir() {
    const booking = {
      codigo: laptop,
      fecha,
      inicio: inicio + ':00',
      fin: fin + ':00',
    }
    localStorage.setItem('bookit_booking', JSON.stringify(booking))
    sessionStorage.setItem('bookit_qr_inicio', inicio)
    sessionStorage.setItem('bookit_qr_fin', fin)
    navigate('/home')
  }

  return (
    <div className="screen">
      <div className="sub-header">
        <h2>Resumen de reserva</h2>
      </div>

      <div className="resumen-body">
        <div className="resumen-card">
          <div className="resumen-img">
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
          <div className="resumen-info">
            <div className="resumen-row">
              <strong>Laptop reservada:</strong> {laptop}
            </div>
            <div className="resumen-row">
              <strong>Horario reservado:</strong> {inicio} – {fin} hrs
            </div>
            <p className="resumen-warning">
              Recuerda: De no recoger el dispositivo después de 10 minutos de iniciado la reserva esta se cancelará automáticamente
            </p>
            <button className="btn-salir" onClick={handleSalir}>Salir</button>
          </div>
        </div>

        <div className="info-footer" style={{ margin: '4px 0 0' }}>
          <span>ℹ️</span>
          <span>No olvides devolver el dispositivo a la hora registrada en tu reserva.</span>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
