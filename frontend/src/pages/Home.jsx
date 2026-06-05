import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventAPI } from '../services/api';
import Countdown from '../components/Countdown';
import { Zap, ShieldCheck, FlameKindling, Landmark, ArrowRight, Activity, Cpu, Award, MessageSquare, ChevronDown } from 'lucide-react';

const Home = () => {
  const [event, setEvent] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventAPI.getActive();
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch active event details:', error);
      }
    };
    fetchEvent();
  }, []);

  const stats = [
    { icon: <FlameKindling className="w-8 h-8 text-cyan-400" />, value: '0 Liters', label: 'Fuel/Gasoline Required' },
    { icon: <Activity className="w-8 h-8 text-green-400" />, value: '100%', label: 'Clean Carbon-Free Output' },
    { icon: <Award className="w-8 h-8 text-purple-400" />, value: '25+ Yrs', label: 'Continuous Operation Lifespan' },
    { icon: <Landmark className="w-8 h-8 text-yellow-400" />, value: '10x ROI', label: 'Lifetime Energy Cost Savings' }
  ];

  const faqs = [
    {
      q: 'How does a magnetic-power generator generate electricity without fuel?',
      a: 'The Vortex Generator operates using zero-point permanent neodymium magnet arrays arranged in an asynchronous stator structure. This configuration establishes a perpetual magnetic torque cycle that spins the internal rotor, converting kinetic magnetic flux into alternating current (AC) electricity through copper coils—completely free of diesel, solar rays, or combustion.'
    },
    {
      q: 'Does it make noise during operation?',
      a: 'No. The Vortex Generator employs superconducting liquid convection bearings and a vaccum-sealed core, dampening mechanical vibrations. The entire device operates silently below 15 decibels, making it quieter than standard ambient refrigerator cycles.'
    },
    {
      q: 'What KW models are available, and how do I select one?',
      a: 'We offer three base models designed for various loads: the Vortex-2 (2KW) for cabins, apartments, and essential appliances; the Vortex-5 (5KW) which completely powers standard residential houses; and the Vortex-10 (10KW) tailored for commercial estates, charging cells, or light factories.'
    },
    {
      q: 'Why is there a launch event booking fee?',
      a: 'The entry fee represents a direct pre-reservation ticket slot. Paying this deposit grants you official VIP clearance to attend the physical unveiling, a digital QR boarding pass, hands-on testing center clearance, and early-access rights to claim production-run priority deliveries.'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] overflow-hidden">
      
      {/* Decorative background grid and matrix lighting */}
      <div className="absolute inset-0 grid-bg opacity-45 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-orbitron tracking-widest uppercase mb-8"
        >
          <Zap className="w-3.5 h-3.5 animate-bounce" />
          <span>The Zero-Fuel Energy Revolution</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-orbitron font-extrabold text-3xl sm:text-6xl md:text-7xl tracking-tight leading-tight max-w-5xl mb-6 text-slate-100"
        >
          THE ULTIMATE ZERO-POINT <br/>
          <span className="bg-gradient-to-r from-[#00f2fe] via-blue-500 to-[#7c3aed] bg-clip-text text-transparent text-glow-cyan">
            MAGNETIC GENERATOR
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-slate-400 text-sm sm:text-lg md:text-xl leading-relaxed max-w-3xl mb-12"
        >
          Manufacturing tomorrow’s sustainable power grid today. Experience commercial-grade magnetic electricity generators working fully autonomously, 24/7, without fuel, sunlight, or combustion.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5 mb-16"
        >
          <Link to="/products" className="btn-cyber px-8 py-4 rounded text-sm w-full sm:w-auto flex items-center justify-center space-x-2">
            <span>RESERVE PASS / MODEL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/about" className="px-8 py-4 rounded font-orbitron border border-slate-700 bg-slate-900/40 text-slate-300 hover:text-white hover:border-slate-500 transition-all text-sm w-full sm:w-auto">
            EXPLORE THE SCIENCE
          </Link>
        </motion.div>

        {/* Live Launch Countdown Timer Box */}
        {event && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-3xl glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Glowing top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            
            <p className="font-orbitron text-xs sm:text-sm text-cyan-400 tracking-widest uppercase mb-6">
              GLOBAL REVELATION SHOWCASE COUNTDOWN
            </p>
            
            <Countdown targetDate={event.date} />

            <div className="mt-8 pt-6 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>VENUE: <span className="text-[#00f2fe] font-semibold">{event.venue}</span></p>
              <p>RESERVATION VALUE: <span className="text-green-400 font-semibold">Rs. {parseFloat(event.ticket_price).toLocaleString()}</span></p>
            </div>
          </motion.div>
        )}
      </section>

      {/* --- STATISTICS SHOWCASE SECTION --- */}
      <section className="relative border-t border-slate-900 bg-slate-950/40 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-2xl sm:text-4xl text-slate-100 mb-4">
            DISRUPTIVE METRICS
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Our permanent magnetic-flux core changes the thermodynamic equation of clean energy forever.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel glass-panel-hover rounded-xl p-8 text-center flex flex-col items-center"
            >
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-full mb-6 glow-shadow-cyan">
                {stat.icon}
              </div>
              <h3 className="font-orbitron font-extrabold text-3xl text-slate-100 mb-2">{stat.value}</h3>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SCIENCE INTRO SECTION --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-orbitron font-bold text-2xl sm:text-4xl text-slate-100 mb-6 leading-tight">
            ZERO-FUEL <br />
            MAGNETIC STATORS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
            Unlike wind or solar modules which depend on external weather currents, the Vortex series relies entirely on the spin forces of high-coercivity Neodymium arrays.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 p-1 bg-cyan-500/10 rounded border border-cyan-500/30 text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-orbitron text-sm text-slate-200 font-semibold mb-1">Perpetual Magnetic Flux Loop</h4>
                <p className="text-xs text-slate-400">Maintains continuous mechanical spin using permanent asymmetrical polar alignments.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 p-1 bg-purple-500/10 rounded border border-purple-500/30 text-purple-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-orbitron text-sm text-slate-200 font-semibold mb-1">Vacuum Sealed Core Shielding</h4>
                <p className="text-xs text-slate-400">Eliminates air resistance and micro-particles, preserving generator bearings and structural longevity.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center">
          {/* Animated Futuristic Ring */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-slow-spin"></div>
            <div className="absolute w-[80%] h-[80%] rounded-full border-2 border-purple-500/25 animate-reverse animate-spin"></div>
            <div className="absolute w-[60%] h-[60%] rounded-full bg-slate-900 border border-[#00f2fe]/40 glow-shadow-cyan flex flex-col items-center justify-center text-center p-6 animate-float">
              <Zap className="w-12 h-12 text-[#00f2fe] animate-pulse mb-3" />
              <h4 className="font-orbitron text-xs tracking-wider text-slate-300">CORE DYNAMICS</h4>
              <p className="text-[10px] text-slate-500 mt-1">SUPERCONDUCTIVE MATRIX</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="relative border-t border-slate-900 bg-slate-950/20 py-20 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-bold text-2xl sm:text-4xl text-slate-100 mb-4">
            ACQUIRE ANSWERS
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Resolve common queries about zero-point magnetics and preorder boarding credentials.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-xl overflow-hidden border border-slate-800/80 transition-colors"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-orbitron text-slate-200 hover:text-white font-semibold text-sm sm:text-base focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-[#00f2fe]' : ''}`} />
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${activeFaq === idx ? 'max-h-56 border-t border-slate-800/40 p-6' : 'max-h-0'}`}
              >
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
