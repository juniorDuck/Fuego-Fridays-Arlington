export interface Game {
  id: string;
  title: string;
  description: string;
  tags: string[];
  /** itch.io embed iframe src — replace with your actual game URLs */
  embedUrl: string;
  /** itch.io game page for the "View on itch.io" link */
  itchUrl: string;
  /** Optional thumbnail shown before the iframe loads */
  thumbnail?: string;
}

export const games: Game[] = [
  {
    id: "game-1",
    title: "Game Title One",
    description:
      "A short description of what this game is about — genre, core mechanic, and what makes it interesting. Replace with your real copy.",
    tags: ["Platformer", "2D", "Godot 4"],
    embedUrl: "https://itch.io/embed-upload/PLACEHOLDER_1?color=1b1a18",
    itchUrl: "https://itch.io/games/tag-godot",
  },
  {
    id: "game-2",
    title: "Game Title Two",
    description:
      "Another game description here. Keep it to two or three sentences — just enough for a recruiter or player to get the vibe.",
    tags: ["Puzzle", "Top-Down", "Godot 4"],
    embedUrl: "https://itch.io/embed-upload/PLACEHOLDER_2?color=1b1a18",
    itchUrl: "https://itch.io/games/tag-godot",
  },
  {
    id: "game-3",
    title: "Game Title Three",
    description:
      "Describe the theme, setting, or design challenge you were solving. This is your chance to show thinking behind the build.",
    tags: ["Action", "Arcade", "Godot 3"],
    embedUrl: "https://itch.io/embed-upload/PLACEHOLDER_3?color=1b1a18",
    itchUrl: "https://itch.io/games/tag-godot",
  },
];
