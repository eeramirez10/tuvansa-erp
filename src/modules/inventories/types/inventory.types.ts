export type InventoryListItem = {
  code: string;
  description: string;
  unitCode: string;
  unitDescription: string | null;
  family: string;
  inactiveAt: string | null;
  stockActual: number | null;
};

export type InventoryIdentity = {
  code: string;
  description: string;
  unitCode: string;
  unitDescription: string | null;
  family: string;
  type: number | null;
  colorAndSize: number | null;
  createdAt: string | null;
  inactiveAt: string | null;
};

export type InventoryPricing = {
  price1: number | null;
  price2: number | null;
  price3: number | null;
  price4: number | null;
  price5: number | null;
  price6: number | null;
  currency1: number | null;
  currency2: number | null;
  currency3: number | null;
  adValorem: number | null;
};

export type InventoryAccumulators = {
  lastPurchase: string | null;
  lastSale: string | null;
  assigned: number | null;
  confirmed: number | null;
  customerOrders: number | null;
  customerQuotes: number | null;
  supplierOrders: number | null;
  supplierQuotes: number | null;
  stockCurrent: number | null;
  stockPrevious: number | null;
  stockAccumulated: number | null;
  quantityPrevious: number | null;
  quantityAccumulated: number | null;
  stockPieces: number | null;
};

export type InventoryStorage = {
  minStock: number | null;
  maxStock: number | null;
  maxInitial: number | null;
  location: string;
  ean: string;
  upc: string;
};

export type InventoryAccounts = {
  primary: string;
  secondary: string;
  costSales: string;
  deviation: string;
};

export type InventoryIndicators = {
  sales6Months: number | null;
  inventoryDays: number | null;
  salesEol: number | null;
};

export type InventoryDetail = {
  identity: InventoryIdentity;
  pricing: InventoryPricing;
  accumulators: InventoryAccumulators;
  storage: InventoryStorage;
  accounts: InventoryAccounts;
  indicators: InventoryIndicators;
};

export type InventoriesListMeta = {
  limit: number;
  offset: number;
  count: number;
  total?: number;
  module?: string;
  source?: string;
  search?: string | null;
};

export type InventoriesListResponse = {
  data: InventoryListItem[];
  meta: InventoriesListMeta;
};

export type InventoryDetailResponse = {
  data: InventoryDetail;
  meta: {
    module?: string;
    source?: string;
  };
};

export type InventoriesQueryParams = {
  q?: string;
  limit?: number;
  offset?: number;
};
