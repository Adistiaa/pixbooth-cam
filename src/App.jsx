import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DonatePage from "./pages/DonatePage";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import FeaturePage from "./pages/FeaturePage";
import CameraPage from "./pages/CameraPage";
import NotFoundPage from "./pages/NotFoundPage";
import Background from "./components/Background";

function App() {
  return (
    <Router>
      <Navbar />
      <Background />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feature" element={<FeaturePage />} />
        <Route path="/cam" element={<CameraPage />} />
        <Route path="/contact" element={<DonatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
