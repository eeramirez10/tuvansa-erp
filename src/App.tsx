import { Navigate, Route, Routes } from "react-router-dom";
import LegacyAppLayout from "./layouts/LegacyAppLayout";
import HomePage from "./pages/HomePage";
import InventoriesPage from "./pages/InventoriesPage";
import SalesPage from "./pages/SalesPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/inventarios-pt" element={<InventoriesPage />} />
      <Route element={<LegacyAppLayout />}>
        <Route path="/ventas" element={<SalesPage />} />
        <Route path="/sales" element={<Navigate to="/ventas" replace />} />
        <Route path="/inventarios" element={<InventoriesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
