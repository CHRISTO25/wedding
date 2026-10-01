"use client";

import React, { useState, useEffect, useRef } from "react";
import { CinematicEntrance } from "@/components/entrance/cinematic-entrance";
import { TopRings } from "@/components/entrance/top-rings";
import { 
  Play, 
  Pause, 
  Menu, 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Sparkles, 
  Heart,
  Volume2
} from "lucide-react";
import confetti from "canvas-confetti";

/* ------------------------------------------------------------------ */
/*  Door Opening, Ribbon Untie & Blur Transition Keyframes            */
/* ------------------------------------------------------------------ */
const ENTRANCE_CSS = `
@keyframes bwTailL {
  0% { transform: none; }
  22% { transform: translate(-26px,8px) rotate(-14deg); }
  100% { transform: translate(-150px,260px) rotate(-75deg); opacity: 0; }
}
@keyframes bwTailR {
  0% { transform: none; }
  22% { transform: translate(26px,8px) rotate(14deg); }
  100% { transform: translate(150px,260px) rotate(75deg); opacity: 0; }
}
@keyframes bwLoopL {
  0% { transform: none; }
  25% { transform: scale(1.12,1.05) rotate(-4deg); }
  70% { transform: scaleX(.25) rotate(-20deg); }
  100% { transform: scaleX(0) rotate(-40deg); opacity: 0; }
}
@keyframes bwLoopR {
  0% { transform: none; }
  25% { transform: scale(1.12,1.05) rotate(4deg); }
  70% { transform: scaleX(.25) rotate(20deg); }
  100% { transform: scaleX(0) rotate(40deg); opacity: 0; }
}
@keyframes bwKnot {
  0% { transform: none; }
  30% { transform: scale(1.18); }
  60% { transform: scale(.9,1.2) rotate(8deg); }
  100% { transform: scale(0) rotate(90deg); opacity: 0; }
}
@keyframes bwWiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2.5deg); }
  75% { transform: rotate(2.5deg); }
}

@keyframes blurVisionFade {
  0% { opacity: 0; filter: blur(28px) brightness(1.7); transform: scale(1.08); }
  40% { opacity: 1; filter: blur(20px) brightness(1.5); transform: scale(1.04); }
  75% { opacity: 0.95; filter: blur(8px) brightness(1.2); transform: scale(1.01); }
  100% { opacity: 0; filter: blur(0px) brightness(1); transform: scale(1); }
}

@keyframes cloudDriftL {
  0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  100% { transform: translate(-30vw, -10vh) scale(1.8); opacity: 0; }
}
@keyframes cloudDriftR {
  0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
  100% { transform: translate(30vw, -10vh) scale(1.8); opacity: 0; }
}
`;

/* ------------------------------------------------------------------ */
/*  Realistic Ribbon Bow Component                                    */
/* ------------------------------------------------------------------ */
function RibbonBow({ untie }) {
  const an = (n, d = 0) => (untie ? `${n} 1.5s ease-in ${d}s forwards` : "none");
  const origin = "80px 66px";

  return (
    <svg
      viewBox="0 0 160 165"
      width="150"
      style={{
        overflow: "visible",
        filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.5))",
        animation: untie ? "none" : "bwWiggle 2.5s ease-in-out infinite",
        transformOrigin: origin,
      }}
    >
      <defs>
        <linearGradient id="satinGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6e1220" />
          <stop offset="28%" stopColor="#c9384b" />
          <stop offset="48%" stopColor="#ffb9c2" />
          <stop offset="70%" stopColor="#c9384b" />
          <stop offset="100%" stopColor="#5c0f1b" />
        </linearGradient>
        <linearGradient id="satinGrad2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4d0b17" />
          <stop offset="50%" stopColor="#9d2335" />
          <stop offset="100%" stopColor="#5c0f1b" />
        </linearGradient>
        <linearGradient id="satinGrad3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a1523" />
          <stop offset="50%" stopColor="#f08a98" />
          <stop offset="100%" stopColor="#7a1523" />
        </linearGradient>
      </defs>

      {/* Left Tail */}
      <g style={{ transformOrigin: origin, animation: an("bwTailL", 0) }}>
        <path d="M74 72 L30 152 L52 146 L58 162 L90 78Z" fill="url(#satinGrad1)" stroke="#5c0f1b" strokeWidth="0.8" />
        <path d="M70 88 L44 140" stroke="#ffd0d6" strokeOpacity="0.6" strokeWidth="1.2" />
      </g>
      {/* Right Tail */}
      <g style={{ transformOrigin: origin, animation: an("bwTailR", 0) }}>
        <path d="M86 72 L130 152 L108 146 L102 162 L70 78Z" fill="url(#satinGrad1)" stroke="#5c0f1b" strokeWidth="0.8" />
        <path d="M90 88 L116 140" stroke="#ffd0d6" strokeOpacity="0.6" strokeWidth="1.2" />
      </g>
      {/* Left Loop */}
      <g style={{ transformOrigin: origin, animation: an("bwLoopL", 0.1) }}>
        <path d="M80 66 C50 6, 4 12, 8 56 C10 92, 54 86, 80 66Z" fill="url(#satinGrad1)" stroke="#5c0f1b" strokeWidth="0.8" />
        <path d="M78 66 C58 30, 28 30, 26 52 C26 72, 56 76, 78 66Z" fill="url(#satinGrad2)" />
        <path d="M20 40 C34 24, 54 30, 68 52" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* Right Loop */}
      <g style={{ transformOrigin: origin, animation: an("bwLoopR", 0.1) }}>
        <path d="M80 66 C110 6, 156 12, 152 56 C150 92, 106 86, 80 66Z" fill="url(#satinGrad1)" stroke="#5c0f1b" strokeWidth="0.8" />
        <path d="M82 66 C102 30, 132 30, 134 52 C134 72, 104 76, 82 66Z" fill="url(#satinGrad2)" />
        <path d="M140 40 C126 24, 106 30, 92 52" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* Center Knot */}
      <g style={{ transformOrigin: origin, animation: an("bwKnot", 0.35) }}>
        <rect x="62" y="48" width="36" height="38" rx="12" fill="url(#satinGrad3)" stroke="#5c0f1b" strokeWidth="0.8" />
        <path d="M68 54 C74 66 74 72 68 82 M80 50 V84 M92 54 C86 66 86 72 92 82" stroke="#5c0f1b" strokeOpacity="0.4" fill="none" />
        <ellipse cx="74" cy="58" rx="6" ry="3" fill="#fff" opacity="0.45" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Blur-Vision 3D Door Entrance Component                            */
