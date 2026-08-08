export default function Modal({ message, onNo, onYes, yesLabel = 'Sí, cancelar', noLabel = 'No', singleAction }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        {singleAction ? (
          <button className="modal-btn-single" onClick={onYes}>{yesLabel}</button>
        ) : (
          <div className="modal-actions">
            <button className="modal-btn-no" onClick={onNo}>{noLabel}</button>
            <button className="modal-btn-yes" onClick={onYes}>{yesLabel}</button>
          </div>
        )}
      </div>
    </div>
  )
}
