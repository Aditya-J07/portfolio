import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import SnakeGame from './pages/SnakeGame';
import Pics from './pages/Pics';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
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
    const { backgroundEffect } = useTheme();

    return (
        <div className="min-h-screen bg-base text-text transition-colors duration-300">
            {/* Vignette Effect */}
            {backgroundEffect && <div className="vignette" />}

            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="pt-16">
                <AnimatedRoutes />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AppContent />
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
