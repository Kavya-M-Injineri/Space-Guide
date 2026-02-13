import React from 'react';
import { motion } from 'framer-motion';

const Radar = ({ anomalies = [] }) => {
    return (
        <div className="relative w-full aspect-square glass-panel neon-border rounded-full overflow-hidden">
            {/* Radar Sweeper */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[50%] h-[50%] -translate-x-full -translate-y-full origin-bottom-right bg-gradient-to-tr from-blue-500/20 to-transparent pointer-events-none"
            />

            {/* Grid Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-white/5 rounded-full" />
                <div className="w-1/2 h-1/2 border border-white/5 rounded-full" />
                <div className="w-1/4 h-1/4 border border-white/5 rounded-full" />
                <div className="absolute w-full h-[1px] bg-white/5" />
                <div className="absolute h-full w-[1px] bg-white/5" />
            </div>

            {/* Anomaly Markers */}
            {anomalies.map((a, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute w-3 h-3 bg-red-500 rounded-full blur-[2px]"
                    style={{ top: `${a.y}%`, left: `${a.x}%` }}
                />
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[10px] text-white/20 uppercase tracking-widest font-orbitron">
                    Sector Scan Alpha-9
                </div>
            </div>
        </div>
    );
};

export default Radar;
