import React, { useState, useEffect } from 'react';
import { bookingsAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Calendar, MapPin, Download, QrCode, AlertTriangle, ShieldCheck } from 'lucide-react';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPass, setSelectedPass] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await bookingsAPI.getHistory();
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#00f2fe] border-r-transparent border-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030303] pt-28 pb-20 overflow-hidden">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron font-extrabold text-3xl text-slate-100 mb-2 tracking-wider">
            BOARDING PASS LEDGER
          </h1>
          <p className="text-[10px] text-[#00f2fe] text-glow-cyan font-orbitron tracking-widest uppercase">VIP Clearance Booking History</p>
        </div>

        {/* --- Booking Cards Grid --- */}
        <div className="max-w-4xl mx-auto space-y-6">
          {bookings.map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative"
            >
              {/* Highlight bar based on status */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] ${book.status === 'confirmed' ? 'bg-green-500' : book.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                {/* Product & Event details */}
                <div className="space-y-4 flex-grow">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-orbitron font-extrabold text-sm text-slate-200">
                      {book.Product?.name} Model
                    </span>
                    <span className="px-2 py-0.5 rounded border border-slate-800 bg-slate-900 text-slate-450 font-mono text-[10px]">
                      {book.Product?.kw_capacity} KW
                    </span>
                    
                    {/* Status Pill badges */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-orbitron font-bold uppercase tracking-wider ${
                      book.status === 'confirmed' 
                        ? 'border border-green-500/30 bg-green-500/10 text-green-400' 
                        : book.status === 'pending' 
                        ? 'border border-yellow-500/30 bg-yellow-500/10 text-yellow-400' 
                        : 'border border-red-500/30 bg-red-500/10 text-red-400'
                    }`}>
                      {book.status}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-400">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>
                        {new Date(book.Event?.date).toLocaleDateString('en-US', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{book.Event?.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Ledger actions & codes */}
                <div className="w-full md:w-auto shrink-0 flex flex-col items-start md:items-end justify-between self-stretch md:self-auto border-t border-slate-800/60 md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right mb-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-orbitron">Booking ID</p>
                    <p className="font-mono text-xs text-slate-350 mt-1 select-all">{book.booking_id}</p>
                  </div>

                  {book.status === 'confirmed' && book.Pass && (
                    <div className="flex items-center space-x-3 w-full md:w-auto">
                      <button
                        onClick={() => setSelectedPass(book.Pass)}
                        className="flex-1 md:flex-none px-4 py-2 bg-slate-900 border border-slate-800 rounded font-orbitron text-xs text-[#00f2fe] hover:bg-slate-800 transition-colors flex items-center justify-center space-x-1.5"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>INSPECT QR</span>
                      </button>

                      {/* PDF download direct relative link to backend static folder */}
                      <a
                        href={book.Pass.pdf_url}
                        download={`Boarding_Pass_${book.booking_id}.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 md:flex-none px-4 py-2 bg-[#00f2fe] hover:bg-[#4facfe] text-slate-950 rounded font-orbitron text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-lg shadow-cyan-500/10"
                      >
                        <Download className="w-4 h-4" />
                        <span>DOWNLOAD PDF</span>
                      </a>
                    </div>
                  )}

                  {book.status === 'pending' && (
                    <div className="flex items-center space-x-2 border border-yellow-500/20 bg-yellow-500/5 rounded-lg px-3.5 py-2 text-xs text-yellow-400 w-full md:w-auto">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Awaiting transaction verification...</span>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}

          {/* --- Empty State Pass ledger --- */}
          {bookings.length === 0 && (
            <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl glass-panel">
              <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="font-orbitron text-base text-slate-300 mb-2">NO RESERVED PASSES FOUND</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                You have not booked any launch event clearance passes yet. Browse showroom models to reserve access.
              </p>
              <Link to="/products" className="btn-cyber inline-block px-6 py-2.5 rounded text-xs mt-6">
                EXPLORE SHOWROOM
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* --- QR Code Inspector Dialog Overlay --- */}
      <AnimatePresence>
        {selectedPass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPass(null)}
              className="absolute inset-0 bg-[#030303]/95 backdrop-blur-md"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-slate-950 border border-cyan-500/40 glow-shadow-cyan rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-center"
            >
              {/* Decorative top frame */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-orbitron font-extrabold text-sm text-[#00f2fe] text-glow-cyan flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>VIP CLEARANCE SECURITY BADGE</span>
                </span>
                <button
                  onClick={() => setSelectedPass(null)}
                  className="p-1 rounded hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* QR Container */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl max-w-[200px] mx-auto mb-6 flex items-center justify-center shadow-lg">
                <img 
                  src={selectedPass.qr_code_url} 
                  alt={`Clearance Code ${selectedPass.pass_id}`} 
                  className="w-full h-auto"
                />
              </div>

              <div className="text-left text-xs bg-slate-900/50 border border-slate-850 p-4 rounded-xl space-y-2 mb-6">
                <p>Security Code: <span className="text-slate-200 font-mono font-bold float-right select-all">{selectedPass.pass_id}</span></p>
                <p>Authority: <span className="text-[#00f2fe] font-bold font-orbitron float-right">LEVEL-1 CLEARANCE</span></p>
                <p>Status: <span className="text-green-400 font-bold float-right">ACTIVE VALID TICKET</span></p>
              </div>

              <button
                onClick={() => setSelectedPass(null)}
                className="w-full btn-cyber py-3 rounded text-xs font-bold"
              >
                DISMISS BADGE
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BookingHistory;
