import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { useAnalyticsTracking } from "./hooks/useAnalyticsTracking";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Dashboard = lazy(() => import("./pages/Dashboard"));

const AnalyticsTracker = () => {
  useAnalyticsTracking();
  return null;
};

const App = () => (
  <ThemeProvider>
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume" element={<Index />} />
        <Route
          path="/dash"
          element={
            <Suspense fallback={null}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
