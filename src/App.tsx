import React, { useState, useEffect } from 'react';
import { TabType, BookingRequest, Laptop } from './types';
import { currentUser, initialRequests } from './data/mockData';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { RequestsHistory } from './components/RequestsHistory';
import { ProfileScreen } from './components/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { NewBookingWizard } from './components/NewBookingWizard';
import { LaptopDetailScreen } from './components/LaptopDetailScreen';
import { LogoutModal } from './components/LogoutModal';
import { Smartphone, Monitor, ShieldCheck, Wifi } from 'lucide-react';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('spacelap_auth') === 'true';
  });

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [bookingInitialLaptop, setBookingInitialLaptop] = useState<Laptop | null>(null);
  const [detailLaptop, setDetailLaptop] = useState<Laptop | null>(null);
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
    <div className="min-h-screen bg-[#050609] flex flex-col items-center justify-center p-0 sm:p-6 select-none relative font-sans text-white">
      {/* Desktop view mode switcher */}
      <div className="hidden sm:flex items-center space-x-2 fixed top-4 right-4 z-50 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs text-slate-300 shadow-2xl">
        <span className="font-extrabold text-[#00F0FF] mr-1">Vista SpaceLap:</span>
        <button
          onClick={() => setIsPhoneFrame(true)}
          className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 font-bold transition-all ${
            isPhoneFrame
              ? 'bg-[#00F0FF] text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'hover:bg-slate-800 text-slate-400'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Vista Móvil</span>
        </button>
        <button
          onClick={() => setIsPhoneFrame(false)}
          className={`px-3 py-1.5 rounded-full flex items-center space-x-1.5 font-bold transition-all ${
            !isPhoneFrame
              ? 'bg-[#00F0FF] text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]'
              : 'hover:bg-slate-800 text-slate-400'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Pantalla Completa</span>
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full bg-[#090A0F] flex flex-col overflow-hidden transition-all duration-300 relative ${
          isPhoneFrame
            ? 'phone-frame'
            : 'min-h-screen max-w-md rounded-3xl shadow-2xl border border-white/10'
        }`}
      >
        {!isAuthenticated ? (
          <LoginScreen onLogin={handleLogin} />
        ) : (
          <div className="flex flex-col h-full w-full bg-[#090A0F] overflow-hidden">
            {/* Top Bar Header */}
            <Header user={currentUser} />

            {/* View Content */}
            <main className="flex-1 overflow-hidden flex flex-col relative bg-[#090A0F]">
              {activeTab === 'home' && (
                <Dashboard
                  activeRequest={requests.find((r) => r.status === 'active') ?? null}
                  user={currentUser}
                  onOpenNewBooking={() => setIsNewBookingOpen(true)}
                  onCancelRequest={handleCancelRequest}
                  onSelectFeaturedLaptop={(laptop) => setDetailLaptop(laptop)}
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

            {/* Bottom Navigation Bar */}
            <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
          </div>
        )}
      </div>

      {/* Laptop Detail Screen (Movie Detail Screen Dribbble) */}
      {detailLaptop && (
        <LaptopDetailScreen
          laptop={detailLaptop}
          onClose={() => setDetailLaptop(null)}
          onReserve={(laptop) => {
            setBookingInitialLaptop(laptop);
            setDetailLaptop(null);
            setIsNewBookingOpen(true);
          }}
        />
      )}

      {/* New Booking Wizard Modal (Station Seat Grid Screen Dribbble) */}
      {isNewBookingOpen && (
        <NewBookingWizard
          initialLaptop={bookingInitialLaptop}
          onClose={() => {
            setIsNewBookingOpen(false);
            setBookingInitialLaptop(null);
          }}
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
