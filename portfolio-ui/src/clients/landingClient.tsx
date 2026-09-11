'use client';

import { useEffect, useState } from "react";
import { AnimatePresence } from 'framer-motion';
import PreLanding from "../components/prelanding";
import Landing from "../components/landing";


export default function LandingClient() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <main className="relative h-screen">
      <AnimatePresence mode="wait">
        {
        showPreloader && <PreLanding key="preloader"/>}
      </AnimatePresence>
        {!showPreloader && <Landing/>}
    </main>
  );
}