import { LegacyActionItem } from "../../shared/components/legacy-actions/legacy-actions.types";

export const inventoryActionItems: LegacyActionItem[] = [
  { id: "almacenes", label: "Almacenes", section: "top" },
  { id: "altaCt", label: "Alta CT", section: "top", pendingBackend: true },
  { id: "bloquear", label: "Bloquear", section: "top", pendingBackend: true },
  { id: "clasificar", label: "Clasificar", section: "top" },
  { id: "descrExt", label: "Descr. ext.", section: "top" },
  { id: "descuentosClientes", label: "% Descuentos clis", section: "top", pendingBackend: true },
  { id: "descuentosProveedores", label: "% Descuentos prvs", section: "top", pendingBackend: true },
  { id: "otros", label: "Otros", section: "top" },
  { id: "especificaciones", label: "Especificaciones", section: "top", pendingBackend: true },
  { id: "invCt", label: "Inv. CT", section: "top", pendingBackend: true },
  { id: "skus", label: "SKUs", section: "top", pendingBackend: true },
  { id: "prepacks", label: "Prepacks", section: "top", pendingBackend: true },
  { id: "canales", label: "Canales", section: "top", pendingBackend: true },
  { id: "precios", label: "Precios", section: "top", pendingBackend: true },

  { id: "comprasProd", label: "Compras/Prod", section: "bottom", emphasize: true },
  { id: "alternos", label: "Alternos", section: "bottom", pendingBackend: true },
  { id: "componentes", label: "Componentes", section: "bottom", pendingBackend: true },
  { id: "especificCal", label: "Específic. Cal", section: "bottom", pendingBackend: true },
  { id: "implosion", label: "Implosión", section: "bottom", pendingBackend: true },
  { id: "lotes", label: "Lotes", section: "bottom" },
  { id: "uepsPeps", label: "UEPS / PEPS", section: "bottom" },
  { id: "caracteristicas", label: "Características", section: "bottom", pendingBackend: true },

]
