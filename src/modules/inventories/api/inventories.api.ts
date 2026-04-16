import type {
  InventoryDetailResponse,
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

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const payload = (await response
      .json()
      .catch(() => ({ error: { message: "Unknown API error" } }))) as ApiError;

    throw new Error(payload.error?.message ?? `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const getInventories = async (
  params: InventoriesQueryParams,
): Promise<InventoriesListResponse> => {
  const searchParams = new URLSearchParams();

  if (params.q?.trim()) {
    searchParams.set("q", params.q.trim());
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

  return fetchJson<InventoriesListResponse>(url);
};

export const getInventoryByCode = async (code: string): Promise<InventoryDetailResponse> => {
  return fetchJson<InventoryDetailResponse>(`${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}`);
};

const fetchOptionalJson = async <T>(url: string): Promise<T | null> => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const payload = (await response
      .json()
      .catch(() => ({ error: { message: "Unknown API error" } }))) as ApiError;

    throw new Error(payload.error?.message ?? `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
};

export const getNextInventoryByCode = async (
  code: string,
): Promise<InventoryDetailResponse | null> => {
  return fetchOptionalJson<InventoryDetailResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/next`,
  );
};

export const getPreviousInventoryByCode = async (
  code: string,
): Promise<InventoryDetailResponse | null> => {
  return fetchOptionalJson<InventoryDetailResponse>(
    `${INVENTORIES_ENDPOINT}/${encodeURIComponent(code)}/previous`,
  );
};
