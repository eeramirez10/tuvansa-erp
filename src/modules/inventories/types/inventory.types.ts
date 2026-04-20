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

export type InventoryDimensions = {
  volume: number | null;
  weight: number | null;
  genericBox: number | null;
  pack: number | null;
  length: number | null;
  height: number | null;
  width: number | null;
  densityKl: number | null;
  weightKmKpz: number | null;
  pointsPerInch: number | null;
  ediPack: string;
  ediQuantity: number | null;
  picking: number | null;
  box: number | null;
  pallet: number | null;
  volumeSecondary: number | null;
  boxSecondary: number | null;
  innerUom: string;
  outerUom: string;
  palletUom: string;
  locationSecondary: string;
  zone: string;
};

export type InventoryPurchases = {
  lastFiveCost: number | null;
  originCurrency: number | null;
  originCubicMeters: number | null;
  originBox: number | null;
  provider: string;
  providerPercent: number | null;
  code: string;
  type: number | null;
  unit: string;
  equivalentTo: number | null;
  price: number | null;
  endSeasonAt: string | null;
  minimumPurchase: number | null;
  seasonCurve: number | null;
  storeWeeksFactor: number | null;
  warehouseWeeksFactor: number | null;
  supplierLeadTimeDays: number | null;
  quantityInPrepack: number | null;
  exportRedi: boolean;
  onlyDistributesCd: boolean;
  statusOtb: boolean;
  inactive: boolean;
  climates: string;
  prepackCount: number | null;
  ediPack: string;
  ediQuantity: number | null;
  originPlace: string;
  equivalentUnit: string;
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
  dimensions: InventoryDimensions;
  purchases: InventoryPurchases;
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

export type InventoryWarehouse = {
  cd: number | null;
  warehouse: string;
  description: string;
  quantity: number | null;
  minimum: number | null;
  maximum: number | null;
  veol: number | null;
  minimumStore: number | null;
  sales6: number | null;
  order: number | null;
  assigned: number | null;
  physical: number | null;
  countInventory: number | null;
  allStores: number | null;
  status: string;
  transit: number | null;
  createdAt: string | null;
  lastSaleAt: string | null;
  providerOrder: number | null;
  location: string;
  accumulatedSales: number | null;
  s1: number | null;
  s2: number | null;
  s3: number | null;
  s4: number | null;
  s5: number | null;
  s6: number | null;
  price: number | null;
  totalReceipts: number | null;
  curve: number | null;
};

export type InventoryWarehousesResponse = {
  data: InventoryWarehouse[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
  };
};

export type InventoriesQueryParams = {
  q?: string;
  limit?: number;
  offset?: number;
};
