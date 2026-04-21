import InventorySearchModal from "../../inventories/components/InventorySearchModal";
import InventoryWarehousesModal from "../../inventories/components/InventoryWarehousesModal";
import InventoryOthersModal from "../../inventories/components/InventoryOthersModal";

function AppModalHost() {
  return (
    <>
      <InventorySearchModal />
      <InventoryWarehousesModal />
      <InventoryOthersModal />
    </>
  );
}

export default AppModalHost;
