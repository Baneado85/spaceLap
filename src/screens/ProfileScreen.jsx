import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import Modal from '../components/Modal'

export default function ProfileScreen() {
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  function handleLogout() {
    localStorage.removeItem('bookit_auth')
    localStorage.removeItem('bookit_booking')
    navigate('/login')
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1>Book It</h1>
        <p className="subtitle">estudiante@pucp.edu.pe</p>
      </div>

      <div className="profile-body">
        <div className="avatar">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>

        <p className="profile-name">NAVARRO COLLAO WALTER JUNIOR</p>
        <p className="profile-code">20211038</p>
        <p className="profile-faculty">FACULTAD CIENCIAS E INGENIERÍA</p>
        <p className="profile-faculty">INGENIERÍA INFORMÁTICA</p>

        <button className="btn-logout" onClick={() => setShowLogoutModal(true)}>
          Cerrar sesión
        </button>
      </div>

      <BottomNav />

      {showLogoutModal && (
        <Modal
          message="¿Estas seguro que deseas cerrar sesión?"
          noLabel="No"
          yesLabel="Cerrar sesión"
          onNo={() => setShowLogoutModal(false)}
          onYes={handleLogout}
        />
      )}
    </div>
  )
}
