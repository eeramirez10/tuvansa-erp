import { BlueTitle } from "../modules/inventories/components/ui/BlueTile";
import { DimensionsTabContent } from "../modules/inventories/components/tabs/DimensionsTabContent";
import { GeneralTabContent } from "../modules/inventories/components/tabs/GeneralTabContent";
import { ImportTabContent } from "../modules/inventories/components/tabs/ImportTabContent";
import { ProductionTabContent } from "../modules/inventories/components/tabs/ProductionTabContent";
import { PurchasesTabContent } from "../modules/inventories/components/tabs/PurchasesTabContent";
import { TaxesTabContent } from "../modules/inventories/components/tabs/TaxesTabContent";
import { InventoryActionsPanel } from "../modules/inventories/components/InventoryActionsPanel";
import { InventoryConsultasPanel } from "../modules/inventories/components/InventoryConsultasPanel";
import { InventoryIdentityPanel } from "../modules/inventories/components/InventoryIdentityPanel";
import { InventoryTabsNav } from "../modules/inventories/components/InventoryTabsNav";
import { useInventoriesPage } from "../modules/inventories/hooks/useInventoryPage";

function InventoriesPage() {

  const {
    setActiveTab,
    activeTab,
    identity,
    pricing,
    accumulators,
    storage,
    dimensions,
    purchases,
    imports,
    production,
    taxes,
    accounts,
    indicators,
  } = useInventoriesPage()


  return (
    <main className="min-h-screen bg-[#979797] p-[4px] text-[11px] text-[#23303d] [font-family:Tahoma,'Segoe_UI',sans-serif]">
      <div className="overflow-x-auto">
        <section className="min-h-[700px] w-[calc(100vw-16px)] min-w-[1180px] border border-[#2f8ce8] bg-[#f2f2f2] shadow-[inset_0_0_0_1px_#c6dcf6]">
          <div className="grid grid-cols-[1fr_216px] gap-[6px] p-[4px]">
            <section className="border border-[#b4bcc5] bg-white">
              <BlueTitle>Catálogo de productos</BlueTitle>

              <div className="grid grid-cols-[136px_1fr]">
                <InventoryActionsPanel />

                <section className="p-[5px]">

                  <InventoryIdentityPanel identity={identity} />

                  <InventoryTabsNav onChangeTab={setActiveTab} activeTab={activeTab} />

                  {activeTab === "general" && (
                    <GeneralTabContent
                      identity={identity}
                      pricing={pricing}
                      accumulators={accumulators}
                      storage={storage}
                      accounts={accounts}
                      indicators={indicators}

                    />
                  )}

                  {activeTab === "dimensions" && (
                    <DimensionsTabContent location={storage?.location ?? ""} dimensions={dimensions} />
                  )}

                  {activeTab === "purchases" && (
                    <PurchasesTabContent purchases={purchases} />
                  )}

                  {activeTab === "imports" && <ImportTabContent imports={imports} />}

                  {activeTab === "production" && <ProductionTabContent production={production} />}

                  {activeTab === "taxes" && <TaxesTabContent taxes={taxes} />}
                </section>
              </div>
            </section>

            <InventoryConsultasPanel />

          </div>
        </section>
      </div>
    </main>
  );
}

export default InventoriesPage;

