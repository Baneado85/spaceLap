import React from 'react';

interface LogoutModalProps {
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onConfirmLogout }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in duration-150">
      <div className="bg-[#e5e7eb] rounded-3xl w-full max-w-xs shadow-2xl overflow-hidden border border-white/60 animate-in zoom-in-95 duration-150">
        <div className="p-6 text-center">
          <p className="text-sm font-semibold text-slate-800 leading-snug">
            ¿Estas seguro que deseas cerrar sesión?
          </p>
        </div>

        {/* Action Buttons styled like iOS / Figma dialog */}
        <div className="grid grid-cols-2 border-t border-slate-300 divide-x divide-slate-300 text-xs">
          <button
            onClick={onClose}
            className="py-3.5 text-blue-600 font-normal hover:bg-slate-300/40 active:bg-slate-300/60 transition-colors"
          >
            No
          </button>
          <button
            onClick={onConfirmLogout}
            className="py-3.5 text-blue-600 font-semibold hover:bg-slate-300/40 active:bg-slate-300/60 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
