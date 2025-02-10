'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 20,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        const totalSeconds = prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds - 1;
        
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-cyan-300 text-base md:text-lg mb-2 font-bold">
        ЗНИЖКА ЗАКІНЧИТЬСЯ ЧЕРЕЗ
      </div>
      <div className="flex justify-center items-center gap-2 md:gap-4 text-xl md:text-2xl font-bold">
        <div className="flex flex-col items-center">
          <div className="bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30 min-w-[3rem] cyber-card">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-cyan-400 mt-1">годин</div>
        </div>
        <div className="text-cyan-500 font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30 min-w-[3rem] cyber-card">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-cyan-400 mt-1">
            хвилин
          </div>
        </div>
        <div className="text-cyan-500 font-bold">:</div>
        <div className="flex flex-col items-center">
          <div className="bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-500/30 min-w-[3rem] cyber-card">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-cyan-400 mt-1">секунд</div>
        </div>
      </div>
    </motion.div>
  );
}