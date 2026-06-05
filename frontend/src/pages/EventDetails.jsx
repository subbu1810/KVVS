import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventAPI } from '../services/api';
import { Calendar, MapPin, Ticket, ShieldCheck, Clock, Users } from 'lucide-react';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventAPI.getActive();
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to load event details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  const agenda = [
    { time: '09:30 AM', title: 'Security Clearances & Registration Check-in', desc: 'Verify VIP QR boarding passes at entrance security checkpoints. Level-1 badge issuance.' },
    { time: '10:30 AM', title: 'Keynote: Engineering Perpetual Neodymium Stators', desc: 'Zero-point energy physics seminar by leading researchers. Highlighting Vortex polar repulsion equations.' },
    { time: '11:45 AM', title: 'Live Unveiling: 2KW, 5KW & 10KW Vortex Series', desc: 'First live public demonstration of magnetic generator cores powering continuous residential loads without external fuels.' },
    { time: '01:00 PM', title: 'Laboratory Cell Access & Hands-On Testing', desc: 'Attendees visit active thermal cells and review real-time electrical flux analytics and convection loops.' },
    { time: '02:30 PM', title: 'Preorder Reservations Priority Queueing', desc: 'Exclusive booking priority desk registers confirmed attendees to priority production-run queue slots.' }
  ];

  const speakers = [
    { name: 'Dr. Evelyn Carter', role: 'Chief of Quantum Magnetic Dynamics', institution: 'MIT Clean Energy Lab' },
    { name: 'Rohan Sharma', role: 'Vortex System Stator Architect', institution: 'Quantum Power Industries' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-t-[#00f2fe] border-r-transparent border-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#030303] pt-28 pb-20 overflow-hidden">
      
      {/* Decorative background visual lights */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16">
          <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-slate-100 mb-4 tracking-wider leading-tight">
            THE UNVEILING AGENDA
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Witness the global zero-point energy revolution firsthand. Review event logistics, guest speakers, and schedules.
          </p>
        </div>

        {event ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Logistics Card & Seat Indicators */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00f2fe]"></div>

                <h3 className="font-orbitron font-bold text-base text-slate-200 mb-6">EVENT PARAMETERS</h3>
                
                <div className="space-y-6 text-xs sm:text-sm">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs font-orbitron">DATE & TIME</p>
                      <p className="text-slate-200 font-semibold mt-1">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs font-orbitron">VENUE GATE</p>
                      <p className="text-slate-200 font-semibold mt-1">{event.venue}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Ticket className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400 text-xs font-orbitron">ENTRY BOOKING FEE</p>
                      <p className="text-green-400 font-bold text-base mt-1">Rs. {parseFloat(event.ticket_price).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
                  <Link to="/products" className="btn-cyber w-full py-3 rounded text-xs block text-center">
                    RESERVE ENTRY CLEARANCE
                  </Link>
                </div>
              </div>

              {/* Slot Counter details */}
              <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-2xl relative">
                <h3 className="font-orbitron font-bold text-xs text-slate-300 tracking-wider mb-4 flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-[#00f2fe]" />
                  <span>SEAT COUNTER CAPACITIES</span>
                </h3>

                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-slate-500">Reserved Passes</span>
                  <span className="text-slate-200 font-bold">{event.total_slots - event.available_slots} / {event.total_slots}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"
                    style={{ width: `${((event.total_slots - event.available_slots) / event.total_slots) * 100}%` }}
                  ></div>
                </div>

                <p className="text-[10px] text-slate-400 mt-4 text-center">
                  Only <span className="text-[#00f2fe] font-bold">{event.available_slots}</span> clearance boarding tickets remain before catalog closes.
                </p>
              </div>
            </div>

            {/* Right Columns: Technical schedule & Speakers */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Technical Schedule Timeline */}
              <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h3 className="font-orbitron font-extrabold text-lg text-slate-200 tracking-wide mb-6">TECHNICAL SCHEDULE</h3>
                
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                  {agenda.map((item, i) => (
                    <div key={i} className="flex items-start space-x-4 relative">
                      <div className="w-6 h-6 rounded-full bg-slate-900 border border-cyan-500/40 glow-shadow-cyan shrink-0 flex items-center justify-center relative z-10">
                        <div className="w-2.5 h-2.5 bg-[#00f2fe] rounded-full animate-pulse"></div>
                      </div>
                      
                      <div>
                        <span className="font-orbitron font-semibold text-xs text-[#00f2fe] flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{item.time}</span>
                        </span>
                        <h4 className="font-orbitron font-bold text-sm text-slate-200 mt-1">{item.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed mt-1.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers panel */}
              <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h3 className="font-orbitron font-extrabold text-lg text-slate-200 tracking-wide mb-6">KEYNOTE RESEARCHERS</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {speakers.map((spk, idx) => (
                    <div key={idx} className="p-4 bg-slate-900/50 border border-slate-800/85 rounded-xl flex items-start space-x-3.5">
                      <div className="p-2 w-max bg-slate-900 border border-slate-800 rounded-full text-[#00f2fe]">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-orbitron font-bold text-sm text-slate-200">{spk.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">{spk.role}</p>
                        <p className="text-[10px] text-slate-500 font-orbitron tracking-wider mt-1.5">{spk.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="text-center py-20 border border-slate-800 rounded-2xl glass-panel">
            <p className="text-sm text-slate-400">Launch Event records are currently updating on the main grid network...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default EventDetails;
