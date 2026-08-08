import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

const LAPTOPS = [
  {
    codigo: 'C10410009',
    disponibilidad: '6h',
    slots: ['11:30–17:30 hrs'],
  },
  {
    codigo: 'C17440040',
    disponibilidad: '5h 30min',
    slots: ['09:00–10:30 hrs', '13:00–15:30 hrs'],
  },
  {
    codigo: 'C10210026',
    disponibilidad: '5h 15min',
    slots: ['08:00–10:30 hrs', '12:00–13:00 hrs', '15:00–17:30 hrs'],
    defaultSelected: '15:00–17:30 hrs',
  },
  {
    codigo: 'C50410145',
    disponibilidad: '2h',
    slots: [],
  },
  {
    codigo: 'C34641006',
    disponibilidad: '2h 40min',
    slots: [],
  },
]

export default function LaptopsDisponiblesScreen() {
  const navigate = useNavigate()
  const [open, setOpen] = useState({ C10210026: true })
  const [selected, setSelected] = useState({ C10210026: '15:00–17:30 hrs' })

  function toggle(codigo) {
    setOpen(prev => ({ ...prev, [codigo]: !prev[codigo] }))
  }

  function selectSlot(codigo, slot) {
    setSelected(prev => ({ ...prev, [codigo]: slot }))
    sessionStorage.setItem('bookit_laptop', codigo)
    sessionStorage.setItem('bookit_slot', slot)
    navigate('/horario-reserva')
  }

  return (
    <div className="screen">
      <div className="sub-header">
        <h2>Laptops disponibles</h2>
        <button className="back-link" onClick={() => navigate('/nueva-solicitud')}>← Volver</button>
      </div>

      <div className="laptops-list">
        {LAPTOPS.map(laptop => (
          <div key={laptop.codigo} className="laptop-item">
            <div className="laptop-item-header" onClick={() => toggle(laptop.codigo)}>
              <div>
                <div className="laptop-code">{laptop.codigo}</div>
                <div className="laptop-avail">Disponibilidad: &nbsp;{laptop.disponibilidad}</div>
              </div>
              <span className={`chevron ${open[laptop.codigo] ? 'open' : ''}`}>
                {open[laptop.codigo] ? '∧' : '∨'}
              </span>
            </div>

            {open[laptop.codigo] && laptop.slots.length > 0 && (
              <div className="laptop-item-body">
                {laptop.slots.map(slot => (
                  <button
                    key={slot}
                    className={`time-slot ${selected[laptop.codigo] === slot ? 'selected' : ''}`}
                    onClick={() => selectSlot(laptop.codigo, slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="info-footer">
        <span>ℹ️</span>
        <span>Cada laptop cuenta con una disponibilidad inicial de 8 horas durante el transcurso del día.</span>
      </div>

      <BottomNav />
    </div>
  )
}
