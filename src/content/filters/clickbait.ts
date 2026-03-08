import { applyOverlay } from "../ui/overlay";
import { scanUnblockedVideos } from "./video-scanner";

const CAPS_THRESHOLD = 0.45;
const MIN_TITLE_LENGTH = 8;

export function filterByClickbait(shouldBlock: boolean): void {
  if (!shouldBlock) return;

  for (const { element, title } of scanUnblockedVideos()) {
    if (title.length < MIN_TITLE_LENGTH) continue;

    if (isMostlyUppercase(title)) {
      applyOverlay(element, "Clickbait: ALL CAPS");
    }
  }
}

function isMostlyUppercase(text: string): boolean {
  const letters = text.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
  if (letters.length < MIN_TITLE_LENGTH) return false;

  const upperCount = (text.match(/[A-ZА-ЯЁ]/g) ?? []).length;
  return upperCount / letters.length >= CAPS_THRESHOLD;
}