/* ------------------------------------------------------------------ */
function GrandDoorEntrance({ onStart, onComplete }) {
  const [stage, setStage] = useState("idle"); // 'idle' -> 'untying' -> 'doors_open' -> 'vision_clear'
  const timerRefs = useRef([]);

  useEffect(() => {
    return () => timerRefs.current.forEach(clearTimeout);
  }, []);

  const triggerOpen = () => {
    if (stage !== "idle") return;
    if (onStart) onStart();
    setStage("untying");

    // Sequence timing
    timerRefs.current = [
      setTimeout(() => setStage("doors_open"), 1200),
      setTimeout(() => setStage("vision_clear"), 2700),
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 3900),
    ];
  };

  const isUntied = stage !== "idle";
  const doorsAjar = stage === "doors_open" || stage === "vision_clear";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden [perspective:1800px] bg-neutral-950">
      <style>{ENTRANCE_CSS}</style>

      {/* Heavenly Blur Vision Backdrop Behind the Doors */}
      <div 
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${
          doorsAjar ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,248,225,0.95) 0%, rgba(254,243,199,0.85) 45%, rgba(251,191,36,0.3) 70%, transparent 100%)",
          animation: doorsAjar ? "blurVisionFade 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none"
        }}
      >
        {/* Dreamy Ethereal Aura and Light Rays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-200/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-300/40 rounded-full blur-3xl animate-pulse" />
        
        {/* Soft Dream Clouds dispersing as doors pull back */}
        <div 
          className="absolute top-1/3 left-10 w-72 h-24 bg-white/70 rounded-full blur-xl"
          style={{ animation: doorsAjar ? "cloudDriftL 2.4s ease-out forwards" : "none" }}
        />
        <div 
          className="absolute top-1/2 right-10 w-80 h-28 bg-white/70 rounded-full blur-xl"
          style={{ animation: doorsAjar ? "cloudDriftR 2.4s ease-out forwards" : "none" }}
        />
      </div>

      {/* Left 3D Door */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          transformOrigin: "left center",
          transition: "transform 2.2s cubic-bezier(0.65, 0, 0.15, 1), filter 1.8s ease-out",
          transform: doorsAjar ? "rotateY(-112deg)" : "rotateY(0deg)",
          filter: doorsAjar ? "blur(4px) brightness(1.2)" : "none",
          background: "linear-gradient(135deg, #181424 0%, #291e3e 50%, #100b1a 100%)",
          borderRight: "4px solid #D4AF37",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.85), 25px 0 50px rgba(0,0,0,0.9)",
          zIndex: 20
        }}
      >
        <div className="absolute inset-6 sm:inset-12 border-2 border-amber-400/30 rounded-xl pointer-events-none flex flex-col justify-around p-4 shadow-inner">
          <div className="w-full h-1/3 border border-amber-400/20 rounded-lg bg-white/[0.02]" />
          <div className="w-full h-1/3 border border-amber-400/20 rounded-lg bg-white/[0.02]" />
        </div>
        {/* Ornate Gold Handle */}
        <div className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-36 sm:h-48 rounded-full bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-700 border-2 border-white/80 shadow-[0_0_20px_rgba(212,175,55,0.7)]" />
      </div>

      {/* Right 3D Door */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          transformOrigin: "right center",
          transition: "transform 2.2s cubic-bezier(0.65, 0, 0.15, 1), filter 1.8s ease-out",
          transform: doorsAjar ? "rotateY(112deg)" : "rotateY(0deg)",
          filter: doorsAjar ? "blur(4px) brightness(1.2)" : "none",
          background: "linear-gradient(225deg, #181424 0%, #291e3e 50%, #100b1a 100%)",
          borderLeft: "4px solid #D4AF37",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.85), -25px 0 50px rgba(0,0,0,0.9)",
          zIndex: 20
        }}
      >
        <div className="absolute inset-6 sm:inset-12 border-2 border-amber-400/30 rounded-xl pointer-events-none flex flex-col justify-around p-4 shadow-inner">
          <div className="w-full h-1/3 border border-amber-400/20 rounded-lg bg-white/[0.02]" />
          <div className="w-full h-1/3 border border-amber-400/20 rounded-lg bg-white/[0.02]" />
        </div>
        {/* Ornate Gold Handle */}
        <div className="absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-36 sm:h-48 rounded-full bg-gradient-to-b from-yellow-200 via-amber-400 to-amber-700 border-2 border-white/80 shadow-[0_0_20px_rgba(212,175,55,0.7)]" />
      </div>

      {/* Sealed Invitation Card wrapped with Satin Ribbon */}
      <div 
        className={`absolute inset-0 z-30 flex items-center justify-center transition-all duration-700 ${
          doorsAjar ? "opacity-0 scale-125 pointer-events-none" : "opacity-100 scale-100"
        }`}
      >
        <div 
          onClick={triggerOpen}
          role="button"
          tabIndex={0}
          title="Tap the ribbon to untie and open doors"
          className="relative cursor-pointer select-none rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_0_1px_#d9a93c] overflow-hidden"
          style={{
            width: "min(88vw, 360px)",
            height: "min(72vh, 490px)",
            background: "radial-gradient(circle at 35% 20%, rgba(255,255,255,0.96), transparent 65%), linear-gradient(160deg, #fffdf8, #f5ebd2)"
          }}
        >
          {/* Card filigree border */}
          <div className="absolute inset-3 border-2 border-double border-[#c9972e] pointer-events-none rounded-xl" />

          {/* Lettering */}
          <div className="pt-12 px-6 text-center font-serif text-[#4a2f12]">
            <span className="text-[11px] uppercase tracking-widest text-amber-800 font-bold block">
              Solemn Wedding Invitation
            </span>
            <h2 className="text-3xl sm:text-4xl italic font-bold my-4 leading-tight text-neutral-900">
              Austin <br />
              <span className="text-amber-600 text-2xl font-serif">&amp;</span> <br />
              Merin
            </h2>
            <p className="text-xs uppercase tracking-widest text-stone-700 font-medium">
              Invite you to their wedding
            </p>
            <p className="text-sm font-serif italic text-amber-900 mt-2 font-semibold">
              7 · 11 · 2026
            </p>
          </div>

          {/* Vertical Satin Ribbon Band */}
          <div
            className="absolute top-0 bottom-0 left-1/2 w-12 -ml-6 shadow-xl transition-transform duration-1000 ease-in"
            style={{
              background: "linear-gradient(90deg, #5c0f1b, #b52d40 22%, #ffb3bd 46%, #c9384b 66%, #6e1220)",
              transform: isUntied ? "translateY(-120%) rotate(3deg)" : "none",
            }}
          >
            <div className="absolute inset-y-0 left-1.5 right-1.5 border-l border-r border-dashed border-amber-200/70" />
          </div>

          {/* Horizontal Satin Ribbon Band */}
          <div
            className="absolute left-0 right-0 top-[58%] h-12 -mt-6 shadow-xl transition-transform duration-1000 ease-in"
            style={{
              background: "linear-gradient(180deg, #5c0f1b, #b52d40 22%, #ffb3bd 46%, #c9384b 66%, #6e1220)",
              transform: isUntied ? "translateX(120%) rotate(-3deg)" : "none",
            }}
          >
            <div className="absolute inset-x-0 top-1.5 bottom-1.5 border-t border-b border-dashed border-amber-200/70" />
          </div>

          {/* Interactive Silk Knot Bow */}
          <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 z-20">
            <RibbonBow untie={isUntied} />
          </div>

          <div 
            className={`absolute bottom-4 inset-x-0 text-center text-[10px] tracking-widest uppercase font-bold text-amber-900 transition-opacity duration-300 ${
              isUntied ? "opacity-0" : "opacity-100"
            }`}
          >
            Touch Ribbon to Untie &amp; Open
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blessing Quotes                                                   */
/* ------------------------------------------------------------------ */
const BLESSINGS = [
  {
    quote: "Two are better than one, because they have a good return for their labor. A cord of three strands is not quickly broken.",
    source: "Ecclesiastes 4:9, 12",
    tagline: "Sacred Covenant"
  },
  {
    quote: "Love is patient, love is kind. It always protects, always trusts, always hopes, and always perseveres.",
    source: "1 Corinthians 13:4, 7",
    tagline: "Unfailing Devotion"
  },
  {
    quote: "Therefore what God has joined together, let no one separate.",
    source: "Mark 10:9",
    tagline: "Divine Blessing"
  },
  {
    quote: "May your two hearts become one home, and may every door of it stay open to God's eternal love.",
    source: "Solemn Prayer",
    tagline: "Heavenly Harmony"
  },
  {
    quote: "Above all, love each other deeply, because love covers over a multitude of sins.",
    source: "1 Peter 4:8",
    tagline: "Grace & Eternal Love"
  }
];

