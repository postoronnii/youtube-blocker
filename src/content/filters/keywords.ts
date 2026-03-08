import { applyOverlay } from "../ui/overlay";
import { scanUnblockedVideos } from "./video-scanner";

export function filterByKeywords(blockedKeywords: string[]): void {
  if (blockedKeywords.length === 0) return;

  const lowerKeywords = blockedKeywords.map((k) => k.toLowerCase());

  for (const { element, title } of scanUnblockedVideos()) {
    const lowerTitle = title.toLowerCase();
    const matched = lowerKeywords.find((kw) => lowerTitle.includes(kw));
    if (matched) {
      applyOverlay(element, `Keyword: "${matched}"`);
    }
  }
}
