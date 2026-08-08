import { useNavigate } from 'react-router-dom'

function QRCodeSVG() {
  const cells = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,0,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],
    [1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0],
    [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,0,1,1],
    [0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1,0,1,0],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,0],
    [1,0,0,0,0,0,1,0,1,0,1,0,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,1,1,0,1,1,0,1,0],
  ]

  const size = 19
  const cellSize = 5

  return (
    <svg
      className="qr-svg"
      viewBox={`0 0 ${size * cellSize} ${size * cellSize}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={size * cellSize} height={size * cellSize} fill="white"/>
      {cells.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#111"
            />
          ) : null
        )
      )}
    </svg>
  )
}

export default function QRScreen() {
  const navigate = useNavigate()
  const inicio = sessionStorage.getItem('bookit_qr_inicio') || '15:00'
  const fin = sessionStorage.getItem('bookit_qr_fin') || '17:30'

  function calcDuration(start, end) {
    const [sh, sm] = start.split(':').map(Number)
    const [eh, em] = end.split(':').map(Number)
    const totalMin = (eh * 60 + em) - (sh * 60 + sm)
    const h = Math.floor(totalMin / 60)
    const m = totalMin % 60
    return m > 0 ? `${h}h ${m}min` : `${h}h`
  }

  const duration = calcDuration(inicio, fin)

  return (
    <div className="screen qr-screen" style={{ maxWidth: '393px' }}>
      <div className="qr-modal">
        <button className="qr-close" onClick={() => navigate('/home')}>✕</button>

        <div className="qr-times">
          <div className="qr-time-block">
            <div className="qr-time-label">INICIO</div>
            <div className="qr-time-value">{inicio}</div>
          </div>
          <div style={{ textAlign: 'center', alignSelf: 'flex-end', paddingBottom: '6px', color: '#aaa', fontSize: '12px' }}>
            {duration}
          </div>
          <div className="qr-time-block">
            <div className="qr-time-label" style={{ textAlign: 'right' }}>FIN</div>
            <div className="qr-time-value" style={{ textAlign: 'right' }}>{fin}</div>
          </div>
        </div>

        <div className="qr-divider" />

        <div className="qr-content">
          <div className="qr-alumno-info">
            <label>Alumno</label>
            <div className="name">Walter Junior<br/>Navarro Collao</div>
            <label style={{ marginTop: '10px' }}>Código</label>
            <div className="code">20211038</div>
          </div>
          <div className="qr-code-box">
            <QRCodeSVG />
          </div>
        </div>
      </div>
    </div>
  )
}
