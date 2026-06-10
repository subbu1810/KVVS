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
    <div className="relative min-h-screen bg-white pt-28 pb-20 overflow-hidden">

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
            className="font-orbitron font-extrabold text-3xl sm:text-5xl text-black mb-6"
          >
            THE K V V SAI ELECTRONIC REVOLUTION
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-black text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Dismantling global resource combustion since 3026. Discover how we harness the fundamental magnetism of Samarium-Cobalt arrays to supply continuous clean power.
          </motion.p>
        </div>

        {/* --- Magnetic Field Working Section --- */}
        <div className="grid grid-cols-1 gap-12 mb-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center mb-10">
              <h4 className="font-orbitron font-bold text-xl sm:text-3xl text-blue-600 leading-tight mb-4">
                Magnetic Field Working in a Generator
              </h4>
              <p className="text-black text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
                A generator converts mechanical energy into electrical energy using the principle of electromagnetic induction, discovered by Michael Faraday.
              </p>
            </div>

            <div className="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h5 className="font-orbitron font-bold text-lg sm:text-xl text-black mb-8 border-b border-slate-200 pb-4">
                How the Magnetic Field Works
              </h5>

              <div className="space-y-8 text-black text-sm sm:text-base">

                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <span className="font-orbitron font-bold text-cyan-500 text-lg sm:text-xl shrink-0 w-8 mb-2 sm:mb-0">01</span>
                  <div>
                    <h6 className="font-bold mb-2">Magnetic Field Creation</h6>
                    <p className="text-slate-700">A strong magnet (permanent magnet or electromagnet) creates a magnetic field between its north and south poles.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <span className="font-orbitron font-bold text-cyan-500 text-lg sm:text-xl shrink-0 w-8 mb-2 sm:mb-0">02</span>
                  <div>
                    <h6 className="font-bold mb-2">Movement of the Conductor</h6>
                    <p className="text-slate-700">A coil of wire (armature) is rotated within this magnetic field by a turbine, engine, or other mechanical source.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <span className="font-orbitron font-bold text-cyan-500 text-lg sm:text-xl shrink-0 w-8 mb-2 sm:mb-0">03</span>
                  <div>
                    <h6 className="font-bold mb-2">Cutting Magnetic Flux</h6>
                    <p className="text-slate-700">As the coil rotates, it cuts through the magnetic field lines. The magnetic flux linked with the coil changes continuously.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <span className="font-orbitron font-bold text-cyan-500 text-lg sm:text-xl shrink-0 w-8 mb-2 sm:mb-0">04</span>
                  <div>
                    <h6 className="font-bold mb-2">Induced EMF</h6>
                    <p className="text-slate-700 mb-4">Due to the changing magnetic flux, an electromotive force (EMF) is induced in the coil according to Faraday's Law.</p>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs sm:text-sm font-mono max-w-sm">
                      <p className="font-bold mb-2 text-slate-800 border-b border-slate-200 pb-1">Where:</p>
                      <p className="mb-1"><span className="font-bold">E</span> = induced voltage (EMF)</p>
                      <p className="mb-1"><span className="font-bold">N</span> = number of turns in the coil</p>
                      <p><span className="font-bold">Φ</span> = magnetic flux</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <span className="font-orbitron font-bold text-cyan-500 text-lg sm:text-xl shrink-0 w-8 mb-2 sm:mb-0">05</span>
                  <div>
                    <h6 className="font-bold mb-2">Electric Current Production</h6>
                    <p className="text-slate-700">If the coil is connected to an external circuit, the induced EMF causes current to flow, producing electrical power.</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* --- Three-Step Core Science Breakdown --- */}
        <div className="border-t border-slate-900 pt-16">
          <h2 className="font-orbitron font-bold text-center text-xl sm:text-3xl text-black mb-12">
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

                <div className="p-3 w-max bg-slate-100 border border-slate-800 rounded-full mb-6">
                  {step.icon}
                </div>

                <h3 className="font-orbitron font-bold text-sm tracking-wider text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-black leading-relaxed">
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

