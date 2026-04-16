import { create } from "zustand";
import {
  getInventoryByCode,
  getInventories,
  getNextInventoryByCode,
  getPreviousInventoryByCode,
} from "../api/inventories.api";
import type { InventoryDetail, InventoryListItem } from "../types/inventory.types";

const DEFAULT_LIMIT = 50;
const DEFAULT_OFFSET = 0;
const DEFAULT_INVENTORY_CODE = "004212899";

type LoadInventoriesInput = {
  q?: string;
  limit?: number;
  offset?: number;
  autoSelectFallback?: boolean;
};

type InventoriesState = {
  list: InventoryListItem[];
  detail: InventoryDetail | null;
  selectedCode: string | null;
  query: string;
  limit: number;
  offset: number;
  total: number;
  isListLoading: boolean;
  isDetailLoading: boolean;
  listError: string | null;
  detailError: string | null;
  initialize: () => Promise<void>;
  setQuery: (value: string) => void;
  loadInventories: (input?: LoadInventoriesInput) => Promise<void>;
  selectInventory: (code: string) => Promise<void>;
  selectPreviousInventory: () => Promise<void>;
  selectNextInventory: () => Promise<void>;
};

export const useInventoriesStore = create<InventoriesState>((set, get) => ({
  list: [],
  detail: null,
  selectedCode: null,
  query: "",
  limit: DEFAULT_LIMIT,
  offset: DEFAULT_OFFSET,
  total: 0,
  isListLoading: false,
  isDetailLoading: false,
  listError: null,
  detailError: null,

  initialize: async () => {
    const { query, limit, offset } = get();
    const initialCode = get().selectedCode ?? DEFAULT_INVENTORY_CODE;

    set({
      isListLoading: true,
      isDetailLoading: true,
      listError: null,
      detailError: null,
    });

    const [listResult, detailResult] = await Promise.allSettled([
      getInventories({ q: query, limit, offset }),
      getInventoryByCode(initialCode),
    ]);

    if (listResult.status === "fulfilled") {
      set({
        list: listResult.value.data,
        limit: listResult.value.meta.limit,
        offset: listResult.value.meta.offset,
        total: listResult.value.meta.total ?? listResult.value.meta.count,
        isListLoading: false,
      });
    } else {
      set({
        listError: listResult.reason instanceof Error ? listResult.reason.message : "Error loading inventories",
        isListLoading: false,
      });
    }

    if (detailResult.status === "fulfilled") {
      set({
        detail: detailResult.value.data,
        selectedCode: detailResult.value.data.identity.code,
        isDetailLoading: false,
      });
    } else {
      set({
        detailError:
          detailResult.reason instanceof Error ? detailResult.reason.message : "Error loading inventory detail",
        isDetailLoading: false,
      });
    }

    const { detail, list } = get();

    if (!detail && list.length > 0) {
      void get().selectInventory(list[0].code);
    }
  },

  setQuery: (value: string) => {
    set({ query: value });
  },

  loadInventories: async (input) => {
    const q = input?.q ?? get().query;
    const limit = input?.limit ?? get().limit;
    const offset = input?.offset ?? get().offset;
    const autoSelectFallback = input?.autoSelectFallback ?? true;

    set({ isListLoading: true, listError: null, query: q, limit, offset });

    try {
      const response = await getInventories({ q, limit, offset });
      const selectedCode = get().selectedCode;

      set({
        list: response.data,
        limit: response.meta.limit,
        offset: response.meta.offset,
        total: response.meta.total ?? response.meta.count,
        isListLoading: false,
      });

      if (autoSelectFallback && (!selectedCode || !response.data.some((item) => item.code === selectedCode))) {
        if (response.data.length > 0) {
          await get().selectInventory(response.data[0].code);
        } else {
          set({ detail: null, selectedCode: null });
        }
      }
    } catch (error) {
      set({
        listError: error instanceof Error ? error.message : "Error loading inventories",
        isListLoading: false,
      });
    }
  },

  selectInventory: async (code: string) => {
    const normalizedCode = code.trim();

    if (!normalizedCode) {
      return;
    }

    set({ isDetailLoading: true, detailError: null, selectedCode: normalizedCode });

    try {
      const response = await getInventoryByCode(normalizedCode);
      set({
        detail: response.data,
        selectedCode: response.data.identity.code,
        isDetailLoading: false,
      });
    } catch (error) {
      set({
        detailError: error instanceof Error ? error.message : "Error loading inventory detail",
        isDetailLoading: false,
      });
    }
  },

  selectPreviousInventory: async () => {
    const { selectedCode, detail, isDetailLoading } = get();

    if (isDetailLoading) {
      return;
    }

    const currentCode = selectedCode ?? detail?.identity.code ?? null;

    if (!currentCode) {
      return;
    }

    set({ isDetailLoading: true, detailError: null });

    try {
      const response = await getPreviousInventoryByCode(currentCode);

      if (!response) {
        set({ isDetailLoading: false });
        return;
      }

      set({
        detail: response.data,
        selectedCode: response.data.identity.code,
        isDetailLoading: false,
      });
    } catch (error) {
      set({
        detailError: error instanceof Error ? error.message : "Error loading previous inventory detail",
        isDetailLoading: false,
      });
    }
  },

  selectNextInventory: async () => {
    const { selectedCode, detail, isDetailLoading } = get();

    if (isDetailLoading) {
      return;
    }

    const currentCode = selectedCode ?? detail?.identity.code ?? null;

    if (!currentCode) {
      return;
    }

    set({ isDetailLoading: true, detailError: null });

    try {
      const response = await getNextInventoryByCode(currentCode);

      if (!response) {
        set({ isDetailLoading: false });
        return;
      }

      set({
        detail: response.data,
        selectedCode: response.data.identity.code,
        isDetailLoading: false,
      });
    } catch (error) {
      set({
        detailError: error instanceof Error ? error.message : "Error loading next inventory detail",
        isDetailLoading: false,
      });
    }
  },
}));
