import type {
  InventoryAnnualPurchasesResponse,
  InventoryAnnualSalesResponse,
  InventoryAuxiliarResponse,
  InventoryBranchSalesResponse,
  InventoryClassificationResponse,
  InventoryClientOrdersResponse,
  InventoryClientSalesResponse,
  InventoryDetailResponse,
  InventoryLotesResponse,
  InventoryUepsPepsResponse,
  InventoryOrderedSuppliersResponse,
  InventoryPurchasesBreakdownResponse,
  InventoryPurchasesBySupplierResponse,
  InventorySalesBreakdownResponse,
  InventoryWarehousesResponse,
  InventoriesListResponse,
  InventoriesQueryParams,
} from "../types/inventory.types";

const DEFAULT_API_BASE_URL = "http://localhost:3000";

const sanitizeBaseUrl = (baseUrl: string): string =>
  baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;

const API_BASE_URL = sanitizeBaseUrl(
  import.meta.env.VITE_ERP_API_BASE_URL ?? DEFAULT_API_BASE_URL,
);

const INVENTORIES_ENDPOINT = `${API_BASE_URL}/api/inventories`;

type ApiError = {
  error?: {
    message?: string;
  };
};

type RequestOptions = {
  signal?: AbortSignal;
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
};

const DEFAULT_FETCH_TIMEOUT_MS = 15000;
const DEFAULT_FETCH_RETRIES = 1;
const DEFAULT_FETCH_RETRY_DELAY_MS = 250;

const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === "AbortError";

const withTimeoutSignal = (
  signal: AbortSignal | undefined,
  timeoutMs: number,
): {
  signal: AbortSignal;
  cleanup: () => void;
  didTimeout: () => boolean;
} => {
  const controller = new AbortController();
  let timeoutTriggered = false;

  const timeoutId = window.setTimeout(() => {
    timeoutTriggered = true;
    controller.abort();
  }, timeoutMs);

  const onAbort = (): void => {
    controller.abort();
  };

  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener("abort", onAbort, { once: true });
    }
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      window.clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener("abort", onAbort);
      }
    },
    didTimeout: () => timeoutTriggered,
  };
};

const shouldRetryFetchError = (error: unknown): boolean => {
  if (isAbortError(error)) {
    return true;
  }
  return error instanceof TypeError;
};

const requestJson = async <T>(
  url: string,
  options?: RequestOptions,
  allow404 = false,
): Promise<T | null> => {
  const timeoutMs = options?.timeoutMs ?? DEFAULT_FETCH_TIMEOUT_MS;
  const retries = options?.retries ?? DEFAULT_FETCH_RETRIES;
  const retryDelayMs = options?.retryDelayMs ?? DEFAULT_FETCH_RETRY_DELAY_MS;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const timer = withTimeoutSignal(options?.signal, timeoutMs);

    try {
      const response = await fetch(url, {
        signal: timer.signal,
        headers: {
          Accept: "application/json",
        },
      });

      if (allow404 && response.status === 404) {
        return null;
      }

      if (!response.ok) {
        const payload = (await response
          .json()
          .catch(() => ({ error: { message: "Unknown API error" } }))) as ApiError;

        throw new Error(payload.error?.message ?? `Request failed with status ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (options?.signal?.aborted) {
        throw new Error("Request canceled");
      }

      const timeoutError = isAbortError(error) && timer.didTimeout();
      const canRetry = shouldRetryFetchError(error) || timeoutError;
      const isLastAttempt = attempt >= retries;

      if (isLastAttempt || !canRetry) {
        if (timeoutError) {
          throw new Error("Request timeout");
        }
        throw error;
      }

      await sleep(retryDelayMs);
    } finally {
      timer.cleanup();
    }
  }

  return null;
};

const fetchJson = async <T>(url: string, options?: RequestOptions): Promise<T> => {
  const payload = await requestJson<T>(url, options, false);
  return payload as T;
};

export const getInventories = async (
  params: InventoriesQueryParams,
  options?: RequestOptions,
): Promise<InventoriesListResponse> => {
  const searchParams = new URLSearchParams();

  if (params.q?.trim()) {
    searchParams.set("q", params.q.trim());
  }

  if (params.searchBy) {
    searchParams.set("searchBy", params.searchBy);
  }

  if (typeof params.limit === "number") {
    searchParams.set("limit", String(params.limit));
  }

  if (typeof params.offset === "number") {
    searchParams.set("offset", String(params.offset));
  }

  const url = searchParams.size
    ? `${INVENTORIES_ENDPOINT}?${searchParams.toString()}`
    : INVENTORIES_ENDPOINT;

  return fetchJson<InventoriesListResponse>(url, options);
};

export const getInventoryByCode = async (code: string): Promise<InventoryDetailResponse> => {
  return fetchJson<InventoryDetailResponse>(`${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}`);
};

const fetchOptionalJson = async <T>(url: string, options?: RequestOptions): Promise<T | null> => {
  return requestJson<T>(url, options, true);
};

export const getNextInventoryByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryDetailResponse | null> => {
  return fetchOptionalJson<InventoryDetailResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/next`,
    options,
  );
};

export const getPreviousInventoryByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryDetailResponse | null> => {
  return fetchOptionalJson<InventoryDetailResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/previous`,
    options,
  );
};

export const getInventoryWarehousesByCode = async (
  code: string,
): Promise<InventoryWarehousesResponse> => {
  return fetchJson<InventoryWarehousesResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/warehouses`,
  );
};

export const getInventoryAuxiliarByCode = async (
  code: string,
  options?: RequestOptions & { alm?: string; dest?: number; multicia?: number },
): Promise<InventoryAuxiliarResponse> => {
  const searchParams = new URLSearchParams();
  if (options?.alm?.trim()) {
    searchParams.set("alm", options.alm.trim());
  }
  if (typeof options?.dest === "number" && Number.isFinite(options.dest)) {
    searchParams.set("dest", String(Math.trunc(options.dest)));
  }
  if (typeof options?.multicia === "number" && Number.isFinite(options.multicia)) {
    searchParams.set("multicia", String(Math.trunc(options.multicia)));
  }

  const url = searchParams.size
    ? `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/auxiliar?${searchParams.toString()}`
    : `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/auxiliar`;

  return fetchJson<InventoryAuxiliarResponse>(
    url,
    { signal: options?.signal },
  );
};

export const getInventoryLotesByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryLotesResponse> => {
  return fetchJson<InventoryLotesResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/lotes`,
    options,
  );
};

export const getInventoryUepsPepsByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryUepsPepsResponse> => {
  return fetchJson<InventoryUepsPepsResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/ueps-peps`,
    options,
  );
};

