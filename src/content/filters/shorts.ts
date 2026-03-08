import { SELECTORS, BLOCKED_ATTR } from "../../shared/constants";
import {
  applyOverlay,
  removeOverlay,
  hideElement,
  showElement,
} from "../ui/overlay";

export function filterShorts(shouldBlock: boolean): void {
  blurIndividualReels(shouldBlock);
  blurShortsLinksWithoutContainer(shouldBlock);
  toggleShortsNavigation(shouldBlock);

  if (shouldBlock && isOnShortsPage()) {
    redirectFromShorts();
  }
}

function blurIndividualReels(shouldBlock: boolean): void {
  const reelItems = document.querySelectorAll<HTMLElement>(
    SELECTORS.shortsItem
  );

  for (const reel of reelItems) {
    if (shouldBlock) {
      applyOverlay(reel, "Shorts");
    } else {
      removeOverlay(reel);
    }
  }
}

function blurShortsLinksWithoutContainer(shouldBlock: boolean): void {
  const shortsLinks = document.querySelectorAll<HTMLAnchorElement>(
    'a[href*="/shorts/"]'
  );

  for (const link of shortsLinks) {
    if (link.closest(`[${BLOCKED_ATTR}]`)) continue;

    const container = link.closest<HTMLElement>(
      `${SELECTORS.shortsItem}, ${SELECTORS.videoRenderer}`
    );
    if (container) continue;

    const target = link.closest<HTMLElement>(
      "ytd-compact-video-renderer, yt-lockup-view-model, ytd-video-renderer"
    ) ?? link.parentElement;
    if (!target || target.hasAttribute(BLOCKED_ATTR)) continue;

    if (shouldBlock) {
      applyOverlay(target, "Shorts");
    } else {
      removeOverlay(target);
    }
  }
}

function toggleShortsNavigation(shouldBlock: boolean): void {
  const navSelectors = [SELECTORS.shortsSidebar, SELECTORS.shortsNavItem];

  for (const selector of navSelectors) {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    for (const el of elements) {
      const navItem =
        el.closest<HTMLElement>(
          "ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer"
        ) ?? el;
      if (shouldBlock) {
        hideElement(navItem);
      } else {
        showElement(navItem);
      }
    }
  }
}

function isOnShortsPage(): boolean {
  return window.location.pathname.startsWith("/shorts");
}

function redirectFromShorts(): void {
  window.location.href = "https://www.youtube.com/";
}
