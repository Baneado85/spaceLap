import React from 'react';

interface LogoutModalProps {
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ onClose, onConfirmLogout }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 text-white">
      <div className="bg-slate-900 border border-white/20 rounded-3xl w-full max-w-xs shadow-2xl overflow-hidden text-center p-6 space-y-4">
        <p className="text-sm font-bold text-slate-200">
          ¿Estás seguro que deseas cerrar sesión en SpaceLap?
        </p>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            No
          </button>
          <button
            onClick={onConfirmLogout}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
