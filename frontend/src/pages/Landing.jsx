import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ShieldCheck, Activity, Search, X, Cpu, Database } from 'lucide-react';
import StarField from '../components/StarField';

const Landing = ({ onLaunch }) => {
    const [isLaunching, setIsLaunching] = useState(false);
    const [showSpecs, setShowSpecs] = useState(false);

    const handleLaunch = () => {
        setIsLaunching(true);
        setTimeout(() => {
            onLaunch();
        }, 2000);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <StarField />

            {/* Nebula Gradients */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

            <AnimatePresence>
                {!isLaunching && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                        className="z-10 text-center pb-32"
                    >
                        <div className="flex items-center justify-center mb-8">
                            <div className="p-6 glass-panel neon-border rounded-full shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                                <ShieldCheck className="w-12 h-12 text-blue-400" />
                            </div>
                        </div>

                        <h1 className="text-7xl font-bold mb-6 neon-text tracking-tighter">
                            SPACE<span className="text-white">GUARD</span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-12 max-w-lg mx-auto uppercase tracking-[6px] font-medium">
                            Intelligent Spacecraft Anomaly Detection
                        </p>

                        <div className="flex gap-6 justify-center">
                            <button
                                onClick={handleLaunch}
                                className="px-10 py-4 glass-panel neon-border hover:bg-blue-500/20 transition-all font-bold tracking-[2px] flex items-center gap-3 group"
                            >
                                <Activity className="w-5 h-5 group-hover:animate-pulse" />
                                LAUNCH DASHBOARD
                            </button>
                            <button
                                onClick={() => setShowSpecs(true)}
                                className="px-10 py-4 glass-panel border-white/10 hover:border-white/20 transition-all font-bold tracking-[2px] text-slate-400 hover:text-white"
                            >
                                EXPLORE SYSTEM
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* System Specs Modal */}
            <AnimatePresence>
                {showSpecs && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSpecs(false)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative z-10 w-full max-w-2xl glass-panel neon-border p-8 overflow-hidden"
                        >
                            <button
                                onClick={() => setShowSpecs(false)}
                                className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex items-center gap-4 mb-8">
                                <Search className="text-blue-400" />
                                <h2 className="text-2xl font-orbitron font-bold tracking-widest text-white uppercase">System Specifications</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <section className="space-y-4">
                                    <h3 className="text-sm font-orbitron text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                        <Cpu size={16} /> Neural Architecture
                                    </h3>
                                    <div className="space-y-2 text-[12px] font-mono text-slate-400 uppercase">
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span>Model Type</span><span className="text-white">LSTM Autoencoder</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span>Latent Dim</span><span className="text-white">32 Neurons</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span>Optimization</span><span className="text-white">ADAM Adaptive</span></div>
                                        <div className="flex justify-between"><span>Activation</span><span className="text-white">ReLU / Tanh</span></div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h3 className="text-sm font-orbitron text-purple-400 uppercase tracking-wider flex items-center gap-2">
                                        <Database size={16} /> Dataset Cluster
                                    </h3>
                                    <div className="space-y-2 text-[12px] font-mono text-slate-400 uppercase">
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span>Primary Source</span><span className="text-white">NASA MSL / SMAP</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span>Sequence Size</span><span className="text-white">100 Frames</span></div>
                                        <div className="flex justify-between border-b border-white/5 pb-1"><span>Feature Matrix</span><span className="text-white">Multivariate</span></div>
                                        <div className="flex justify-between"><span>Precision</span><span className="text-white">Float32 Deep</span></div>
                                    </div>
                                </section>
                            </div>

                            <div className="mt-12 p-4 bg-blue-500/5 border border-blue-500/20 rounded">
                                <p className="text-[10px] text-blue-300 uppercase leading-loose tracking-[2px]">
                                    Warning: System integrity is monitored by the AI core. Any unauthorized attempts to access the latent manifold will result in immediate sector lockdown.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                animate={isLaunching ? {
                    y: -1200,
                    scale: 2,
                    opacity: [1, 1, 0.5, 0],
                    transition: { duration: 1.5, ease: "circIn" }
                } : {
                    y: [0, -15, 0],
                    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-16 z-20 pointer-events-none"
            >
                <div className="relative">
                    <Rocket className="w-24 h-24 text-white fill-white" />
                    {/* Engine Glow */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-8 h-20 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent blur-md rounded-full"
                    />
                    {/* Particle Exhaust */}
                    {isLaunching && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 200 }}
                            className="absolute -bottom-52 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-t from-transparent via-white/50 to-white/80 blur-lg rounded-full"
                        />
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Landing;
