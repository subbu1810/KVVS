import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, User, LogIn, Lock, Mail, AlertTriangle } from 'lucide-react';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminTab, setIsAdminTab] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Parse if redirecting from an Admin protect route
  useEffect(() => {
    if (searchParams.get('admin') === 'true') {
      setIsAdminTab(true);
    }
  }, [searchParams]);

  // If already authenticated, redirect immediately
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/history');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const result = await login(email, password, isAdminTab);
    setLoading(false);

    if (result.success) {
      const from = location.state?.from?.pathname || (isAdminTab ? '/admin' : '/history');
      navigate(from, { replace: true });
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center pt-20 px-4 overflow-hidden">

      {/* Visual background lights */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
      <div className="absolute w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">

        {/* Core Glassmorphic Form Container */}
        <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-black uppercase tracking-widest">
              TERMINAL ACCESS
            </h2>
            <p className="text-[11px] text-black mt-2">Enter credentials to establish connection</p>
          </div>

          {/* Tab toggles */}
          <div className="flex border border-slate-800/80 bg-slate-50/40 rounded-lg p-1 mb-6 text-xs sm:text-sm font-orbitron font-bold">
            <button
              onClick={() => { setIsAdminTab(false); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition-all ${!isAdminTab ? 'bg-blue-600 text-white' : 'text-black hover:text-black'}`}
            >
              <User className="w-4 h-4" />
              <span>Attendee Clearance</span>
            </button>
            <button
              onClick={() => { setIsAdminTab(true); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-md flex items-center justify-center space-x-1.5 transition-all ${isAdminTab ? 'bg-[#7c3aed] text-black glow-shadow-purple' : 'text-black hover:text-black'}`}
            >
              <Shield className="w-4 h-4" />
              <span>Admin Clearance</span>
            </button>
          </div>

          {/* Error Alert Box */}
          {errorMsg && (
            <div className="flex items-start space-x-2 border border-red-500/30 bg-red-500/5 rounded-lg p-3.5 text-xs text-red-400 mb-6">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {/* Form fields */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="font-orbitron text-xs text-black block mb-2">CLEARANCE ID (EMAIL)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-800 rounded-lg text-black placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="font-orbitron text-xs text-black block mb-2">ACCESS PIN (PASSWORD)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-800 rounded-lg text-black placeholder-slate-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded font-orbitron font-bold tracking-wider text-xs flex items-center justify-center space-x-2 transition-all ${isAdminTab
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-black shadow-lg shadow-purple-500/20'
                : 'btn-cyber'
                }`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-t-slate-900 border-r-transparent border-slate-700 rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>ESTABLISH SECURE LINK</span>
                </>
              )}
            </button>
          </form>

          {/* Signup links */}
          {!isAdminTab && (
            <div className="text-center mt-6 pt-4 border-t border-slate-800/60 text-xs text-black">
              <p>
                First time registering?{' '}
                <Link to="/signup" className="text-blue-600 font-bold hover:underline">
                  Register Clearance Account
                </Link>
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Login;

