import { getFilters, onFiltersChanged } from "../shared/storage";
import type { FilterConfig } from "../shared/types";
import { startObserving } from "./observers";
import { filterShorts } from "./filters/shorts";
import { filterByKeywords } from "./filters/keywords";
import { filterByChannels } from "./filters/channels";
import { filterWatchPageByCategory } from "./filters/categories";
import { filterByClickbait } from "./filters/clickbait";
import { setBlockMode, clearAllOverlays } from "./ui/overlay";

let currentFilters: FilterConfig | null = null;

function applyFilters(): void {
  if (!currentFilters?.isEnabled) return;

  setBlockMode(currentFilters.blockMode);

  if (currentFilters.blockShorts) {
    filterShorts(true);
  }

  if (currentFilters.blockClickbait) {
    filterByClickbait(true);
  }

  filterWatchPageByCategory(currentFilters.blockedCategories);
  filterByKeywords(currentFilters.blockedKeywords);
  filterByChannels(
    currentFilters.blockedChannels,
    currentFilters.allowedChannels
  );
}

async function init(): Promise<void> {
  currentFilters = await getFilters();

  onFiltersChanged((filters) => {
    clearAllOverlays();
    currentFilters = filters;
    applyFilters();
  });

  startObserving(applyFilters);
}

init();
