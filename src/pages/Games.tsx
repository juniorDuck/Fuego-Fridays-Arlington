import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Play, X, Maximize2 } from "lucide-react";
import { gameProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function Games() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="min-h-dvh bg-[#0e0d0c] text-white">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0e0d0c]/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <span className="text-sm font-semibold tracking-tight text-white/80">
            Games
          </span>
          <span className="text-xs text-white/30">{gameProjects.length} titles</span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12 sm:px-8">
        {/* Hero line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Play in the browser
          </h1>
          <p className="mt-3 text-base text-white/50">
            All games run via Godot Web Export — no download, no install.
          </p>
        </motion.div>

        {/* Game grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gameProjects.map((game, i) => (
            <GameTile
              key={game.id}
              game={game}
              index={i}
              onPlay={() => setActive(game)}
            />
          ))}
        </div>
      </main>

      {/* Play modal */}
      {active && (
        <PlayModal game={active} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

// ── Game tile ─────────────────────────────────────────────────────────────────

function GameTile({
  game,
  index,
  onPlay,
}: {
  game: Project;
  index: number;
  onPlay: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/[0.08]"
    >
      {/* Thumbnail / play area */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-white/[0.03]">
        {game.thumbnail ? (
          <img
            src={game.thumbnail}
            alt={game.title}
            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-80"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)",
            }}
          />
        )}
        {game.embedUrl ? (
          <button
            onClick={onPlay}
            className="relative z-10 flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
            aria-label={`Play ${game.title}`}
          >
            <Play className="size-6 fill-white text-white" />
          </button>
        ) : (
          <p className="relative z-10 text-xs text-white/30">Embed coming soon</p>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {game.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] font-medium text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">{game.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-white/50">{game.summary}</p>
        </div>
        {game.externalUrl && (
          <a
            href={game.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-white/40 transition-colors hover:text-white"
          >
            {game.externalLabel ?? "View on itch.io"}
            <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

// ── Play modal ────────────────────────────────────────────────────────────────

function PlayModal({ game, onClose }: { game: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-[#0e0d0c]"
    >
      {/* Modal nav */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-3">
        <div>
          <p className="text-sm font-semibold text-white">{game.title}</p>
          <p className="text-xs text-white/40">{game.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          {game.externalUrl && (
            <a
              href={game.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white"
            >
              <Maximize2 className="size-3.5" />
              Open on itch.io
            </a>
          )}
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Iframe */}
      <div className="relative flex-1">
        <iframe
          src={game.embedUrl}
          title={game.title}
          allow="autoplay; fullscreen *; geolocation; microphone; camera; gamepad; gyroscope; accelerometer; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads"
          scrolling="no"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </motion.div>
  );
}
