import React from 'react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Search, TrendingUp, BarChart3, Activity } from 'lucide-react';

const Analytics = () => {
    const lossData = [
        { ep: 1, loss: 0.12, val: 0.15 },
        { ep: 10, loss: 0.08, val: 0.10 },
        { ep: 20, loss: 0.05, val: 0.07 },
        { ep: 30, loss: 0.03, val: 0.05 },
        { ep: 40, loss: 0.02, val: 0.04 },
        { ep: 50, loss: 0.015, val: 0.03 },
    ];

    const distribution = [
        { name: 'Normal', value: 85, color: '#38bdf8' },
        { name: 'Anomaly', value: 15, color: '#f87171' },
    ];

    return (
        <div className="p-8 h-full flex flex-col gap-8 overflow-y-auto bg-slate-950 text-white">
            <header className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <BarChart3 className="text-purple-400" size={32} />
                    <div>
                        <h2 className="text-3xl font-orbitron font-bold tracking-widest text-white uppercase">Neural Analytics</h2>
                        <p className="text-slate-500 text-xs tracking-[4px] uppercase">Model Performance & Learning Metrics</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Loss Curve */}
                <div className="col-span-8 glass-panel p-6 neon-border min-h-[400px]">
                    <h3 className="flex items-center gap-2 text-blue-400 text-sm font-orbitron uppercase mb-8">
                        <TrendingUp size={16} /> Training Loss Curve (LSTM-AE)
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lossData}>
                                <defs>
                                    <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="ep" stroke="#475569" label={{ value: 'Epochs', position: 'insideBottom', offset: -5 }} />
                                <YAxis stroke="#475569" />
                                <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid #ffffff20' }} />
                                <Area type="monotone" dataKey="loss" stroke="#38bdf8" fillOpacity={1} fill="url(#colorLoss)" />
                                <Area type="monotone" dataKey="val" stroke="#a855f7" fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Score Distribution */}
                <div className="col-span-4 glass-panel p-6 neon-border flex flex-col">
                    <h3 className="flex items-center gap-2 text-purple-400 text-sm font-orbitron uppercase mb-8">
                        <Activity size={16} /> Anomaly Distribution
                    </h3>
                    <div className="flex-1 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                                <Pie
                                    data={distribution}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {distribution.map(d => (
                            <div key={d.name} className="flex justify-between text-xs font-mono uppercase">
                                <span className="text-slate-400">{d.name}</span>
                                <span style={{ color: d.color }}>{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div className="glass-panel p-4 border-l-4 border-blue-500">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Precision (PR)</div>
                    <div className="text-2xl font-orbitron font-bold">0.942</div>
                </div>
                <div className="glass-panel p-4 border-l-4 border-purple-500">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Recall (REC)</div>
                    <div className="text-2xl font-orbitron font-bold">0.887</div>
                </div>
                <div className="glass-panel p-4 border-l-4 border-green-500">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">F1-Score</div>
                    <div className="text-2xl font-orbitron font-bold">0.914</div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
