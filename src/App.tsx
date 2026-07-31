import { Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Games from "@/pages/Games";
import Portfolio from "@/pages/Portfolio";
import ProjectDetail from "@/pages/ProjectDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/games" element={<Games />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/portfolio/:id" element={<ProjectDetail />} />
      {/* Catch-all → landing */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
