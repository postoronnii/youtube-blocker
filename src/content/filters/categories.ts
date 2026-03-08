import { BLOCKED_ATTR } from "../../shared/constants";
import { applyOverlay } from "../ui/overlay";

/**
 * Parses category from YouTube's embedded page data (ytInitialData / meta tags).
 * Works on video watch pages — homepage videos don't expose category metadata.
 */
export function filterWatchPageByCategory(
  blockedCategories: string[]
): void {
  if (blockedCategories.length === 0) return;
  if (!window.location.pathname.startsWith("/watch")) return;

  const videoContainer = document.querySelector<HTMLElement>(
    "ytd-watch-flexy"
  );
  if (!videoContainer || videoContainer.hasAttribute(BLOCKED_ATTR)) return;

  const category = getVideoCategory();
  if (!category) return;

  const lowerBlocked = blockedCategories.map((c) => c.toLowerCase());
  if (lowerBlocked.includes(category.toLowerCase())) {
    applyOverlay(videoContainer, `Category: ${category}`);
  }
}

function getVideoCategory(): string | null {
  const metaTag = document.querySelector<HTMLMetaElement>(
    'meta[itemprop="genre"]'
  );
  if (metaTag?.content) return metaTag.content;

  try {
    const scripts = document.querySelectorAll("script");
    for (const script of scripts) {
      const text = script.textContent ?? "";
      if (text.includes("ytInitialPlayerResponse")) {
        const match = text.match(/"category"\s*:\s*"([^"]+)"/);
        if (match?.[1]) return match[1];
      }
    }
  } catch {
    // Parsing failed — gracefully skip
  }

  return null;
}
