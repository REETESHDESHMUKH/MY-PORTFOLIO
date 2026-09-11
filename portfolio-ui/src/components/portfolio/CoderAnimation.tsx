"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { shouldAnimateCoder } from "../../lib/coder-animation.mjs";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}
const prefersReducedMotion = () => window.matchMedia(motionQuery).matches;
const tabIsVisible = () => document.visibilityState === "visible";
const serverMotionPreference = () => true;
const serverVisibility = () => false;

export default function CoderAnimation() {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, prefersReducedMotion, serverMotionPreference);
  const tabVisible = useSyncExternalStore(subscribeVisibility, tabIsVisible, serverVisibility);
  const running = shouldAnimateCoder({ ready, paused, inView, reducedMotion, tabVisible });

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const timer = window.setTimeout(() => setReady(true), 2400);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(element);
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, []);

  return <div className="hero-coder" ref={root} data-running={running} role="group" aria-label="Coder working at a laptop">
    <span className="sr-only">An illustrated coder works at a laptop, gently moving his hands and nodding, beside a warm cup of coffee.</span>
    <svg className="coder-scene" viewBox="0 0 420 360" fill="none" aria-hidden="true" focusable="false">
      <circle cx="210" cy="176" r="148" fill="#fff6dd" fillOpacity=".52" />
      <path d="M61 157a154 154 0 0 1 225-112M354 202a150 150 0 0 1-61 95" stroke="#ad8157" strokeOpacity=".28" strokeDasharray="3 8" strokeLinecap="round" />
      <ellipse cx="211" cy="335" rx="162" ry="10" fill="#917345" fillOpacity=".13" />

      <g className="coder-floating-mark">
        <rect x="298" y="45" width="51" height="51" rx="15" fill="#ad4d32" transform="rotate(9 323 70)" />
        <path d="m315 63-7 7 7 7m15-14 7 7-7 7m-8-17-4 20" stroke="#fff6dd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g opacity=".65" stroke="#927c4e" strokeWidth="1.8" strokeLinecap="round">
        <path d="M75 82v10m-5-5h10M356 130v8m-4-4h8" />
        <circle cx="245" cy="40" r="3" />
      </g>

      {/* Chair and legs sit behind the desk and the character. */}
      <rect x="88" y="166" width="73" height="100" rx="24" fill="#37574b" />
      <path d="M103 267h86" stroke="#243a31" strokeWidth="13" strokeLinecap="round" />
      <path d="M121 272v54m47-54v54" stroke="#476253" strokeWidth="7" strokeLinecap="round" />
      <path d="M129 255q-4 30 10 66h21l-3-65m6 0q16 33 40 63h19l-33-67" fill="#243a31" />
      <path d="M137 316h24l10 12q1 6-6 6h-31q-5-6 3-18m64-1h20l15 11q5 7-3 8h-31q-5-5-1-19" fill="#fdf5df" stroke="#243a31" strokeWidth="2" strokeLinejoin="round" />

      <g className="coder-person">
        <path d="M132 148h30v31h-30z" fill="#c98e6d" />
        <path d="M126 158q-24 8-25 32l-4 65h102l-6-69q-4-21-32-27l-15 20z" fill="#8da184" />
        <path d="m128 159 18 20 17-20m-19 22v58" stroke="#637d63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m121 174 4 13m43-13-4 13" stroke="#e2e8d4" strokeWidth="2" strokeLinecap="round" />
        <path d="M119 220v23h20" stroke="#758d70" strokeWidth="2" strokeLinecap="round" />
        <g className="coder-head">
          <path d="M116 106q-9-42 30-46 39-3 38 34l-10 35-52 4z" fill="#26382f" />
          <path d="M126 91q2-17 30-14l24 15-3 37q-3 23-24 25-20 0-28-22z" fill="#dea381" />
          <path d="M125 111q-14-12-14 3 0 14 15 15" fill="#dea381" />
          <path d="m118 115 5 4" stroke="#b8795a" strokeWidth="2" strokeLinecap="round" />
          <path d="M121 111q11-9 10-26 22 5 30-9 6 14 24 19 5-24-18-31-27-8-43 8-13 15-3 39" fill="#26382f" />
          <path d="M128 101q8-4 15-1m19-1 11 1" stroke="#3b4234" strokeWidth="2.3" strokeLinecap="round" />
          <g className="coder-eyes" fill="#243a31">
            <ellipse cx="138" cy="112" rx="2" ry="2.7" />
            <ellipse cx="169" cy="110" rx="2" ry="2.7" />
          </g>
          <g stroke="#344637" strokeWidth="2.2">
            <rect x="126" y="103" width="23" height="19" rx="7" />
            <rect x="157" y="101" width="22" height="19" rx="7" />
            <path d="M149 109q4-3 8-1m-31 2-9-2" />
          </g>
          <path d="m155 115 4 10-6 1m-11 9q9 7 19-1" stroke="#a76c51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M132 139q22 14 40-5-4 18-19 20-14 0-21-15" fill="#344035" fillOpacity=".38" />
        </g>

        <g className="coder-arm coder-arm-far">
          <path d="m174 185 12 40 32 14" stroke="#738e70" strokeWidth="23" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m209 235 17 7" stroke="#d69a77" strokeWidth="13" strokeLinecap="round" />
        </g>
        <g className="coder-arm coder-arm-near">
          <path d="m119 190 14 42 45 11" stroke="#a2b394" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m171 241 21 4" stroke="#dea381" strokeWidth="14" strokeLinecap="round" />
          <path d="m187 241 16 5m-17-1 16 5" stroke="#dea381" strokeWidth="5" strokeLinecap="round" />
          <path d="m165 230-4 21" stroke="#637d63" strokeWidth="3" />
        </g>
      </g>

      {/* A laptop silhouette, without the old animated editor panel. */}
      <path d="M217 170q1-6 8-6h115q7 0 5 7l-20 78H198z" fill="#2b4b40" stroke="#1c4036" strokeWidth="2" strokeLinejoin="round" />
      <path d="m226 173 108-1-17 68H209z" fill="#37594c" />
      <path d="m264 197-7 7 7 7m18-14 7 7-7 7m-8-17-4 20" stroke="#dce5cb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M179 249h147l19 6q3 5-6 7H180q-8-1-8-6z" fill="#d2dcc4" stroke="#1c4036" strokeWidth="2" strokeLinejoin="round" />
      <path d="M213 250h49l-4 5h-42z" fill="#9aac94" />
      <circle className="coder-laptop-light" cx="328" cy="256" r="2" fill="#6e8d58" />

      <g className="coder-coffee">
        <path d="M66 231h12q11 0 10 9t-13 8" stroke="#9b3823" strokeWidth="5" />
        <path d="M49 226h27l-2 27q-10 8-22 0z" fill="#b75b3c" />
        <ellipse cx="62.5" cy="227" rx="13.5" ry="3" fill="#e3b17f" />
        <ellipse cx="62.5" cy="228" rx="10" ry="1.7" fill="#734830" />
        <g stroke="#a17751" strokeWidth="2" strokeLinecap="round">
          <path className="coder-steam coder-steam-one" d="M57 215q-5-5 0-10t0-10" />
          <path className="coder-steam coder-steam-two" d="M68 218q-5-5 0-10t0-10" />
        </g>
      </g>
      <path d="M40 263h337" stroke="#ac7952" strokeWidth="9" strokeLinecap="round" />
      <path d="m64 268-10 63m299-63 10 63" stroke="#81684b" strokeWidth="8" strokeLinecap="round" />
      <path d="M64 271h288" stroke="#8e6948" strokeWidth="3" strokeLinecap="round" />
    </svg>
    <div className="coder-scene-footer">
      <span className="coder-scene-caption">One idea at a time.</span>
      {!reducedMotion && <button className="coder-playback" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play coder animation" : "Pause coder animation"}>
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}{paused ? "Play" : "Pause"}
      </button>}
    </div>
  </div>;
}
