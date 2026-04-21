import InventorySearchModal from "../../inventories/components/InventorySearchModal";
import InventoryWarehousesModal from "../../inventories/components/InventoryWarehousesModal";
import InventoryOthersModal from "../../inventories/components/InventoryOthersModal";
import InventoryAuxiliarModal from "../../inventories/components/InventoryAuxiliarModal";
import InventoryPedidosClienteModal from "../../inventories/components/InventoryPedidosClienteModal";
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
      <InventoryPedidosAsteriscoModal />
      <InventoryPedidosCtModal />
    </>
  );
}

export default AppModalHost;
