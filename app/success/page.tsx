"use client";

export default function Success() {
  return (
    <div
      className="dark-mode relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden"
      style={{ background: "#000", color: "#fff" }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <span style={{ fontSize: 64, display: "block", animation: "float 3s ease-in-out infinite" }}>
          💸
        </span>

        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
          style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.28)", color: "#4ade80" }}
        >
          Transaction complete
        </div>

        <h1 className="shimmer-dark text-5xl font-black tracking-tight">
          Congrats.
        </h1>

        <p className="text-xl" style={{ color: "rgba(255,255,255,0.45)" }}>
          You just wasted money on purpose.
        </p>

        <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          No product. No service. No regrets. That&apos;s literally the point — and honestly? Kind of legendary.
        </p>

        <a
          href="/"
          className="mt-4 text-sm font-medium underline underline-offset-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
        >
          Waste more
        </a>
      </div>
    </div>
  );
}
