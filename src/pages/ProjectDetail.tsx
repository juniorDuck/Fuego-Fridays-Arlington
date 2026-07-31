import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Play, X, Maximize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const [playing, setPlaying] = useState(false);

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-6 py-4 sm:px-8">
          <Link
            to="/portfolio"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Portfolio
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12 sm:px-8">

        {/* Project header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Play button — only shown for browser games */}
          {project.embedUrl && (
            <button
              onClick={() => setPlaying(true)}
              className="mb-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
            >
              <Play className="size-4 fill-current" />
              Play in Browser
            </button>
          )}

          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {project.year}
          </p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{project.subtitle}</p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* External link */}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              {project.externalLabel ?? "View project"}
              <ExternalLink className="size-3.5 opacity-60" />
            </a>
          )}
        </motion.div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-border" />

        {/* Write-up */}
        <div className="flex flex-col gap-10">
          {project.writeup.map((section, i) => (
            <motion.section
              key={section.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            >
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed">{section.body}</p>
            </motion.section>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="mt-16 border-t border-border pt-8">
          <Link
            to="/portfolio"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to portfolio
          </Link>
        </div>
      </main>

      {/* Full-screen game overlay */}
      {playing && project.embedUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex flex-col bg-[#0e0d0c]"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-3">
            <div>
              <p className="text-sm font-semibold text-white">{project.title}</p>
              <p className="text-xs text-white/40">{project.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-white/40 transition-colors hover:text-white"
                >
                  <Maximize2 className="size-3.5" />
                  {project.externalLabel ?? "Open externally"}
                </a>
              )}
              <button
                onClick={() => setPlaying(false)}
                className="flex size-8 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Close game"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
          <div className="relative flex-1">
            <iframe
              src={project.embedUrl}
              title={project.title}
              allow="autoplay; fullscreen *; geolocation; microphone; camera; gamepad; gyroscope; accelerometer; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads"
              scrolling="no"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
