import React from 'react';
import { Cpu, Zap, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-white border-t border-slate-800/80 pt-16 pb-8 overflow-hidden">
      {/* Dynamic background lighting */}
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"></div>
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#00f2fe]/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/images/Logo Kvvsai.jpg" alt="KVVSai Logo" className="w-16 h-16 object-contain" />
              <span className="font-orbitron font-extrabold text-lg tracking-widest text-black">
                K V V SAI ELECTRONIC
              </span>
            </div>
            <p className="text-black text-sm leading-relaxed">
              Engineering the zero-fuel magnetic electricity generators of the 31st century. Fully autonomous, zero-emission, perpetual energy models built to power grid systems indefinitely.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-orbitron">
              <Zap className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
              <span>SUPERCONDUCTING ACTIVE CORE</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-orbitron font-semibold text-sm tracking-wider text-blue-600 mb-4">EXPLORE CLEARANCES</h4>
            <ul className="space-y-2.5 text-sm text-black">
              <li><Link to="/about" className="hover:text-[#B8860B] transition-colors">Generator Science</Link></li>
              <li><Link to="/products" className="hover:text-[#B8860B] transition-colors">Showroom Models</Link></li>
              <li><Link to="/event" className="hover:text-[#B8860B] transition-colors">Launch Unveiling</Link></li>
              <li><Link to="/contact" className="hover:text-[#B8860B] transition-colors">Communications</Link></li>
            </ul>
          </div>

          {/* Technical Specs */}
          <div>
            <h4 className="font-orbitron font-semibold text-sm tracking-wider text-blue-600 mb-4">TECHNICAL PARAMETERS</h4>
            <ul className="space-y-2 text-xs text-black font-orbitron">
              <li>MODEL: Vortex Core Series</li>
              <li>MAGNETICS: NdFeB Neodymium</li>
              <li>EFFICIENCY: Zero Combustion</li>
              <li>COOLING: Liquified Convection</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-orbitron font-semibold text-sm tracking-wider text-blue-600 mb-4">COMMUNICATIONS HUB</h4>
            <ul className="space-y-3 text-sm text-black">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Sector 7, Aerospace Tech Park, Bangalore, KA, India</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+91 80 4096 3026</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>cleared@vortexgenerator.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500">
          <p className="mb-4 sm:mb-0">
            &copy; 3026 Vortex Generator Industries. Perpetual licensing active.
          </p>
          <div className="flex space-x-4">
            <span className="hover:text-black cursor-pointer">Security Protocol</span>
            <span className="hover:text-black cursor-pointer">Data Clearance</span>
            <span className="hover:text-black cursor-pointer">Magnetic Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

