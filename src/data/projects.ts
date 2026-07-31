export type ProjectType = "game" | "app" | "tool" | "other";

export interface WriteupSection {
  heading: string;
  body: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  /** Short blurb used on list/card views */
  summary: string;
  type: ProjectType;
  tags: string[];
  year: string;
  /** If set, a "Play in Browser" button appears at the top of the write-up */
  embedUrl?: string;
  /** itch.io page or external link */
  externalUrl?: string;
  externalLabel?: string;
  /** Optional thumbnail path (relative to /public) */
  thumbnail?: string;
  /** Write-up sections rendered on the detail page */
  writeup: WriteupSection[];
}

export const projects: Project[] = [
  // ── Games ────────────────────────────────────────────────────────────────
  {
    id: "gmtk-2026",
    title: "Radio Silence",
    subtitle: "GMTK Game Jam 2026",
    summary:
      "A game jam submission for GMTK 2026. Built in Godot 4 and playable directly in the browser.",
    type: "game",
    tags: ["Godot 4", "Game Jam", "GMTK"],
    year: "2026",
    embedUrl: "https://itch.io/embed-upload/18537387?color=502d5f",
    externalUrl: "https://itch.io",
    externalLabel: "View on itch.io",
    writeup: [
      {
        heading: "Overview",
        body: "An extremely difficult platforming game.",
      },
      {
        heading: "Design goals",
        body: "It's important that difficulty emerges from predictable gameplay. A loss should always be the fault of the player, never some probability or unpredictable behavior.",
      },
      {
        heading: "Technical highlights",
        body: "",
      },
      {
        heading: "What I learned",
        body: "",
      },
    ],
  },
  {
    id: "gmtk-2024",
    title: "Cheese Winner",
    subtitle: "GMTK Game Jam 2024",
    summary:
      "A game jam submission for GMTK 2024. Built solo under the jam's time constraint in Godot 4.",
    type: "game",
    tags: ["Godot 4", "Game Jam", "GMTK"],
    year: "2024",
    embedUrl: "https://itch.io/embed-upload/11253226?color=11265d",
    externalUrl: "https://itch.io",
    externalLabel: "View on itch.io",
    writeup: [
      {
        heading: "Overview",
        body: "",
      },
      {
        heading: "The core mechanic",
        body: "",
      },
      {
        heading: "Technical highlights",
        body: "",
      },
      {
        heading: "What I learned",
        body: "",
      },
    ],
  },

  // ── Non-game projects ─────────────────────────────────────────────────────
  {
    id: "project-placeholder",
    title: "Project Title",
    subtitle: "Tool · TypeScript",
    summary:
      "A placeholder for a non-game project. Replace with a real tool, app, or other work.",
    type: "tool",
    tags: ["TypeScript", "React", "Open Source"],
    year: "2024",
    externalUrl: "https://github.com",
    externalLabel: "View on GitHub",
    writeup: [
      {
        heading: "Overview",
        body: "What does this project do? Who is it for? What problem does it solve?",
      },
      {
        heading: "Why I built it",
        body: "What motivated you? Was it scratching your own itch, a learning exercise, or solving a real problem?",
      },
      {
        heading: "Technical approach",
        body: "Stack, architecture decisions, anything non-obvious. This is where you show how you think as an engineer.",
      },
      {
        heading: "What I learned",
        body: "Outcome and takeaways. Did it get used? What would you change?",
      },
    ],
  },
];

/** Just the game projects, for the games browser */
export const gameProjects = projects.filter((p) => p.type === "game");
