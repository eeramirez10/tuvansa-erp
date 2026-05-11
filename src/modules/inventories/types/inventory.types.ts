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
  extendedDescription: string;
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

export type InventoryClassification = {
  supplier: string;
  product: string;
  type: string;
  material: string;
  ends: string;
  pressureClass: string;
  cedula: string;
  measure: string;
  others: string;
  origin: string;
  sativ: string;
  coating: string;
  branch: string;
  brand: string;
  inv: string;
  family: string;
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

export type InventoryImports = {
  dontHandleLayers: boolean;
  pedimento: string;
  importDate: string | null;
  customsOffice: string;
  tariff: string;
  tariffOption: string;
  tariffPercent: number | null;
  tariffAmount: number | null;
};

export type InventoryProduction = {
  variableTime: boolean;
  lot: number | null;
  timeDays: number | null;
  capacity: number | null;
  assemblyAt: string | null;
  assemblyMode: number | null;
  secondCode: string;
  thirdCode: string;
  reduceMinimumsWithOrders: boolean;
  unproductiveTimeSams: boolean;
};

export type InventoryTaxes = {
  salesProfile: string;
  purchasesProfile: string;
  iepsPercent: number | null;
  retentionIvaPercent: number | null;
  retentionIsrPercent: number | null;
  ivaType: "general" | "exempt" | "zero" | "unknown";
  retentionType: "none" | "freight" | "rent" | "fee" | "unknown";
  dontChargeIvaOnIeps: boolean;
  donative: boolean;
};

export type InventoryOthers = {
  options: {
    composition: string;
    virtualStore: boolean;
    inactiveForPurchases: boolean;
    controlByPieces: boolean;
    fractionable: boolean;
    lastChangedBy: number | null;
    warehouse: number | null;
    nextReceptionAt: string | null;
    transit: number | null;
    physicalInitial: number | null;
    lastChangedAt: string | null;
    list123ChangedAt: string | null;
    unsupplied: number | null;
    firstPosSaleAt: string | null;
    countInventory: number | null;
    row: string;
    rootCode: string;
    color: string;
  };
  prices: {
    commissionPercent: number | null;
    iepsPercent: number | null;
    fixedIepsPercent: number | null;
    offerFrom: string | null;
    offerTo: string | null;
    minUntil: string | null;
    walletPercent: number | null;
    lists: Array<{
      list: number;
      price: number | null;
      currency: number | null;
      percent: number | null;
    }>;
  };
  exportData: {
    tariff: string;
    factor: number | null;
  };
  ccp: {
    materialDangerousType: number | null;
    hazardousKey: string;
    packagingKey: string;
  };
  vars: {
    values: Array<number | null>;
  };
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
  classification: InventoryClassification;
  accumulators: InventoryAccumulators;
  storage: InventoryStorage;
  dimensions: InventoryDimensions;
  purchases: InventoryPurchases;
  imports: InventoryImports;
  production: InventoryProduction;
  taxes: InventoryTaxes;
  others: InventoryOthers;
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

export type InventoryAuxiliarRow = {
  date: string | null;
  document: string;
  tm: string;
  cost: number | null;
  entries: number | null;
  exits: number | null;
  stock: number | null;
  warehouse: string;
  pieces: number | null;
  route: string;
  user: number | null;
  revaluation: number | null;
  reference: string;
};

export type InventoryAuxiliarResponse = {
  data: InventoryAuxiliarRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    stockPrevious?: number;
  };
};

export type InventoryLoteMovementRow = {
  sequence: number | null;
  date: string | null;
  document: string;
  entries: number | null;
  exits: number | null;
  warehouse: string;
};

export type InventoryLoteRow = {
  sequence: number | null;
  date: string | null;
  expirationAt: string | null;
  pedimento: string;
  customsOffice: string;
  lot: string;
  available: number | null;
  warehouse: string;
  location: string;
  cost: number | null;
  adValorem: number | null;
  movements: InventoryLoteMovementRow[];
};

export type InventoryLotesResponse = {
  data: InventoryLoteRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
  };
};

