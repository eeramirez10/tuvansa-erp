import InventorySearchModal from "../../inventories/components/InventorySearchModal";
import InventoryWarehousesModal from "../../inventories/components/InventoryWarehousesModal";
import InventoryOthersModal from "../../inventories/components/InventoryOthersModal";
import InventoryAuxiliarModal from "../../inventories/components/InventoryAuxiliarModal";
import InventoryPedidosClienteModal from "../../inventories/components/InventoryPedidosClienteModal";
import InventoryCotizacionesClienteModal from "../../inventories/components/InventoryCotizacionesClienteModal";
import InventoryVentasClienteModal from "../../inventories/components/InventoryVentasClienteModal";
import InventoryPedidosAsteriscoModal from "../../inventories/components/InventoryPedidosAsteriscoModal";
import InventoryPedidosCtModal from "../../inventories/components/InventoryPedidosCtModal";

function AppModalHost() {
  return (
    <>
      <InventorySearchModal />
      <InventoryWarehousesModal />
      <InventoryOthersModal />
      <InventoryAuxiliarModal />
      <InventoryPedidosClienteModal />
      <InventoryCotizacionesClienteModal />
      <InventoryVentasClienteModal />
      <InventoryPedidosAsteriscoModal />
      <InventoryPedidosCtModal />
    </>
  );
}

export default AppModalHost;
