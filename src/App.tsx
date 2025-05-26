import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import EmployeeDetailPage from "./pages/employee/[id]";
import BookmarksPage from "./pages/bookmarks";
import AnalyticsPage from "./pages/analytics";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetailPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
