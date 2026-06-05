import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Lock, Mail, Phone, MapPin, AlertTriangle } from 'lucide-react';

const Signup = () => {
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    address: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect
  useEffect(() => {
    if (user) {
      navigate('/history');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Input Validation
    if (formData.mobile.length < 10) {
      return setErrorMsg('Mobile number must be at least 10 digits.');
    }
    if (formData.password.length < 6) {
      return setErrorMsg('Access pin (password) must be at least 6 characters.');
    }

    setLoading(true);
    const result = await signup(formData);
    setLoading(false);

    if (result.success) {
      navigate('/history');
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030303] flex items-center justify-center pt-28 pb-20 px-4 overflow-hidden">
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="absolute w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        
        {/* Sleek Glassmorphism Container */}
        <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          {/* Glowing top line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent"></div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-slate-100 uppercase tracking-widest">
              REGISTER CLEARANCE
            </h2>
            <p className="text-[11px] text-slate-400 mt-2">Establish VIP attendee network coordinates</p>
          </div>

          {/* Error Alert Box */}
          {errorMsg && (
            <div className="flex items-start space-x-2 border border-red-500/30 bg-red-500/5 rounded-lg p-3.5 text-xs text-red-400 mb-6">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-orbitron text-xs text-slate-400 block mb-2">FULL NAME</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-orbitron text-xs text-slate-400 block mb-2">EMAIL COORDINATES</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-orbitron text-xs text-slate-400 block mb-2">MOBILE DIGITS</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-orbitron text-xs text-slate-400 block mb-2">ACCESS PIN (PASS)</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-orbitron text-xs text-slate-400 block mb-2">SHIPPING/GRID ADDRESS</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <textarea
                  required
                  rows="3"
                  placeholder="Type your physical coordinates..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-colors resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-cyber py-3.5 rounded text-xs flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-t-slate-900 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>TRANSMIT REGISTRATION</span>
                </>
              )}
            </button>
          </form>

          {/* Already have an account */}
          <div className="text-center mt-6 pt-4 border-t border-slate-800/60 text-xs text-slate-400">
            <p>
              Already registered?{' '}
              <Link to="/login" className="text-[#00f2fe] font-bold hover:underline">
                Establish Terminal Access
              </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Signup;
