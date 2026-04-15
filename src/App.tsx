import { Navigate, Route, Routes } from "react-router-dom";
import AccountingPage from "./pages/AccountingPage";
import BanksPage from "./pages/BanksPage";
import LegacyAppLayout from "./layouts/LegacyAppLayout";
import ClientsPage from "./pages/ClientsPage";
import HomePage from "./pages/HomePage";
import InventoriesPage from "./pages/InventoriesPage";
import OrdersPage from "./pages/OrdersPage";
import PurchaseOrdersPage from "./pages/PurchaseOrdersPage";
import ReceiptsPage from "./pages/ReceiptsPage";
import SalesPage from "./pages/SalesPage";
import SuppliersPage from "./pages/SuppliersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/inventarios-pt" element={<InventoriesPage />} />
      <Route element={<LegacyAppLayout />}>
        <Route path="/contabilidad" element={<AccountingPage />} />
        <Route path="/bancos" element={<BanksPage />} />
        <Route path="/clientes" element={<ClientsPage />} />
        <Route path="/pedidos" element={<OrdersPage />} />
        <Route path="/ordenes-compra" element={<PurchaseOrdersPage />} />
        <Route path="/proveedores" element={<SuppliersPage />} />
        <Route path="/recepciones" element={<ReceiptsPage />} />
        <Route path="/ventas" element={<SalesPage />} />
        <Route path="/sales" element={<Navigate to="/ventas" replace />} />
        <Route path="/inventarios" element={<InventoriesPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
