import { Routes, Route } from "react-router-dom";
import JournalPage from "@/pages/JournalPage";
import StatsPage from "@/pages/StatsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<JournalPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
}
