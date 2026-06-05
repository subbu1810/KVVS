import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Cpu, User, LogIn, LogOut, Menu, X, Shield, Calendar, History } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Technology', path: '/about' },
    { name: 'Showroom', path: '/products' },
    { name: 'Event', path: '/event' },
    { name: 'Contact', path: '/contact' }
  ];

  const activeStyle = ({ isActive }) => 
    `px-4 py-2 rounded-md font-orbitron text-sm transition-all duration-300 ${
      isActive 
        ? 'text-[#00f2fe] border-b-2 border-[#00f2fe] text-glow-cyan bg-slate-900/30' 
        : 'text-slate-300 hover:text-[#00f2fe] hover:bg-slate-900/10'
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-slate-800/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Branding */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Cpu className="w-8 h-8 text-[#00f2fe] group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#00f2fe] rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className="font-orbitron font-extrabold text-xl tracking-widest bg-gradient-to-r from-[#00f2fe] via-blue-500 to-[#7c3aed] bg-clip-text text-transparent">
              VORTEX
            </span>
          </Link>

          {/* Large Screen Links */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={activeStyle}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Context Actions (Dashboard / Register / Login) */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin ? (
                  <Link to="/admin" className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-xs font-orbitron hover:bg-purple-500/25 transition-all">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin Control</span>
                  </Link>
                ) : (
                  <Link to="/history" className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300 text-xs font-orbitron hover:bg-blue-500/25 transition-all">
                    <History className="w-3.5 h-3.5" />
                    <span>My Boarding Passes</span>
                  </Link>
                )}

                <div className="flex items-center space-x-2 border-l border-slate-700/60 pl-4">
                  <div className="text-right">
                    <p className="text-xs text-[#00f2fe] font-orbitron">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-slate-400 capitalize">{user.role}</p>
                  </div>
                  <User className="w-8 h-8 p-1.5 bg-slate-900 border border-slate-800 rounded-full text-slate-300" />
                </div>

                <button 
                  onClick={handleLogout} 
                  className="flex items-center space-x-1 p-2 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="flex items-center space-x-1 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">
                  <LogIn className="w-4 h-4" />
                  <span>Terminal Access</span>
                </Link>
                <Link to="/products" className="btn-cyber px-5 py-2 rounded text-xs">
                  RESERVE NOW
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Drawer Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-slate-800/80 slide-in-top">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-md text-base font-orbitron font-medium text-slate-300 hover:text-[#00f2fe] hover:bg-slate-900"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-slate-800/80 my-4 pt-4 px-3">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <User className="w-9 h-9 p-1.5 bg-slate-900 border border-slate-800 rounded-full text-slate-300" />
                    <div>
                      <p className="text-sm text-[#00f2fe] font-orbitron">{user.name}</p>
                      <p className="text-xs text-slate-400 capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-purple-300 bg-purple-500/10 border border-purple-500/20"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Admin Control Panel</span>
                    </Link>
                  ) : (
                    <Link
                      to="/history"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-blue-300 bg-blue-500/10 border border-blue-500/20"
                    >
                      <History className="w-4 h-4" />
                      <span>My Pass Ledger</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2.5 rounded-md text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Exit Terminal</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 rounded border border-slate-800 text-sm font-medium text-slate-300 hover:text-white"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Terminal Access</span>
                  </Link>
                  <Link
                    to="/products"
                    onClick={() => setIsOpen(false)}
                    className="btn-cyber block text-center w-full px-4 py-2.5 rounded text-sm"
                  >
                    RESERVE NOW
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
