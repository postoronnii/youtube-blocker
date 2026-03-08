import { DEFAULT_FILTERS, STORAGE_KEY } from "./constants";
import type { FilterConfig } from "./types";

export async function getFilters(): Promise<FilterConfig> {
  const result = await chrome.storage.sync.get({
    [STORAGE_KEY]: DEFAULT_FILTERS,
  });
  const stored = result[STORAGE_KEY] as Partial<FilterConfig>;
  return { ...DEFAULT_FILTERS, ...stored };
}

export async function saveFilters(filters: FilterConfig): Promise<void> {
  await chrome.storage.sync.set({ [STORAGE_KEY]: filters });
}

export function onFiltersChanged(
  callback: (filters: FilterConfig) => void
): void {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes[STORAGE_KEY]) {
      const stored = changes[STORAGE_KEY].newValue as Partial<FilterConfig>;
      callback({ ...DEFAULT_FILTERS, ...stored });
    }
  });
}
