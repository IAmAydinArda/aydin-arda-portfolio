import React, { useEffect, Suspense } from "react";
import {
  Routes, //replaces "Switch" used till v5
  Route,
  useLocation,
} from "react-router-dom";
import ReactGA from 'react-ga4';
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Now from "./pages/Now";
// import Writing from "./pages/Writing";
// import Reading from "./pages/Reading";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { DarkModeProvider } from "./contexts/DarkModeContext"

// Lazy load project pages for better performance
const YoutubeAnalyzer = React.lazy(() => import("./pages/projects/YoutubeAnalyzer"));
const InProgress = React.lazy(() => import("./pages/InProgress"));
const TRACKING_ID = "G-6TTQDD2S94"; // Google Analytics ID

export default function App() {
  const location = useLocation();
  
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, [])
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname])
  
  return (
    <ErrorBoundary>
      <DarkModeProvider>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <Header />
          <ErrorBoundary>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/now" element={<Now />} />
                <Route path="/projects" element={<Projects />} />
                {/* <Route path="/writing" element={<Writing />} /> */}
                {/* <Route path="/reading" element={<Reading />} /> */}
                <Route path="/projects/youtubeanalyzer" element={<YoutubeAnalyzer />} />
                <Route path="/projects/in-progress" element={<InProgress />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </DarkModeProvider>
    </ErrorBoundary>
  );
}