/* ------------------------------------------------------------------ */
/*  Vector Angel with Wing Flapping                                    */
/* ------------------------------------------------------------------ */
const ROWS = [
  { len: 185, w: 17, from: 28, to: 118, step: 10, fill: "url(#featherGold)" },
  { len: 140, w: 15, from: 34, to: 124, step: 12, fill: "url(#featherGrad)" },
  { len: 98, w: 13, from: 38, to: 128, step: 14, fill: "url(#featherGrad)" },
  { len: 58, w: 11, from: 42, to: 132, step: 18, fill: "url(#featherGrad)" },
];

const featherPath = (L, w) =>
  `M0 0 C ${w} ${-L * 0.15}, ${w * 1.15} ${-L * 0.7}, 0 ${-L} ` +
  `C ${-w * 1.15} ${-L * 0.7}, ${-w} ${-L * 0.15}, 0 0 Z`;

function Wing({ side }) {
  const sx = side === "r" ? 222 : 178;
  const mirror = side === "l" ? "scale(-1 1) " : "";
  return (
    <g className={`wing wing-${side}`}>
      {ROWS.map((row, r) => {
        const items = [];
        for (let a = row.from; a <= row.to; a += row.step) {
          items.push(
            <g key={`${r}-${a}`} transform={`translate(${sx} 175) ${mirror}rotate(${a})`}>
              <path
                d={featherPath(row.len, row.w)}
                fill={row.fill}
                stroke="#b7c6e2"
                strokeWidth="0.7"
                strokeOpacity="0.7"
              />
              <path
                d={`M0 -4 L0 ${-row.len * 0.88}`}
                stroke="#c9d6ec"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </g>
          );
        }
        return items;
      })}
    </g>
  );
}

function Arm() {
  return (
    <g>
      <path
        d="M174 160 C148 192 134 244 142 284 C150 292 172 294 180 286 C180 244 188 204 194 176 Z"
        fill="url(#gown)"
        stroke="#e6dcc3"
        strokeWidth="0.8"
      />
      <path d="M150 262 C156 270 166 272 174 268" stroke="#e4d8bb" strokeWidth="1" fill="none" />
      <path d="M156 232 C160 250 160 264 158 276" stroke="#eadfc6" strokeWidth="1" fill="none" />
      <ellipse cx="161" cy="294" rx="12" ry="9" fill="url(#skin)" />
      <ellipse cx="172" cy="291" rx="5" ry="4" fill="url(#skin)" />
    </g>
  );
}

