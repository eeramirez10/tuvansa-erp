import { LegacyActionItem } from "../../shared/components/legacy-actions/legacy-actions.types";

export const inventoryActionItems: LegacyActionItem[] = [
  { id: "almacenes", label: "Almacenes", section: "top" },
  { id: "altaCt", label: "Alta CT", section: "top" },
  { id: "bloquear", label: "Bloquear", section: "top" },
  { id: "clasificar", label: "Clasificar", section: "top" },
  { id: "descrExt", label: "Descr. ext.", section: "top" },
  { id: "descuentosClientes", label: "% Descuentos clis", section: "top" },
  { id: "descuentosProveedores", label: "% Descuentos prvs", section: "top" },
  { id: "otros", label: "Otros", section: "top" },
  { id: "especificaciones", label: "Especificaciones", section: "top" },
  { id: "invCt", label: "Inv. CT", section: "top" },
  { id: "skus", label: "SKUs", section: "top" },
  { id: "prepacks", label: "Prepacks", section: "top" },
  { id: "canales", label: "Canales", section: "top" },
  { id: "precios", label: "Precios", section: "top" },

  { id: "comprasProd", label: "Compras/Prod", section: "bottom", emphasize: true },
  { id: "alternos", label: "Alternos", section: "bottom" },
  { id: "componentes", label: "Componentes", section: "bottom" },
  { id: "especificCal", label: "Específic. Cal", section: "bottom" },
  { id: "implosion", label: "Implosión", section: "bottom" },
  { id: "lotes", label: "Lotes", section: "bottom" },
  { id: "uepsPeps", label: "UEPS / PEPS", section: "bottom" },
  { id: "caracteristicas", label: "Características", section: "bottom" },

]