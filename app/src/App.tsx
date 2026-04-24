import { Routes, Route } from 'react-router';
import { lazy, Suspense, useEffect } from 'react';
import GrainOverlay from './components/GrainOverlay';

const Home = lazy(() => import('./pages/Home'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));

function App() {
  useEffect(() => {
    // Smooth scroll polyfill for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <>
      <GrainOverlay />
      <Suspense fallback={
        <div className="w-full h-screen flex items-center justify-center bg-goldenrod">
          <div className="text-charcoal font-display text-2xl animate-pulse">جاري التحميل...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