function AngelSvg() {
  return (
    <svg
      viewBox="-40 0 480 440"
      className="block w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-visible select-none drop-shadow-[0_12px_28px_rgba(217,119,6,0.3)]"
      role="img"
      aria-label="Celestial Angel"
    >
      <defs>
        <linearGradient id="featherGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d3def2" />
        </linearGradient>
        <linearGradient id="featherGold" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#eef1f9" />
          <stop offset="1" stopColor="#f2dfae" />
        </linearGradient>
        <linearGradient id="gown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6ead0" />
        </linearGradient>
        <radialGradient id="skin" cx="0.45" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#fbe3d0" />
          <stop offset="1" stopColor="#efc3a4" />
        </radialGradient>
        <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e9c57a" />
          <stop offset="1" stopColor="#b98a43" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff0b8" />
          <stop offset="0.5" stopColor="#e3b850" />
          <stop offset="1" stopColor="#c48f26" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-200%" width="200%" height="500%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse cx="200" cy="200" rx="170" ry="170" fill="#fff" opacity="0.35" filter="url(#soft)" />

      <Wing side="l" />
      <Wing side="r" />

      <path
        d="M172 100 C162 56 238 56 228 100 C242 140 238 178 222 194 L178 194 C162 178 158 140 172 100 Z"
        fill="url(#hair)"
      />

      <path
        d="M170 160 C185 146 215 146 230 160 L242 236 C260 312 288 372 308 428 C250 444 150 444 92 428 C112 372 140 312 158 236 Z"
        fill="url(#gown)"
        stroke="#e6dcc3"
        strokeWidth="0.8"
      />
      <g stroke="#eadfc6" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M190 250 C186 320 172 380 160 430" />
        <path d="M200 252 C200 320 200 380 200 434" />
        <path d="M210 250 C214 320 228 380 240 430" />
      </g>

      <path d="M186 152 Q200 170 214 152" stroke="#e6dcc3" strokeWidth="1.2" fill="none" />
      <path d="M161 234 Q200 250 239 234 L240 246 Q200 262 160 246 Z" fill="url(#gold)" />
      <path d="M192 128 L192 150 Q200 158 208 150 L208 128 Z" fill="#efc3a4" />

      <ellipse cx="200" cy="105" rx="22" ry="27" fill="url(#skin)" />
      <path d="M187 107 q5 4 10 0" stroke="#7a5038" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M203 107 q5 4 10 0" stroke="#7a5038" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M186 100 q6 -4 11 -1" stroke="#a9793f" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M203 99 q5 -3 11 1" stroke="#a9793f" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M200 112 q-3 6 1 8" stroke="#d9a586" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M193 125 q7 5 14 0" stroke="#c9736f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <ellipse cx="186" cy="116" rx="5" ry="3" fill="#f3a3a0" opacity="0.45" />
      <ellipse cx="214" cy="116" rx="5" ry="3" fill="#f3a3a0" opacity="0.45" />

      <path
        d="M177 102 C176 70 224 70 223 102 C214 88 206 83 200 80 C194 83 186 88 177 102 Z"
        fill="url(#hair)"
      />
      <path d="M200 80 C196 90 190 96 182 100" stroke="#c99b52" strokeWidth="1" fill="none" />
      <path d="M200 80 C204 90 210 96 218 100" stroke="#c99b52" strokeWidth="1" fill="none" />
      <path d="M174 140 C166 152 170 168 180 172" stroke="#c99b52" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M226 140 C234 152 230 168 220 172" stroke="#c99b52" strokeWidth="2" fill="none" strokeLinecap="round" />

      <Arm />
      <g transform="translate(400 0) scale(-1 1)">
        <Arm />
      </g>

      <g className="halo" filter="url(#glow)">
        <ellipse cx="200" cy="62" rx="34" ry="9" fill="none" stroke="url(#gold)" strokeWidth="4.5" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Free Floating Rings ("A" & "M") - Heart Formation on Touch         */
/* ------------------------------------------------------------------ */
function GlobalFloatingRings() {
  const [isMerged, setIsMerged] = useState(false);

  const handleTriggerMerge = () => {
    if (isMerged) return;
    setIsMerged(true);

    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#DC2626", "#EF4444", "#FFD700", "#F59E0B", "#FFFFFF"],
    });

    setTimeout(() => {
      setIsMerged(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Ring A */}
      <div
        onClick={handleTriggerMerge}
        role="button"
        tabIndex={0}
        title="Tap the rings to unite our hearts"
        className={`pointer-events-auto cursor-pointer absolute transition-all duration-1000 ease-in-out ${
          isMerged
            ? "top-1/2 left-1/2 -translate-x-full -translate-y-1/2 scale-110 z-50"
            : "top-28 left-4 sm:left-12 anim-drift-ring-1"
        }`}
      >
        <div className="relative group p-2">
          <svg viewBox="0 0 80 80" className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_0_15px_rgba(217,119,6,0.85)]">
            <defs>
              <linearGradient id="ringAGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="35%" stopColor="#FBBF24" />
                <stop offset="70%" stopColor="#B45309" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="28" stroke="url(#ringAGrad)" strokeWidth="6" fill="none" />
            <circle cx="40" cy="40" r="24" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.6" />
            <text
              x="40"
              y="46"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#92400E"
              fontSize="20"
              fontWeight="bold"
              fontFamily="serif"
            >
              A
            </text>
            <circle cx="20" cy="22" r="3.5" fill="#FFF" className="animate-ping" />
          </svg>
        </div>
      </div>

      {/* Ring M */}
      <div
        onClick={handleTriggerMerge}
        role="button"
        tabIndex={0}
        title="Tap the rings to unite our hearts"
        className={`pointer-events-auto cursor-pointer absolute transition-all duration-1000 ease-in-out ${
          isMerged
            ? "top-1/2 left-1/2 translate-x-0 -translate-y-1/2 scale-110 z-50"
            : "top-40 right-4 sm:right-12 anim-drift-ring-2"
        }`}
      >
        <div className="relative group p-2">
          <svg viewBox="0 0 80 80" className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_0_15px_rgba(217,119,6,0.85)]">
            <defs>
              <linearGradient id="ringMGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF9E6" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#92400E" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>
            </defs>
            <circle cx="40" cy="40" r="28" stroke="url(#ringMGrad)" strokeWidth="6" fill="none" />
            <circle cx="40" cy="40" r="24" stroke="#FFF" strokeWidth="1" fill="none" opacity="0.6" />
            <text
              x="40"
              y="46"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#92400E"
              fontSize="20"
              fontWeight="bold"
              fontFamily="serif"
            >
              M
            </text>
            <circle cx="60" cy="22" r="3.5" fill="#FFF" className="animate-ping" />
          </svg>
        </div>
      </div>

      {/* Merged Heart Center Effect */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 z-50 flex flex-col items-center ${
          isMerged ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute w-36 h-36 rounded-full bg-red-500/30 blur-2xl animate-pulse" />
          <Heart className="w-24 h-24 text-red-600 fill-red-500 drop-shadow-[0_0_35px_rgba(220,38,38,0.95)] animate-bounce" />
          <Sparkles className="w-8 h-8 text-amber-300 absolute -top-2 -right-2 animate-spin" />
          <Sparkles className="w-6 h-6 text-white absolute bottom-1 -left-2 animate-pulse" />
        </div>
        <span className="mt-2 text-sm uppercase tracking-widest text-red-700 bg-white/95 px-4 py-1 rounded-full border border-red-300 shadow font-sans font-extrabold animate-pulse">
          Two Hearts Form One Love
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Photorealistic Center Wedding Ring Component                      */
/* ------------------------------------------------------------------ */
function RealisticGoldWeddingRing({ className = "w-14 h-14" }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(217,119,6,0.65)]"
      >
        <defs>
          <linearGradient id="solidGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="25%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          <linearGradient id="innerBandShine" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="50%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          <linearGradient id="diamondFacet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E0F2FE" />
            <stop offset="70%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="56" r="34" stroke="url(#solidGoldGrad)" strokeWidth="7" fill="none" />
        <circle cx="50" cy="56" r="30.5" stroke="url(#innerBandShine)" strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
        <path d="M 43 28 L 47 22 L 53 22 L 57 28 Z" fill="url(#solidGoldGrad)" />
        <rect x="42" y="21" width="2" height="6" rx="1" fill="#FEF3C7" />
        <rect x="56" y="21" width="2" height="6" rx="1" fill="#FEF3C7" />
        <polygon points="50,11 61,22 50,30 39,22" fill="url(#diamondFacet)" stroke="#BAE6FD" strokeWidth="0.8" />
        <polygon points="50,11 50,30 44,22" fill="#FFFFFF" fillOpacity="0.8" />
        <polygon points="50,11 56,22 50,30" fill="#7DD3FC" fillOpacity="0.4" />
        <circle cx="50" cy="18" r="1.8" fill="#FFFFFF" className="animate-ping" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive Clasping Hands: Moves with time & holds at finish     */
/* ------------------------------------------------------------------ */
function ResponsiveClaspingHands({ isHeld = false, progress = 0 }) {
  const [showCloud, setShowCloud] = useState(false);
  const cloudTimerRef = useRef(null);

  const handleRingClick = () => {
    setShowCloud(true);
    if (cloudTimerRef.current) clearTimeout(cloudTimerRef.current);
    cloudTimerRef.current = setTimeout(() => {
      setShowCloud(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (cloudTimerRef.current) clearTimeout(cloudTimerRef.current);
    };
  }, []);

  const currentProgress = isHeld ? 100 : Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between px-2 sm:px-6 h-28 sm:h-36 relative select-none overflow-visible">
      {/* 3-Second Floating Cloud Pop-up */}
      <div
        className={`absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 pointer-events-none ${
          showCloud
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-3"
        }`}
      >
        <div className="relative bg-white text-neutral-900 border-2 border-amber-400 px-4 py-2 sm:px-6 sm:py-2.5 rounded-3xl shadow-[0_10px_35px_rgba(212,175,55,0.5)] text-center max-w-[280px] sm:max-w-md">
          <p className="text-[11px] sm:text-xs font-serif font-bold italic leading-snug text-neutral-900">
            ☁️ <span className="text-amber-700">Please wait until the date arrives</span> for Austin to hold the hand of Merin. ✨
          </p>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-amber-400 rotate-45" />
        </div>
      </div>

      {/* Left Hand: Austin */}
      <div
        style={{
          transform: isHeld 
            ? "translateX(calc(50% - 1.25rem))" 
            : `translateX(${currentProgress * 0.45}%)`
        }}
        className="flex items-center gap-1 sm:gap-2 transition-transform duration-1000 ease-out z-20"
      >
        <svg
          viewBox="0 0 160 80"
          className="w-24 sm:w-36 md:w-44 h-16 sm:h-24 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
        >
          <defs>
            <linearGradient id="groomSleeveDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1E1E" />
              <stop offset="85%" stopColor="#0F0F0F" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="groomSkinTone" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#E2A76F" />
              <stop offset="100%" stopColor="#C98642" />
            </linearGradient>
          </defs>
          <rect x="0" y="24" width="45" height="32" rx="3" fill="url(#groomSleeveDark)" stroke="#D4AF37" strokeWidth="1.5" />
          <rect x="44" y="27" width="5" height="26" rx="1" fill="#FFFFFF" />
          <path d="M 48 30 C 65 28, 85 24, 105 28 C 120 30, 135 34, 150 38 C 145 44, 130 46, 120 46 C 105 46, 85 52, 48 48 Z" fill="url(#groomSkinTone)" />
          <path d="M 120 34 C 135 34, 155 38, 158 41 C 150 45, 135 44, 120 42" stroke="#8D5524" strokeWidth="1" fill="url(#groomSkinTone)" />
          <path d="M 105 38 C 120 40, 140 43, 148 47 C 138 50, 120 48, 105 46" stroke="#8D5524" strokeWidth="1" fill="url(#groomSkinTone)" />
        </svg>
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-sans font-bold text-amber-400">Austin</span>
      </div>

      {/* Center Brightening Golden Ring */}
      <div 
        onClick={handleRingClick}
        title="Tap the glowing ring"
        className="relative z-30 flex flex-col items-center justify-center cursor-pointer group hover:scale-110 active:scale-95 transition-transform"
      >
        <div className="p-2 sm:p-2.5 rounded-full bg-white/10 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(251,191,36,0.8)] backdrop-blur-sm animate-pulse">
          <RealisticGoldWeddingRing className="w-10 h-10 sm:w-14 sm:h-14" />
        </div>
        <span className="text-[9px] font-sans uppercase tracking-widest text-amber-300 font-bold mt-1.5 whitespace-nowrap">
          {isHeld ? "Held Forever" : "Tap Ring"}
        </span>
      </div>

      {/* Right Hand: Merin */}
      <div
        style={{
          transform: isHeld 
            ? "translateX(calc(-50% + 1.25rem))" 
            : `translateX(-${currentProgress * 0.45}%)`
        }}
        className="flex items-center gap-1 sm:gap-2 transition-transform duration-1000 ease-out z-20"
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-sans font-bold text-amber-400">Merin</span>
        <svg
          viewBox="0 0 160 80"
          className="w-24 sm:w-36 md:w-44 h-16 sm:h-24 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] scale-x-[-1]"
        >
          <defs>
            <linearGradient id="bridalLaceWhite" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="85%" stopColor="#F7F3EB" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="brideSkinTone" x1="0%" y1="0%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#F3C382" />
              <stop offset="100%" stopColor="#E2A76F" />
            </linearGradient>
          </defs>
          <rect x="0" y="24" width="45" height="32" rx="4" fill="url(#bridalLaceWhite)" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="12" y1="24" x2="12" y2="56" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="28" y1="24" x2="28" y2="56" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 45 28 C 65 26, 85 24, 105 27 C 120 29, 138 32, 154 35 C 146 41, 132 43, 118 43 C 100 44, 80 48, 45 46 Z" fill="url(#brideSkinTone)" />
          <path d="M 52 27 L 52 47" stroke="#D4AF37" strokeWidth="2" strokeDasharray="1 2" />
          <path d="M 115 31 C 132 31, 150 35, 155 37 C 146 41, 132 40, 115 38" stroke="#A66E38" strokeWidth="0.8" fill="url(#brideSkinTone)" />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Angel Header with Flowing Flower-Bloomed Quotes (No Overlap)        */
/* ------------------------------------------------------------------ */
function AngelAndBloomingQuotes() {
  const [currIdx, setCurrIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrIdx((prev) => (prev + 1) % BLESSINGS.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const b = BLESSINGS[currIdx];

  return (
    <div className="relative w-full max-w-2xl mx-auto my-4 flex flex-col items-center">
      <div className="angel-float relative z-10 pointer-events-none mb-1">
        <AngelSvg />
      </div>

      <div className="relative z-20 w-full px-3 sm:px-6">
        <div className="relative rounded-3xl border-2 border-amber-400/80 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFF4E0] p-6 sm:p-8 text-center shadow-xl shadow-amber-900/10 backdrop-blur-md overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />

          <div key={currIdx} className="bloom-flash">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-700 text-xs font-sans font-bold uppercase tracking-widest">
              <span className="text-amber-500 animate-spin [animation-duration:8s]">🌸</span>
              <span>{b.tagline}</span>
              <span className="text-amber-500 animate-spin [animation-duration:8s]">🌸</span>
            </div>

            <blockquote className="min-h-[4.5rem] flex items-center justify-center text-sm sm:text-base italic font-medium leading-relaxed text-stone-800 font-serif">
              “{b.quote}”
            </blockquote>

            <p className="mt-2 text-xs font-sans font-bold uppercase tracking-wider text-amber-900/80">
              — {b.source}
            </p>
          </div>

          <div className="w-24 h-1 bg-amber-200 mx-auto mt-4 rounded-full overflow-hidden">
            <div key={currIdx} className="h-full bg-amber-600 rounded-full anim-progress" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */
export default function WeddingCard() {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeldTime, setIsHeldTime] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const audioRef = useRef(null);

  // Target Date: November 7, 2026 11:00:00 AM IST
  const targetDate = new Date("2026-11-07T11:00:00+05:30").getTime();
  const startDate = useRef(new Date("2026-01-01T00:00:00+05:30").getTime()).current;

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const totalSpan = targetDate - startDate;
      const elapsed = now - startDate;
      const pct = Math.min(100, Math.max(0, (elapsed / totalSpan) * 100));
      setTimelineProgress(pct);

      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setIsHeldTime(true);
      } else {
        setIsHeldTime(false);
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate, startDate]);

  const handleEntranceStart = () => {
    confetti({
      particleCount: 160,
      spread: 120,
      origin: { y: 0.5 },
      colors: ["#D4AF37", "#8A1C2B", "#FFFFFF", "#FBBF24", "#F4A3AD"],
    });

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleEntranceComplete = () => {
    setIsGateOpen(true);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-neutral-900 font-serif relative overflow-x-hidden selection:bg-amber-400 selection:text-black">
      
      {/* 3D Door Entrance with Ribbon Untying and Blur Transition */}
      {!isGateOpen && (
        <CinematicEntrance
          onStart={handleEntranceStart}
          onComplete={handleEntranceComplete}
        />
      )}

      {/* Free Floating Interactive Rings (A & M) All Over Site */}
      <GlobalFloatingRings />

      {/* Dynamic Keyframe Style Injections */}
      <style>{`
        .wing { transform-box: fill-box; }
        .wing-r { transform-origin: 0% 100%; animation: flapR 3.2s ease-in-out infinite; }
        .wing-l { transform-origin: 100% 100%; animation: flapL 3.2s ease-in-out infinite; }
        @keyframes flapR { 0%,100% { transform: rotate(8deg); } 50% { transform: rotate(-14deg); } }
        @keyframes flapL { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(14deg); } }

        .angel-float { animation: floaty 3.4s ease-in-out infinite; }
        @keyframes floaty { 0%,100% { transform: translateY(4px) rotate(-0.5deg); } 50% { transform: translateY(-7px) rotate(0.5deg); } }

        .halo { animation: haloPulse 2.6s ease-in-out infinite; }
        @keyframes haloPulse { 0%,100% { opacity: .75; } 50% { opacity: 1; } }

        .bloom-flash { animation: bloomEffect 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes bloomEffect {
          0% { opacity: 0; transform: scale(0.94); filter: brightness(1.6) blur(2px); }
          60% { filter: brightness(1.1) blur(0px); }
          100% { opacity: 1; transform: scale(1); filter: brightness(1); }
        }

        .anim-progress { animation: barFill 6s linear infinite; }
        @keyframes barFill { 0% { width: 0%; } 100% { width: 100%; } }

        .anim-drift-ring-1 { animation: drift1 9s ease-in-out infinite alternate; }
        @keyframes drift1 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(15px, 35px) rotate(8deg); }
          100% { transform: translate(28px, 10px) rotate(-6deg); }
        }

        .anim-drift-ring-2 { animation: drift2 10s ease-in-out infinite alternate; }
        @keyframes drift2 {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(-20px, 30px) rotate(-8deg); }
          100% { transform: translate(-10px, 60px) rotate(6deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .wing-r, .wing-l, .angel-float, .halo, .bloom-flash, .anim-drift-ring-1, .anim-drift-ring-2 {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background Wedding Audio */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {/* ========================================================================= */}
      {/* NAVBAR                                                                    */}
      {/* ========================================================================= */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-8 px-8 py-3 bg-white/95 border-2 border-amber-500/50 rounded-full shadow-xl backdrop-blur-md">
        <a href="#hero" className="text-xs uppercase tracking-widest font-bold text-neutral-800 hover:text-amber-600 transition">Welcome</a>
        <a href="#countdown" className="text-xs uppercase tracking-widest font-bold text-neutral-800 hover:text-amber-600 transition">Countdown</a>
        <a href="#details" className="text-xs uppercase tracking-widest font-bold text-neutral-800 hover:text-amber-600 transition">Ceremony</a>
        <a href="#families" className="text-xs uppercase tracking-widest font-bold text-neutral-800 hover:text-amber-600 transition">Families</a>
        <a href="#location" className="text-xs uppercase tracking-widest font-bold text-neutral-800 hover:text-amber-600 transition">Venue Map</a>
      </nav>

      <div className="fixed top-5 right-5 z-40 lg:hidden">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Navigation Menu"
          className="p-3 bg-white/95 border-2 border-amber-500 rounded-full shadow-lg text-amber-800 backdrop-blur-md hover:bg-neutral-100 transition"
        >
          {isNavOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
        </button>
      </div>

      {isNavOpen && (
        <div className="lg:hidden fixed top-20 right-5 z-40 bg-white/95 border-2 border-amber-500/60 backdrop-blur-xl p-5 rounded-2xl shadow-2xl flex flex-col gap-3 min-w-[200px] text-sm">
          <a href="#hero" onClick={() => setIsNavOpen(false)} className="text-neutral-900 font-semibold hover:text-amber-600 transition">Welcome</a>
          <a href="#countdown" onClick={() => setIsNavOpen(false)} className="text-neutral-900 font-semibold hover:text-amber-600 transition">Countdown</a>
          <a href="#details" onClick={() => setIsNavOpen(false)} className="text-neutral-900 font-semibold hover:text-amber-600 transition">Ceremony &amp; Reception</a>
          <a href="#families" onClick={() => setIsNavOpen(false)} className="text-neutral-900 font-semibold hover:text-amber-600 transition">Family Details</a>
          <a href="#location" onClick={() => setIsNavOpen(false)} className="text-neutral-900 font-semibold hover:text-amber-600 transition">Venue &amp; Map</a>
        </div>
      )}

      {/* Floating Music Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400 shadow-lg text-[11px] font-sans">
          <span className="font-bold text-amber-800 flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-amber-600" /> Wedding Anthem
          </span>
          <span className="text-[9px] text-neutral-500">{isPlaying ? "Now Playing" : "Tap to Play"}</span>
        </div>

        <button
          onClick={toggleMusic}
          title={isPlaying ? "Pause Wedding Song" : "Play Wedding Song"}
          className="relative w-14 h-14 rounded-full border-2 border-amber-400 bg-neutral-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
        >
          <div className="absolute inset-1 rounded-full border border-neutral-800" />
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-300 to-amber-500 border border-white flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-black" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="w-4 h-4 text-amber-200 drop-shadow-md" />
            ) : (
              <Play className="w-4 h-4 text-amber-200 ml-0.5 drop-shadow-md" />
            )}
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* HERO SECTION                                                             */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-2 pb-16 overflow-hidden bg-gradient-to-b from-white via-[#FFFDF9] to-[#FAF6EE]"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.1)_0,transparent_75%)]" />

        <TopRings />

        <p className="text-amber-800 uppercase tracking-widest text-xs sm:text-sm font-sans font-bold mb-1">
          In God's Eternal Grace &amp; Love
        </p>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold italic tracking-wide text-neutral-950 mb-6">
          Austin <span className="text-amber-600">&amp;</span> Merin
        </h1>

        {/* Full Couple Portrait */}
        <div className="relative w-full max-w-2xl flex justify-center my-4 z-20 px-2 sm:px-4">
          <div className="w-full p-2.5 sm:p-3.5 bg-gradient-to-t from-amber-600 via-amber-300 to-yellow-200 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.35)]">
            <div className="bg-white p-2 rounded-[22px] flex items-center justify-center overflow-hidden">
              <img
                src="/couple.jpg"
                alt="Austin & Merin Wedding Portrait"
                className="w-full h-auto max-h-[80vh] object-contain rounded-[18px] filter contrast-105 block mx-auto transition-transform hover:scale-[1.01]"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200";
                }}
              />
            </div>
          </div>
        </div>

        {/* Flapping Wings Angel & Flowing Flower Quotes */}
        <AngelAndBloomingQuotes />

        <p className="text-neutral-700 text-sm max-w-lg mt-6 leading-relaxed z-20">
          With immense joy, deep respect, and gratitude in our hearts, we cordially invite you and your family to witness and celebrate the sacred sacrament of holy matrimony.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* COUNTDOWN & CLASPING HANDS SECTION (2 COLUMNS PER ROW IN MOBILE VIEW)     */}
      {/* ========================================================================= */}
      <section id="countdown" className="py-16 bg-neutral-950 text-white border-y-2 border-amber-500/40 text-center relative overflow-hidden">
        <ResponsiveClaspingHands isHeld={isHeldTime} progress={timelineProgress} />

        <h2 className="text-xs uppercase tracking-widest text-amber-400 font-sans font-bold mb-6 mt-4">
          Counting Down To The Sacred Solemnization
        </h2>

        {/* 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto px-4">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HOURS", value: timeLeft.hours },
            { label: "MINUTES", value: timeLeft.minutes },
            { label: "SECONDS", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-amber-400 p-4 rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.3)] text-neutral-950 flex flex-col items-center justify-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-mono">
                {item.value}
              </div>
              <div className="text-[10px] sm:text-xs text-amber-800 font-bold uppercase tracking-wider mt-1 font-sans">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CEREMONY & RECEPTION SCHEDULE                                            */}
      {/* ========================================================================= */}
      <section id="details" className="py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-800 text-xs uppercase tracking-widest font-sans font-bold">
            Holy Solemnization
          </span>
          <h2 className="text-3xl font-serif text-neutral-950 font-bold mt-1">Wedding Ceremony &amp; Reception</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 relative shadow-lg">
            <div className="w-12 h-12 rounded-full bg-amber-500/15 border-2 border-amber-400 flex items-center justify-center mb-4 text-amber-700">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 mb-2">The Marriage Ceremony</h3>
            <p className="text-sm text-neutral-700 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" /> Saturday, November 7, 2026 | 11:00 AM
            </p>
            <p className="text-neutral-600 text-sm mt-3">
              <strong className="text-neutral-900">Little Flower Church</strong>
              <br />
              Elamkunnu Road, Madappally, Kerala
            </p>
          </div>

          <div className="bg-white border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 relative shadow-lg">
            <div className="w-12 h-12 rounded-full bg-amber-500/15 border-2 border-amber-400 flex items-center justify-center mb-4 text-amber-700">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 mb-2">Marriage Reception</h3>
            <p className="text-sm text-neutral-700 mb-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" /> Saturday, November 7, 2026 | 12:30 PM
            </p>
            <p className="text-neutral-600 text-sm mt-3">
              <strong className="text-neutral-900">Church Parish Hall</strong>
              <br />
              Little Flower Church Grounds, Madappally
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FAMILY DETAILS                                                            */}
      {/* ========================================================================= */}
      <section id="families" className="py-14 bg-[#FAF6EE] border-t-2 border-amber-400/30 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-amber-800 text-xs uppercase tracking-widest font-sans font-bold">
              With Love &amp; Honor
            </span>
            <h2 className="text-3xl font-serif text-neutral-950 font-bold mt-1">Our Families</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-amber-400/70 p-6 rounded-3xl text-center shadow-md">
              <span className="text-amber-700 text-xs font-sans uppercase tracking-widest font-bold">
                Groom's Family
              </span>
              <h3 className="text-xl font-serif font-bold text-neutral-950 mt-2">Austin Jose Thomas</h3>
              <p className="text-neutral-700 text-sm mt-3">
                Son of <strong className="text-neutral-900">Mr. Tomy Joseph</strong> &amp; <br />
                <strong className="text-neutral-900">Mrs. Sherly Tomy</strong>
              </p>
              <p className="text-xs text-neutral-500 mt-3 italic">
                Kombanaparambil House, Madappally P.O, Changanacherry
              </p>
            </div>

            <div className="bg-white border-2 border-amber-400/70 p-6 rounded-3xl text-center shadow-md">
              <span className="text-amber-700 text-xs font-sans uppercase tracking-widest font-bold">
                Bride's Family
              </span>
              <h3 className="text-xl font-serif font-bold text-neutral-950 mt-2">Merin Mathew</h3>
              <p className="text-neutral-700 text-sm mt-3">
                Daughter of <strong className="text-neutral-900">Mr. Mathukutty Oommen</strong> &amp; <br />
                <strong className="text-neutral-900">Mrs. Molly Mathew</strong>
              </p>
              <p className="text-xs text-neutral-500 mt-3 italic">
                Valakuzhy House, Anikad P.O, Mallapally
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* LOCATION & GOOGLE MAP DIRECTIONS                                         */}
      {/* ========================================================================= */}
      <section id="location" className="py-16 px-4 max-w-4xl mx-auto text-center">
        <span className="text-amber-800 text-xs uppercase tracking-widest font-sans font-bold">
          Find Your Way
        </span>
        <h2 className="text-3xl font-serif text-neutral-950 font-bold mt-1 mb-6 flex items-center justify-center gap-2">
          <MapPin className="text-amber-600 w-6 h-6" /> Location &amp; Directions
        </h2>

        <div className="w-full h-80 rounded-3xl overflow-hidden border-2 border-amber-400 shadow-xl relative">
          <iframe
            title="Ceremony Location"
            className="w-full h-full border-0 filter contrast-105"
            src="https://maps.google.com/maps?q=Little+Flower+Church+Madappally+Changanacherry&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href="https://maps.google.com/?q=Little+Flower+Church+Madappally"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-neutral-950 font-extrabold text-sm tracking-wider uppercase hover:scale-105 transition shadow-lg border border-amber-400"
        >
          Open in Google Maps App
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-950 border-t-2 border-amber-500/30 text-center text-amber-200/80 text-xs font-sans">
        <p>© 2026 Austin &amp; Merin Wedding. Blessed &amp; Beloved.</p>
      </footer>
    </div>
  );
}
