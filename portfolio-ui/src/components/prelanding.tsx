'use client'
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const words = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten tag',
  'Hallo'
];

export default function PreLanding() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= words.length - 1) return;

    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 200 : 150);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <motion.p 
        className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {words[index]}
      </motion.p>
      
      <motion.svg
        className="absolute w-full h-[calc(100%+200px)] pointer-events-none"
        initial={{ top: 0 }}
        exit={{
          top: '-200px',
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }}
      >
        <motion.path
          d="M 0 100 V 50 Q 50 0 100 50 V 100 z"
          fill="black"
          vectorEffect="non-scaling-stroke"
          initial={{ d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }}
          exit={{
            d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        />
      </motion.svg>
    </motion.div>
  );
};