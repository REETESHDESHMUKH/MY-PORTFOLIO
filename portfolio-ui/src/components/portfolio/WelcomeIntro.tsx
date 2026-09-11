"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

/** A decorative welcome, never a fake loading bar or a dependency for using the page. */
export default function WelcomeIntro() {
  const [visible, setVisible] = useState(true);
  const dismiss = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!visible) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => { if (preference.matches) dismiss(); };
    // CSS hides the reduced-motion version before first paint; remove its DOM next tick.
    const timer = window.setTimeout(dismiss, preference.matches ? 0 : 2600);
    // Keyboard and pointer interaction can immediately bypass the decorative intro.
    window.addEventListener("keydown", dismiss, { once: true });
    window.addEventListener("pointerdown", dismiss, { once: true });
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [visible, dismiss]);

  return <>
    <button className="intro-replay" type="button" onClick={() => setVisible(true)} aria-label="Replay welcome animation"><RotateCcw size={12} aria-hidden="true" />Replay intro</button>
    {visible && <div className="welcome-intro" onAnimationEnd={(event) => { if (event.target === event.currentTarget && event.animationName === "welcome-exit") dismiss(); }}>
      <div className="welcome-wash wash-sage" aria-hidden="true" />
      <div className="welcome-wash wash-clay" aria-hidden="true" />
      <div className="welcome-halo" aria-hidden="true" />
      <span className="welcome-wordmark" aria-hidden="true">Reetesh Deshmukh</span>
      <div className="welcome-greeting" aria-hidden="true">
        <span className="welcome-hello">hello<span>.</span></span>
        <svg className="welcome-underline" viewBox="0 0 280 30" fill="none"><path d="M 10 20 Q 115 -2 269 14" pathLength="1" /></svg>
        <p>I&apos;m Reetesh. Welcome to my corner of the web.</p>
      </div>
      <span className="welcome-caption" aria-hidden="true">A LITTLE CURIOSITY. A LOT OF CRAFT.</span>
      <button className="welcome-skip" type="button" onClick={dismiss}>Skip intro<ArrowRight size={15} aria-hidden="true" /></button>
    </div>}
  </>;
}
