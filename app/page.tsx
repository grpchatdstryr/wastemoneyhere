"use client";

import { useState } from "react";

const PRESETS = [5, 25, 50, 100, 250, 500, 1000];

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" /><line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" /><line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Home() {
  const [dark, setDark] = useState(true);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const t = {
    bg:           dark ? "#000"                                                           : "#F4F3EE",
    text:         dark ? "#fff"                                                           : "#0a0a0a",
    textDim:      dark ? "rgba(255,255,255,0.70)"                                         : "rgba(0,0,0,0.65)",
    textMuted:    dark ? "rgba(255,255,255,0.40)"                                         : "rgba(0,0,0,0.38)",
    accent:       dark ? "#4ade80"                                                        : "#15803d",
    accentBorder: dark ? "rgba(74,222,128,0.35)"                                          : "rgba(21,128,61,0.35)",
    accentGlow:   dark ? "rgba(74,222,128,0.10)"                                          : "rgba(21,128,61,0.08)",
    surface:      dark ? "rgba(255,255,255,0.06)"                                         : "rgba(255,255,255,0.80)",
    surfBorder:   dark ? "rgba(255,255,255,0.12)"                                         : "rgba(0,0,0,0.12)",
    grid:         dark ? "rgba(255,255,255,0.03)"                                         : "rgba(0,0,0,0.05)",
    toggleBg:     dark ? "rgba(255,255,255,0.08)"                                         : "rgba(0,0,0,0.07)",
    toggleBorder: dark ? "rgba(255,255,255,0.14)"                                         : "rgba(0,0,0,0.12)",
    toggleColor:  dark ? "rgba(255,255,255,0.65)"                                         : "rgba(0,0,0,0.55)",
    btnText:      dark ? "#000"                                                           : "#fff",
    btnGradient:  dark ? "linear-gradient(135deg, #4ade80, #16a34a)"                      : "linear-gradient(135deg, #16a34a, #15803d)",
    btnShadow:    dark ? "0 0 30px rgba(74,222,128,0.40), 0 0 80px rgba(74,222,128,0.12)" : "0 4px 24px rgba(21,128,61,0.30), 0 1px 4px rgba(0,0,0,0.10)",
  };

  async function waste() {
    const cents = Math.round(parseFloat(amount) * 100);
    if (!cents || cents < 1 || cents > 1_000_000) {
      setError("Enter an amount between $0.01 and $10,000");
      return;
    }
    setError("");
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cents }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className={`${dark ? "dark-mode" : "light-mode"} relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden`}
      style={{ background: t.bg, color: t.text, transition: "background-color 0.5s ease, color 0.4s ease" }}
    >
      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${t.grid} 1px, transparent 1px), linear-gradient(90deg, ${t.grid} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Aurora blobs (dark only) ── */}
      {dark && <>
        <div className="aurora" style={{ width: 640, height: 640, background: "radial-gradient(circle, rgba(74,222,128,0.13) 0%, transparent 70%)", top: -180, left: -180, animation: "aurora1 20s ease-in-out infinite" }} />
        <div className="aurora" style={{ width: 520, height: 520, background: "radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)", bottom: -160, right: -120, animation: "aurora2 26s ease-in-out infinite" }} />
        <div className="aurora" style={{ width: 380, height: 380, background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", top: "45%", left: "58%", animation: "aurora3 18s ease-in-out infinite" }} />
      </>}

      {/* ── Light mode soft blobs ── */}
      {!dark && <>
        <div className="aurora" style={{ width: 580, height: 580, background: "radial-gradient(circle, rgba(21,128,61,0.07) 0%, transparent 70%)", top: -160, left: -160, animation: "aurora1 22s ease-in-out infinite" }} />
        <div className="aurora" style={{ width: 480, height: 480, background: "radial-gradient(circle, rgba(21,128,61,0.05) 0%, transparent 70%)", bottom: -140, right: -120, animation: "aurora2 28s ease-in-out infinite" }} />
      </>}

      {/* ── Theme toggle ── */}
      <button
        onClick={() => setDark(!dark)}
        className="theme-toggle absolute top-5 right-5 z-20 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer"
        style={{ background: t.toggleBg, border: `1px solid ${t.toggleBorder}`, color: t.toggleColor, backdropFilter: "blur(12px)" }}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
        <span>{dark ? "Light" : "Dark"}</span>
      </button>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-sm w-full text-center flex flex-col gap-8">

        {/* Hero */}
        <div className="flex flex-col gap-4">

          <div className="flex justify-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: t.accentGlow, border: `1px solid ${t.accentBorder}`, color: t.accent }}
            >
              <span className="pulse-dot shrink-0" style={{ width: 5, height: 5, borderRadius: "50%", background: t.accent, display: "inline-block" }} />
              The world&apos;s most honest transaction
            </div>
          </div>

          <h1 className={`${dark ? "shimmer-dark" : "shimmer-light"} text-5xl sm:text-6xl font-black tracking-tight`}>
            Waste Money Here
          </h1>

          <p className="text-sm leading-relaxed" style={{ color: t.textDim }}>
            You&apos;re going to waste money anyway — forgotten subscriptions,
            impulse buys, stuff you swore you&apos;d use.{" "}
            <span style={{ color: t.text, fontWeight: 600 }}>
              Might as well do it on purpose.
            </span>
          </p>
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-3">

          <div
            className="amount-input flex items-center gap-3 rounded-2xl px-5 py-4"
            style={{ background: t.surface, border: `1px solid ${t.surfBorder}` }}
          >
            <span className="text-2xl font-light" style={{ color: t.textMuted }}>$</span>
            <input
              type="number"
              min="0.01"
              max="10000"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-4xl font-black flex-1 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              style={{ color: t.text, caretColor: t.accent }}
            />
            <span className="text-xs font-semibold tracking-widest" style={{ color: t.textMuted }}>USD</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(String(p))}
                className={`preset-pill px-3 py-1 rounded-full text-sm font-medium cursor-pointer${amount === String(p) ? " active" : ""}`}
                style={{ border: `1px solid ${t.surfBorder}`, color: t.textDim }}
              >
                ${p.toLocaleString()}
              </button>
            ))}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={waste}
            disabled={loading || !amount}
            className="waste-btn w-full font-black text-lg py-4 rounded-2xl disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: t.btnGradient, color: t.btnText, boxShadow: (loading || !amount) ? "none" : t.btnShadow }}
          >
            {loading ? "Sending it to the void..." : "Waste It"}
          </button>

          <p className="text-xs" style={{ color: t.textMuted }}>
            20% goes to charity. The rest? Pure, intentional waste.
          </p>
        </div>
      </div>

      <p className="absolute bottom-5 text-xs" style={{ color: t.textMuted, opacity: 0.6 }}>
        Built as a $20 challenge. You&apos;re welcome.
      </p>
    </div>
  );
}
