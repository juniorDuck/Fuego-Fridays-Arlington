import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Github, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

// ── Replace with your real info ───────────────────────────────────────────────
const NAME = "Justin Schultz";
const TAGLINE = "Hobbyist Game Developer";
const BIO =
  "I build games and software. Below is a selection of projects — including shipped Godot games and other work. Click any project to read about how it was built.";
const GITHUB_URL = "https://github.com";
const LINKEDIN_URL = "https://linkedin.com";

export default function Portfolio() {
  const games = projects.filter((p) => p.type === "game");
  const other = projects.filter((p) => p.type !== "game");

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <nav className="flex items-center gap-3" aria-label="Social links">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <Github className="size-3.5" />
              GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              <Linkedin className="size-3.5" />
              LinkedIn
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 pb-24 sm:px-8">

        {/* Hero */}
        <section className="pb-8 pt-16 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{NAME}</h1>
            <p className="mt-2 text-base text-muted-foreground sm:text-lg">{TAGLINE}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed">{BIO}</p>
          </motion.div>
        </section>

        <div className="h-px w-full bg-border" />

        {/* Games — smaller, secondary treatment */}
        {games.length > 0 && (
          <section className="pt-12 pb-10" aria-labelledby="games-label">
            <SectionLabel id="games-label">Games</SectionLabel>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} compact />
              ))}
            </div>
          </section>
        )}

        <div className="h-px w-full bg-border" />

        {/* Other projects */}
        {other.length > 0 && (
          <section className="pt-12 pb-10" aria-labelledby="projects-label">
            <SectionLabel id="projects-label">Projects</SectionLabel>
            <div className="mt-4 flex flex-col gap-3">
              {other.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground sm:px-8">
          <span>{NAME}</span>
          <div className="flex items-center gap-4">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  compact = false,
}: {
  project: Project;
  index: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        to={`/portfolio/${project.id}`}
        className={`group flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent ${compact ? "" : "sm:p-5"}`}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={`font-semibold leading-tight ${compact ? "text-sm" : "text-base"}`}>
              {project.title}
            </h3>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>
          <p className={`mt-1 leading-relaxed text-muted-foreground ${compact ? "text-xs" : "text-sm"} line-clamp-2`}>
            {project.summary}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function SectionLabel({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </h2>
  );
}
