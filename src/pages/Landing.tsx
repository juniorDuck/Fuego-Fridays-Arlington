import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Gamepad2, Briefcase } from "lucide-react";
import ThreeBackground from "@/components/ThreeBackground";

const NAME = "Justin Schultz";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-background text-foreground">
      {/* Three.js background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Center identity */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          {NAME}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Where would you like to go?
        </motion.h1>
      </div>

      {/* Left — Games */}
      <motion.button
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
        onClick={() => navigate("/games")}
        className="group relative z-10 flex w-1/2 flex-col items-center justify-center gap-6 border-r border-border/60 transition-colors hover:bg-foreground/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Go to games browser"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-shadow group-hover:shadow-md">
            <Gamepad2 className="size-7 text-foreground/70 transition-colors group-hover:text-foreground" />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold tracking-tight sm:text-2xl">Play My Games</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Browser games, no download
            </p>
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            Enter →
          </span>
        </div>
      </motion.button>

      {/* Right — Portfolio */}
      <motion.button
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
        onClick={() => navigate("/portfolio")}
        className="group relative z-10 flex w-1/2 flex-col items-center justify-center gap-6 transition-colors hover:bg-foreground/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Go to portfolio"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm transition-shadow group-hover:shadow-md">
            <Briefcase className="size-7 text-foreground/70 transition-colors group-hover:text-foreground" />
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold tracking-tight sm:text-2xl">View Portfolio</p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Projects, experience & work
            </p>
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            Enter →
          </span>
        </div>
      </motion.button>

      {/* Vertical divider label */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="h-16 w-px bg-border/80" />
      </div>
    </div>
  );
}