export type InventoryUepsPepsRow = {
  initial: number | null;
  quantity: number | null;
  cost: number | null;
  adValorem: number | null;
  date: string | null;
  document: string;
  lot: string;
  expirationAt: string | null;
  key: string;
  keySuffix: string;
  warehouse: string;
  provider: string;
  exchangeRate: number | null;
  costDollars: number | null;
  adValoremDollars: number | null;
  total: number | null;
};

export type InventoryUepsPepsResponse = {
  data: InventoryUepsPepsRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
  };
};

export type InventoryClientOrderRow = {
  code: string;
  description: string;
  expectedDate: string | null;
  expiresAt: string | null;
  number: string;
  ordered: number | null;
  supplied: number | null;
  remaining: number | null;
  assigned: number | null;
  price: number | null;
  externalNumber: string;
  pieces: number | null;
  warehouse: string;
  wms: number | null;
};

export type InventoryClientOrdersResponse = {
  data: InventoryClientOrderRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
  };
};

export type InventoryClientSaleRow = {
  code: string;
  client: string;
  quantity: number | null;
  amount: number | null;
};

export type InventoryClientSalesResponse = {
  data: InventoryClientSaleRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    totalQuantity?: number;
    totalAmount?: number;
  };
};

export type InventorySalesBreakdownRow = {
  code: string;
  name: string;
  quantity: number | null;
  price: number | null;
  document: string;
  date: string | null;
  unitPrice: number | null;
  dollarExchangeRate: number | null;
  discountPercent: number | null;
  purchaseOrder: string;
  branch: string;
  pieces: number | null;
};

export type InventorySalesBreakdownResponse = {
  data: InventorySalesBreakdownRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    totalQuantity?: number;
    totalPrice?: number;
    destination?: number | null;
    multiCompany?: number | null;
  };
};

export type InventoryBranchSaleRow = {
  branch: string;
  code: string;
  client: string;
  quantity: number | null;
  amount: number | null;
};

export type InventoryBranchSalesResponse = {
  data: InventoryBranchSaleRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    totalQuantity?: number;
    totalAmount?: number;
  };
};

export type InventoryAnnualSaleRow = {
  code: string;
  client: string;
  year: number | null;
  ene: number | null;
  feb: number | null;
  mar: number | null;
  abr: number | null;
  may: number | null;
  jun: number | null;
  jul: number | null;
  ago: number | null;
  sep: number | null;
  oct: number | null;
  nov: number | null;
  dic: number | null;
  total: number | null;
};

export type InventoryAnnualSalesResponse = {
  data: InventoryAnnualSaleRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    totals?: {
      ene?: number | null;
      feb?: number | null;
      mar?: number | null;
      abr?: number | null;
      may?: number | null;
      jun?: number | null;
      jul?: number | null;
      ago?: number | null;
      sep?: number | null;
      oct?: number | null;
      nov?: number | null;
      dic?: number | null;
      total?: number | null;
    };
  };
};

export type InventoryPurchaseBySupplierRow = {
  code: string;
  supplier: string;
  quantity: number | null;
  amount: number | null;
};

export type InventoryPurchasesBySupplierResponse = {
  data: InventoryPurchaseBySupplierRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    totalQuantity?: number;
    totalAmount?: number;
  };
};

export type InventoryPurchaseBreakdownRow = {
  code: string;
  supplier: string;
  quantity: number | null;
  price: number | null;
  document: string;
  date: string | null;
  pieces: number | null;
  dollarExchangeRate: number | null;
  amountDollars: number | null;
};

export type InventoryPurchasesBreakdownResponse = {
  data: InventoryPurchaseBreakdownRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    destination?: number | null;
    multiCompany?: number | null;
  };
};

export type InventoryOrderedSupplierRow = {
  code: string;
  description: string;
  oc: string;
  branch: string;
  um: string;
  ordered: number | null;
  supplied: number | null;
  remaining: number | null;
  price: number | null;
  providerOc: string;
  expectedDate: string | null;
  date: string | null;
  warehouse: string;
  observations: string;
  confirmed: number | null;
  expiresAt: string | null;
  createdAt: string | null;
  confirmedAt: string | null;
};

export type InventoryOrderedSuppliersResponse = {
  data: InventoryOrderedSupplierRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    stock?: number | null;
    pending?: number | null;
    total?: number | null;
  };
};

