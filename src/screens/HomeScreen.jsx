import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import Modal from '../components/Modal'

export default function HomeScreen() {
  const navigate = useNavigate()
  const [showCancelModal, setShowCancelModal] = useState(false)

  const bookingRaw = localStorage.getItem('bookit_booking')
  const [booking, setBooking] = useState(bookingRaw ? JSON.parse(bookingRaw) : null)

  useEffect(() => {
    const raw = localStorage.getItem('bookit_booking')
    setBooking(raw ? JSON.parse(raw) : null)
  }, [])

  function handleCancel() {
    localStorage.removeItem('bookit_booking')
    setBooking(null)
    setShowCancelModal(false)
  }

  const timerDisplay = booking ? '02h 30min 00s' : '05h 00min 00s'

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Book It</h1>
        <p className="subtitle">estudiante@pucp.edu.pe</p>
      </div>

      <div className="home-body">
        <div className="card">
          <h3>Mis Solicitudes</h3>
          {booking ? (
            <>
              <div className="solicitud-row">
                <span className="solicitud-label">Código de laptop</span>
                <span className="solicitud-value">{booking.codigo}</span>
              </div>
              <div className="solicitud-row">
                <span className="solicitud-label">Fecha</span>
                <span className="solicitud-value">{booking.fecha}</span>
              </div>
              <div className="solicitud-row">
                <span className="solicitud-label">Hora de inicio</span>
                <span className="solicitud-value">{booking.inicio}</span>
              </div>
              <div className="solicitud-row">
                <span className="solicitud-label">Hora de fin</span>
                <span className="solicitud-value">{booking.fin}</span>
              </div>
              <div className="solicitud-actions">
                <button className="btn-qr" onClick={() => navigate('/qr')}>
                  Ver QR &gt;&gt;
                </button>
                <button className="btn-cancel-booking" onClick={() => setShowCancelModal(true)}>
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <p className="empty-msg">¡Aún no has realizado ninguna solicitud!</p>
          )}
        </div>

        <div className="card">
          <h3>Notificaciones</h3>
          {booking && (
            <p className="notif-text">
              No olvides que tienes 10 minutos de tolerancia para recoger la laptop y no perder tu reserva.
            </p>
          )}
          <p className="timer">Tiempo restante hoy: &nbsp;<strong>{timerDisplay}</strong></p>
        </div>

        <button
          className="btn-nueva-solicitud"
          disabled={!!booking}
          onClick={() => navigate('/nueva-solicitud')}
        >
          Nueva solicitud
        </button>
      </div>

      <BottomNav />

      {showCancelModal && (
        <Modal
          message="¿Estás seguro que quieres cancelar tu reserva?"
          noLabel="No"
          yesLabel="Sí, cancelar"
          onNo={() => setShowCancelModal(false)}
          onYes={handleCancel}
        />
      )}
    </div>
  )
}
