import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

const VALID_USER = '20211038'
const VALID_PASS = 'pucp2024'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    if (usuario === VALID_USER && password === VALID_PASS) {
      localStorage.setItem('bookit_auth', '1')
      navigate('/home')
    } else {
      setError(true)
    }
  }

  return (
    <div className="screen login-screen">
      <div className="login-content">
        <div className="pucp-logo">
          <div className="pucp-laptop-icon">
            <div className="pucp-inner">
              <div className="pucp-emblem">
                <span>PUCP</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="book-it-title">Book It</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Escribe tu usuario PUCP *"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="input-wrapper">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña *"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPass(v => !v)}
              aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPass ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>

          <div className="remember-row">
            <input
              id="remember"
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
            />
            <label htmlFor="remember">Recordar inicio de sesión</label>
          </div>

          <button type="submit" className="btn-login">Iniciar sesión</button>
        </form>

        <button className="forgot-link" type="button">¿Olvidaste tu contraseña?</button>
      </div>

      {error && (
        <Modal
          message="Usuario o contraseña incorrectos. Vuelva a intentarlo."
          singleAction
          yesLabel="Reintentar"
          onYes={() => setError(false)}
        />
      )}
    </div>
  )
}
