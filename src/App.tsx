import React, { useState, useEffect } from 'react';
import { TabType, BookingRequest } from './types';
import { currentUser, initialRequests } from './data/mockData';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RequestsHistory } from './components/RequestsHistory';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { NewBookingWizard } from './components/NewBookingWizard';
import { LogoutModal } from './components/LogoutModal';
import { Smartphone, Monitor } from 'lucide-react';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('spacelap_auth') === 'true';
  });

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);

  const [requests, setRequests] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem('spacelap_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialRequests;
      }
    }
    return initialRequests;
  });

  useEffect(() => {
    localStorage.setItem('spacelap_requests', JSON.stringify(requests));
  }, [requests]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('spacelap_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
    localStorage.removeItem('spacelap_auth');
  };

  const handleAddRequest = (newReq: BookingRequest) => {
    setRequests((prev) => [newReq, ...prev]);
  };

  const handleCancelRequest = (id: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'cancelled' } : req))
    );
  };

  return (
    <div className="min-h-screen bg-[#0b1329] flex flex-col items-center justify-center p-0 sm:p-6 select-none relative font-sans">
      {/* Desktop view mode toggle */}
      <div className="hidden sm:flex items-center space-x-2 fixed top-4 right-4 z-50 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 shadow-lg">
        <span className="font-semibold text-blue-300 mr-1">Vista SpaceLap:</span>
        <button
          onClick={() => setIsPhoneFrame(true)}
          className={`p-1.5 rounded-lg flex items-center space-x-1 transition-colors ${
            isPhoneFrame ? 'bg-[#002B66] text-white' : 'hover:bg-slate-700 text-slate-400'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Móvil (Figma)</span>
        </button>
        <button
          onClick={() => setIsPhoneFrame(false)}
          className={`p-1.5 rounded-lg flex items-center space-x-1 transition-colors ${
            !isPhoneFrame ? 'bg-[#002B66] text-white' : 'hover:bg-slate-700 text-slate-400'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Pantalla Completa</span>
        </button>
      </div>

      {/* Main Application Container */}
      <div
        className={`w-full bg-[#F3F4F6] flex flex-col overflow-hidden transition-all duration-300 relative ${
          isPhoneFrame
            ? 'phone-frame'
            : 'min-h-screen max-w-4xl rounded-2xl shadow-2xl border border-slate-800'
        }`}
      >
        {!isAuthenticated ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <div className="flex flex-col h-full w-full bg-[#F3F4F6] overflow-hidden">
            {/* Top Bar / Header */}
            <Header user={currentUser} />

            {/* Dynamic View Content based on Tab */}
            <main className="flex-1 overflow-hidden flex flex-col relative">
              {activeTab === 'home' && (
                <Dashboard
                  requests={requests}
                  onOpenNewBooking={() => setIsNewBookingOpen(true)}
                  onSelectRequest={() => setActiveTab('requests')}
                />
              )}

              {activeTab === 'requests' && (
                <RequestsHistory
                  requests={requests}
                  onCancelRequest={handleCancelRequest}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileScreen
                  user={currentUser}
                  onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
                />
              )}
            </main>

            {/* Bottom Navigation */}
            <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
          </div>
        )}
      </div>

      {/* New Booking Wizard Modal */}
      {isNewBookingOpen && (
        <NewBookingWizard
          onClose={() => setIsNewBookingOpen(false)}
          onAddRequest={handleAddRequest}
        />
      )}

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <LogoutModal
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirmLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
