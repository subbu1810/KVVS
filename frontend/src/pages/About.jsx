import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Sparkles, Cpu, GitFork } from 'lucide-react';

const About = () => {
  const steps = [
    { icon: <Cpu className="w-6 h-6 text-cyan-400" />, title: 'ASYMMETRICAL ROTORS', desc: 'Custom stator geometry ensures permanent polar repulsion that overrides standard magnetic locking, allowing rotor spin loops to continue infinitely.' },
    { icon: <Compass className="w-6 h-6 text-purple-400" />, title: 'FLUX COMPRESSORS', desc: 'Inductive copper conduits squeeze high-speed magnetic flux lines, focusing force directly onto rotor coils to minimize torque losses.' },
    { icon: <GitFork className="w-6 h-6 text-blue-400" />, title: 'CRYOGENIC SEALING', desc: 'Core chambers operate in air-free magnetic vacuums, completely blocking standard friction heat, dampening noise, and maximizing lifecycles.' }
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] pt-28 pb-20 overflow-hidden">
      
      {/* Visual background lights */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-orbitron tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Point Physics Blueprint</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-orbitron font-extrabold text-3xl sm:text-5xl text-slate-100 mb-6"
          >
            THE VORTEX REVOLUTION
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Dismantling global resource combustion since 3026. Discover how we harness the fundamental magnetism of Samarium-Cobalt arrays to supply continuous clean power.
          </motion.p>
        </div>

        {/* --- High-Tech Visual Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl group"
          >
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop" 
              alt="Engineers working in sci-fi facility" 
              className="w-full h-80 object-cover object-center filter brightness-75 group-hover:scale-105 transition-transform duration-700" 
            />
            {/* Overlay border details */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-6 left-6 flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="font-orbitron font-bold text-xs text-slate-200 tracking-wider">MAGNETIC ACCREDITATION CLEARANCE</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-orbitron font-bold text-xl sm:text-3xl text-[#00f2fe] text-glow-cyan leading-tight">
              BREAKING THERMODYNAMIC FRONTIERS
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Standard generators require external kinetic fuel sources—burning gas, turning massive steam turbines, or gathering solar photons. The Vortex core series breaks this loop. By utilizing permanent magnet spin forces, it produces clean, non-stop electrical currents indefinitely.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Founded by clean-tech visionary engineers, our goal is to render the mechanical friction of combustion engines entirely obsolete. Whether powering remote estates, standard homes, or charging electric cars, the Vortex provides reliable power cells that require zero fuel.
            </p>
          </motion.div>

        </div>

        {/* --- Three-Step Core Science Breakdown --- */}
        <div className="border-t border-slate-900 pt-16">
          <h2 className="font-orbitron font-bold text-center text-xl sm:text-3xl text-slate-100 mb-12">
            PHYSICS MATRIX CORE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-panel glass-panel-hover rounded-xl p-8 border border-slate-800/80 shadow-lg relative overflow-hidden"
              >
                {/* Visual accent top borders */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent"></div>
                
                <div className="p-3 w-max bg-slate-900 border border-slate-800 rounded-full mb-6">
                  {step.icon}
                </div>
                
                <h3 className="font-orbitron font-bold text-sm tracking-wider text-slate-200 mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
