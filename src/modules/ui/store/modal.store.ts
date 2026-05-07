import { create } from "zustand";

export const MODAL_IDS = {
  INVENTORY_SEARCH: "inventorySearch",
  INVENTORY_WAREHOUSES: "inventoryWarehouses",
  INVENTORY_OTHERS: "inventoryOthers",
  INVENTORY_CLASIFICAR: "inventoryClasificar",
  INVENTORY_DESCR_EXT: "inventoryDescrExt",
  INVENTORY_LOTES: "inventoryLotes",
  INVENTORY_UEPS_PEPS: "inventoryUepsPeps",
  INVENTORY_AUXILIAR: "inventoryAuxiliar",
  INVENTORY_PEDIDOS_CLIENTE: "inventoryPedidosCliente",
  INVENTORY_COTIZACIONES_CLIENTE: "inventoryCotizacionesCliente",
  INVENTORY_VENTAS_CLIENTE: "inventoryVentasCliente",
  INVENTORY_VENTAS_SUCURSAL: "inventoryVentasSucursal",
  INVENTORY_VENTAS_ANUALES: "inventoryVentasAnuales",
  INVENTORY_VENTAS_ANUALES_RESUMEN: "inventoryVentasAnualesResumen",
  INVENTORY_ORDENADO_PROVEEDORES: "inventoryOrdenadoProveedores",
  INVENTORY_COMPRAS_PROVEEDOR: "inventoryComprasProveedor",
  INVENTORY_COMPRAS_DESGLOSADAS: "inventoryComprasDesglosadas",
  INVENTORY_COMPRAS_ANUALES: "inventoryComprasAnuales",
  INVENTORY_COMPRAS_ANUALES_RESUMEN: "inventoryComprasAnualesResumen",
  INVENTORY_VENTAS_DESGLOSADAS: "inventoryVentasDesglosadas",
  INVENTORY_PEDIDOS_ASTERISCO: "inventoryPedidosAsterisco",
  INVENTORY_PEDIDOS_CT: "inventoryPedidosCt",
  INVENTORY_ALTA_CT: "inventoryAltaCt",
  INVENTORY_BLOQUEAR: "inventoryBloquear",
  INVENTORY_CANALES: "inventoryCanales",
  INVENTORY_DESCUENTOS_CLIENTES: "inventoryDescuentosClientes",
  INVENTORY_DESCUENTOS_PROVEEDORES: "inventoryDescuentosProveedores",
  INVENTORY_ESPECIFICACIONES: "inventoryEspecificaciones",
  INVENTORY_INV_CT: "inventoryInvCt",
  INVENTORY_PRECIOS: "inventoryPrecios",
  INVENTORY_PREPACKS: "inventoryPrepacks",
  INVENTORY_SKUS: "inventorySkus",
} as const;

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];

type ModalOpenById = Partial<Record<ModalId, boolean>>;

type ModalStore = {
  openById: ModalOpenById;
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
  closeAllModals: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  openById: {},
  openModal: (id) => {
    set((state) => ({
      openById: {
        ...state.openById,
        [id]: true,
      },
    }));
  },
  closeModal: (id) => {
    set((state) => ({
      openById: {
        ...state.openById,
        [id]: false,
      },
    }));
  },
  closeAllModals: () => {
    set({ openById: {} });
  },
}));
