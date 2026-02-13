import React, { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import { login, getHealth } from './services/api';
import './index.css';

function App() {
  const [view, setView] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('spaceguard_token'));
  const [showLogin, setShowLogin] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLaunch = () => {
    if (isLoggedIn) {
      setView('dashboard');
    } else {
      setShowLogin(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess(username, password);
  };

  const onLoginSuccess = async (u, p) => {
    const success = await login(u.trim(), p.trim());
    if (success) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setView('dashboard');
    } else {
      alert("Invalid Mission Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* Absolute Login View - Takes priority */}
      {showLogin ? (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-950 px-4">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="glass-panel p-10 w-full max-w-[420px] neon-border shadow-[0_0_50px_rgba(56,189,248,0.1)] relative z-10">
            <h2 className="text-3xl font-orbitron font-bold mb-8 tracking-[10px] text-blue-400 uppercase text-center">Identity</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[4px] text-slate-400 font-bold">Service ID</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-900 border border-white/20 p-4 text-white focus:border-blue-500 focus:bg-blue-500/5 outline-none transition-all rounded text-lg font-sans placeholder:text-slate-700"
                  placeholder="admin"
                  required
                />
              </div>
              <div className="space-y-2 relative">
                <label className="block text-[10px] uppercase tracking-[4px] text-slate-400 font-bold">Access Key</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/20 p-4 text-white focus:border-blue-500 focus:bg-blue-500/5 outline-none transition-all rounded text-lg font-sans pr-16 placeholder:text-slate-700"
                    placeholder="alpha9"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-400/60 hover:text-blue-400 tracking-widest transition-colors"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600/20 border border-blue-500/50 hover:bg-blue-600/40 text-blue-300 font-bold uppercase tracking-[6px] transition-all rounded-lg shadow-lg active:scale-[0.98]">
                Authenticate
              </button>
              <div className="text-center">
                <button type="button" onClick={() => { setShowLogin(false); setUsername(''); setPassword(''); }} className="text-[10px] text-slate-500 hover:text-red-400 uppercase tracking-[4px] transition-all font-bold">
                  Abort Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <>
          {view === 'landing' && (
            <Landing onLaunch={handleLaunch} />
          )}

          {view === 'dashboard' && (
            <Dashboard onBack={() => setView('landing')} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
