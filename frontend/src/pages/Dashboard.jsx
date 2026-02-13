import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Shield, AlertTriangle, Cpu, Globe, Database, List, Activity, LogOut, BarChart3 } from 'lucide-react';
import { getHealth, getMetrics } from '../services/api';
import Radar from '../components/Radar';
import Analytics from './Analytics';

const Dashboard = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [data, setData] = useState([]);
    const [systemStatus, setSystemStatus] = useState('OFFLINE');
    const [metrics, setMetrics] = useState({ threshold: '0.00', mean_mse: '0.00' });
    const [anomalyScore, setAnomalyScore] = useState(0);
    const [currentSeverity, setCurrentSeverity] = useState('SAFE');
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'CRITICAL', msg: 'HEATER-1 TEMP OUTSIDE BOUNDS', time: '12:45:01' },
        { id: 2, type: 'WARNING', msg: 'BATTERY CHARGE RATE FLUCTUATING', time: '12:44:32' },
    ]);

    // Fetch Backend Stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const health = await getHealth();
                const stats = await getMetrics();
                if (health) setSystemStatus(health.status.toUpperCase());
                if (stats) setMetrics(stats);
            } catch (err) {
                console.error("Backend unreachable", err);
            }
        };
        fetchStats();
    }, []);

    // Simulate incoming data
    useEffect(() => {
        const interval = setInterval(() => {
            const val = Math.random() * 100;
            setData(prev => [...prev, { time: new Date().toLocaleTimeString(), val }].slice(-20));

            // Randomly trigger anomaly for demo
            if (val > 85) {
                const sev = val > 95 ? 'CRITICAL' : 'WARNING';
                setAnomalyScore(Math.floor(val));
                setCurrentSeverity(sev);
            } else {
                setAnomalyScore(Math.floor(val / 4));
                setCurrentSeverity('SAFE');
            }
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    const getThemeColor = () => {
        if (currentSeverity === 'CRITICAL') return 'border-red-500 shadow-[inset_0_0_50px_rgba(239,68,68,0.2)] bg-red-950/20';
        if (currentSeverity === 'WARNING') return 'border-orange-500 shadow-[inset_0_0_50px_rgba(249,115,22,0.1)] bg-orange-950/10';
        return 'bg-slate-950';
    };

    return (
        <div className={`p-6 h-screen flex flex-col gap-6 overflow-hidden transition-all duration-500 ${getThemeColor()}`}>
            {/* Top HUD */}
            <header className="flex justify-between items-center glass-panel p-4 neon-border h-16">
                <div className="flex items-center gap-4">
                    <Shield className="text-blue-400" />
                    <h2 className="font-orbitron font-bold text-xl tracking-widest">SPACEGUARD DASHBOARD</h2>
                </div>
                <div className="flex items-center gap-8">
                    <div className="flex gap-8 text-sm uppercase tracking-tighter text-blue-300">
                        <div className="flex flex-col"><span className="text-[10px] opacity-50">Status</span><span>{systemStatus}</span></div>
                        <div className="flex flex-col"><span className="text-[10px] opacity-50">Uptime</span><span>142:12:09</span></div>
                        <div className="flex flex-col"><span className="text-[10px] opacity-50">Model Dev</span><span>{metrics.threshold ? (metrics.threshold * 10).toFixed(2) : '0.00'}</span></div>
                    </div>
                    <button
                        onClick={onBack}
                        className="ml-4 p-2 glass-panel border-white/10 hover:border-red-500/50 hover:text-red-400 transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                    >
                        <LogOut size={14} /> EXIT
                    </button>
                </div>
            </header>

            {/* Main Grid */}
            <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
                {activeTab === 'overview' && (
                    <>
                        {/* Left Column: Metrics & Alerts */}
                        <div className="col-span-3 flex flex-col gap-6 overflow-hidden">
                            <section className="flex-1 glass-panel p-4 flex flex-col gap-4">
                                <h3 className="flex items-center gap-2 text-blue-400 text-sm font-orbitron uppercase"><AlertTriangle size={16} /> System Alerts</h3>
                                <div className="flex-1 overflow-y-auto space-y-3">
                                    {alerts.map(a => (
                                        <div key={a.id} className={`p-3 border-l-2 ${a.type === 'CRITICAL' ? 'border-red-500 bg-red-500/5' : 'border-orange-500 bg-orange-500/5'} text-[11px] font-mono`}>
                                            <div className="flex justify-between opacity-60 mb-1">
                                                <span>{a.type}</span>
                                                <span>{a.time}</span>
                                            </div>
                                            <div className="uppercase font-bold">{a.msg}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="h-48 glass-panel p-4">
                                <h3 className="flex items-center gap-2 text-blue-400 text-sm font-orbitron uppercase"><Cpu size={16} /> Processor Affinity</h3>
                                <div className="space-y-4 mt-4">
                                    {[78, 45, 92].map((v, i) => (
                                        <div key={i} className="space-y-1">
                                            <div className="flex justify-between text-[10px] uppercase"><span>Core {i}</span><span>{v}%</span></div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} className="h-full bg-blue-500 shadow-[0_0_5px_rgba(56,189,248,1)]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Middle Column: Radar & Score */}
                        <div className="col-span-6 flex flex-col gap-6">
                            <div className="flex-1 flex items-center justify-center p-8 relative">
                                {currentSeverity !== 'SAFE' && (
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className={`absolute inset-0 rounded-full blur-3xl ${currentSeverity === 'CRITICAL' ? 'bg-red-500/20' : 'bg-orange-500/10'}`}
                                    />
                                )}
                                <Radar anomalies={currentSeverity !== 'SAFE' ? [{ x: 50, y: 50 }] : []} />
                            </div>

                            <div className="h-32 glass-panel p-4 flex items-center justify-around font-orbitron">
                                <div className="text-center">
                                    <div className="text-4xl font-bold neon-text">{anomalyScore}</div>
                                    <div className="text-[10px] uppercase tracking-tighter opacity-50">Anomaly Score</div>
                                </div>
                                <div className="h-full w-px bg-white/10" />
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-orange-400">{metrics.mean_mse ? Number(metrics.mean_mse).toFixed(4) : '0.000'}</div>
                                    <div className="text-[10px] uppercase tracking-tighter opacity-50">Base MSE</div>
                                </div>
                                <div className="h-full w-px bg-white/10" />
                                <div className="text-center">
                                    <div className={`text-4xl font-bold transition-colors ${currentSeverity === 'CRITICAL' ? 'text-red-500 animate-pulse' : currentSeverity === 'WARNING' ? 'text-orange-400' : 'text-green-400'}`}>
                                        {currentSeverity}
                                    </div>
                                    <div className="text-[10px] uppercase tracking-tighter opacity-50">System Threat</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Graphs */}
                        <div className="col-span-3 flex flex-col gap-6">
                            <section className="flex-1 glass-panel p-4 overflow-hidden flex flex-col">
                                <h3 className="flex items-center gap-2 text-blue-400 text-sm font-orbitron uppercase"><Activity size={16} /> Telemetry X-9</h3>
                                <div className="flex-1 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                            <XAxis dataKey="time" hide />
                                            <YAxis hide domain={[0, 100]} />
                                            <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #ffffff20', fontSize: '10px' }} />
                                            <Line type="monotone" dataKey="val" stroke="#38bdf8" strokeWidth={2} dot={false} isAnimationActive={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </section>

                            <section className="flex-1 glass-panel p-4 overflow-hidden flex flex-col">
                                <h3 className="flex items-center gap-2 text-purple-400 text-sm font-orbitron uppercase"><Database size={16} /> Reconstruction Alpha</h3>
                                <div className="flex-1 mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                            <XAxis dataKey="time" hide />
                                            <YAxis hide domain={[0, 100]} />
                                            <Line type="step" dataKey="val" stroke="#a855f7" strokeWidth={2} dot={false} isAnimationActive={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </section>
                        </div>
                    </>
                )}

                {activeTab === 'analytics' && (
                    <div className="col-span-12 overflow-hidden glass-panel">
                        <Analytics />
                    </div>
                )}

                {(activeTab === 'sensors' || activeTab === 'history') && (
                    <div className="col-span-12 flex items-center justify-center glass-panel">
                        <div className="text-center">
                            <h2 className="text-3xl font-orbitron neon-text mb-4 uppercase">{activeTab} MODULE</h2>
                            <p className="text-slate-400 tracking-widest">ACCESSING DATA STREAM ALPHA-7... PLEASE STAND BY</p>
                            <div className="mt-8 flex justify-center">
                                <Activity className="w-12 h-12 text-blue-400 animate-pulse" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Navigation */}
            <footer className="h-12 flex gap-4 text-[10px] uppercase tracking-widest font-bold">
                <div
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 glass-panel flex items-center gap-2 border-b-2 cursor-pointer transition-all ${activeTab === 'overview' ? 'border-blue-500 bg-blue-500/10' : 'border-transparent text-white/40 hover:text-white'}`}
                >
                    <Globe size={12} /> Overview
                </div>
                <div
                    onClick={() => setActiveTab('sensors')}
                    className={`px-4 glass-panel flex items-center gap-2 border-b-2 cursor-pointer transition-all ${activeTab === 'sensors' ? 'border-blue-500 bg-blue-500/10' : 'border-transparent text-white/40 hover:text-white'}`}
                >
                    <Cpu size={12} /> Sensors
                </div>
                <div
                    onClick={() => setActiveTab('history')}
                    className={`px-4 glass-panel flex items-center gap-2 border-b-2 cursor-pointer transition-all ${activeTab === 'history' ? 'border-blue-500 bg-blue-500/10' : 'border-transparent text-white/40 hover:text-white'}`}
                >
                    <List size={12} /> History
                </div>
                <div
                    onClick={() => setActiveTab('analytics')}
                    className={`px-4 glass-panel ml-auto text-purple-400 border-b-2 cursor-pointer transition-all ${activeTab === 'analytics' ? 'border-purple-500 bg-purple-500/10' : 'border-transparent opacity-60 hover:opacity-100 hover:text-purple-300'}`}
                >
                    <BarChart3 size={12} /> Analytics
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