export const getInventoryClientOrdersByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryClientOrdersResponse> => {
  return fetchJson<InventoryClientOrdersResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/orders-by-client`,
    options,
  );
};

export const getInventoryClientSalesByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryClientSalesResponse> => {
  return fetchJson<InventoryClientSalesResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/sales-by-client`,
    options,
  );
};

export const getInventorySalesBreakdownByCode = async (
  code: string,
  options?: RequestOptions & { dest?: number; multicia?: number },
): Promise<InventorySalesBreakdownResponse> => {
  const searchParams = new URLSearchParams();
  if (typeof options?.dest === "number" && Number.isFinite(options.dest)) {
    searchParams.set("dest", String(Math.trunc(options.dest)));
  }
  if (typeof options?.multicia === "number" && Number.isFinite(options.multicia)) {
    searchParams.set("multicia", String(Math.trunc(options.multicia)));
  }

  const url = searchParams.size
    ? `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/sales-breakdown?${searchParams.toString()}`
    : `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/sales-breakdown`;

  return fetchJson<InventorySalesBreakdownResponse>(
    url,
    { signal: options?.signal },
  );
};

export const getInventorySalesByBranchByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryBranchSalesResponse> => {
  return fetchJson<InventoryBranchSalesResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/sales-by-branch`,
    options,
  );
};

export const getInventoryAnnualSalesByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryAnnualSalesResponse> => {
  return fetchJson<InventoryAnnualSalesResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/annual-sales`,
    options,
  );
};

export const getInventoryPurchasesBySupplierByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryPurchasesBySupplierResponse> => {
  return fetchJson<InventoryPurchasesBySupplierResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/purchases-by-supplier`,
    options,
  );
};

export const getInventoryPurchasesBreakdownByCode = async (
  code: string,
  options?: RequestOptions & { dest?: number; multicia?: number },
): Promise<InventoryPurchasesBreakdownResponse> => {
  const searchParams = new URLSearchParams();

  if (typeof options?.dest === "number" && Number.isFinite(options.dest)) {
    searchParams.set("dest", String(Math.trunc(options.dest)));
  }
  if (typeof options?.multicia === "number" && Number.isFinite(options.multicia)) {
    searchParams.set("multicia", String(Math.trunc(options.multicia)));
  }

  const url = searchParams.size
    ? `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/purchases-breakdown?${searchParams.toString()}`
    : `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/purchases-breakdown`;

  return fetchJson<InventoryPurchasesBreakdownResponse>(
    url,
    { signal: options?.signal },
  );
};

export const getInventoryOrderedSuppliersByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryOrderedSuppliersResponse> => {
  return fetchJson<InventoryOrderedSuppliersResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/ordered-suppliers`,
    options,
  );
};

export const getInventoryAnnualPurchasesByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryAnnualPurchasesResponse> => {
  return fetchJson<InventoryAnnualPurchasesResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/annual-purchases`,
    options,
  );
};

export const getInventoryClassificationByCode = async (
  code: string,
  options?: RequestOptions,
): Promise<InventoryClassificationResponse> => {
  return fetchJson<InventoryClassificationResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/classification`,
    options,
  );
};