export type InventoryQuotedSupplierRow = {
  code: string;
  description: string;
  oc: string;
  um: string;
  ordered: number | null;
  supplied: number | null;
  remaining: number | null;
  date: string | null;
  expectedDate: string | null;
  observations: string;
  date2: string | null;
};

export type InventoryQuotedSuppliersResponse = {
  data: InventoryQuotedSupplierRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    stock?: number | null;
    pending?: number | null;
    total?: number | null;
    pendingOnly?: boolean;
  };
};

export type InventoryDocumentSearchRow = {
  dseq: number | null;
  document: string;
  date: string | null;
  ref: string;
  ref2: string;
  warehouse: string;
  provider: string;
  client: string;
  tm: string;
};

export type InventoryDocumentSearchResponse = {
  data: InventoryDocumentSearchRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
  };
};

export type InventoryDocumentDetailHeader = {
  document: string;
  reference: string;
  clientCode: string;
  clientName: string;
  date: string | null;
  warehouse: string;
  tipmv: string;
  desfact: string;
  desinv: string;
  dalmacen: string;
  diuseq: string;
};

export type InventoryDocumentDetailLine = {
  product: string;
  description: string;
  entries: number | null;
  exits: number | null;
  unit: string;
  cost: number | null;
  pieces: number | null;
  warehouse: string;
  user: number | null;
  tm: string;
};

export type InventoryDocumentDetailResponse = {
  data: {
    header: InventoryDocumentDetailHeader | null;
    lines: InventoryDocumentDetailLine[];
  };
  meta: {
    module?: string;
    source?: string;
    code?: string;
    dseq?: number;
    count?: number;
  };
};

export type InventoryAnnualPurchaseRow = {
  code: string;
  supplier: string;
  year: number | null;
  ene: number | null;
  feb: number | null;
  mar: number | null;
  abr: number | null;
  may: number | null;
  jun: number | null;
  jul: number | null;
  ago: number | null;
  sep: number | null;
  oct: number | null;
  nov: number | null;
  dic: number | null;
  total: number | null;
};

export type InventoryAnnualPurchasesResponse = {
  data: InventoryAnnualPurchaseRow[];
  meta: {
    module?: string;
    source?: string;
    code?: string;
    count?: number;
    totals?: {
      ene?: number | null;
      feb?: number | null;
      mar?: number | null;
      abr?: number | null;
      may?: number | null;
      jun?: number | null;
      jul?: number | null;
      ago?: number | null;
      sep?: number | null;
      oct?: number | null;
      nov?: number | null;
      dic?: number | null;
      total?: number | null;
    };
  };
};

export type InventoryClassificationSelectedSlot = {
  code: string;
  description: string;
};

export type InventoryClassificationSelected = {
  supplier: InventoryClassificationSelectedSlot;
  product: InventoryClassificationSelectedSlot;
  type: InventoryClassificationSelectedSlot;
  material: InventoryClassificationSelectedSlot;
  ends: InventoryClassificationSelectedSlot;
  pressureClass: InventoryClassificationSelectedSlot;
  cedula: InventoryClassificationSelectedSlot;
  measure: InventoryClassificationSelectedSlot;
  others: InventoryClassificationSelectedSlot;
  origin: InventoryClassificationSelectedSlot;
  sativ: InventoryClassificationSelectedSlot;
  coating: InventoryClassificationSelectedSlot;
  branch: InventoryClassificationSelectedSlot;
  brand: InventoryClassificationSelectedSlot;
  inv: InventoryClassificationSelectedSlot;
  family: InventoryClassificationSelectedSlot;
};

export type InventoryClassificationOption = {
  slot: string;
  family: string;
  description: string;
  parent: string;
  order: number;
};

export type InventoryClassificationResponse = {
  data: {
    selected: InventoryClassificationSelected | null;
    options: InventoryClassificationOption[];
  };
  meta: {
    module?: string;
    source?: string;
    code?: string;
  };
};

export type InventoriesQueryParams = {
  q?: string;
  searchBy?: "auto" | "code" | "description";
  limit?: number;
  offset?: number;
};
