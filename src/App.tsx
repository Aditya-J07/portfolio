import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import XPBar from './components/XPBar';
import ParallaxDecorations from './components/ParallaxDecorations';
import SmoothScroll from './components/SmoothScroll';
import CursorBuddy from './components/CursorBuddy';
import GlowDotBackground from './components/GlowDotBackground';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import SnakeGame from './pages/SnakeGame';
import Pics from './pages/Pics';
import { ThemeProvider } from './context/ThemeContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/pics" element={<Pics />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/snake" element={<SnakeGame />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className="relative min-h-screen bg-bg text-ink transition-colors duration-200">
      {/* Interactive Glowing Dot Grid Background */}
      <GlowDotBackground />

      {/* Top XP Bar HUD */}
      <XPBar />

      {/* Parallax Decorative Objects at 3 Depths */}
      <ParallaxDecorations />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-12">
        <AnimatedRoutes />
      </main>

      {/* CursorBuddy Interactive Companion Mascot */}
      <CursorBuddy />

      {/* Ground Strip Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </ThemeProvider>
    </BrowserRouter>
  );
}
