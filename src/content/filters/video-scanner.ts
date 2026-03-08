import { SELECTORS, BLOCKED_ATTR } from "../../shared/constants";

export interface VideoInfo {
  element: HTMLElement;
  title: string;
  channel: string;
}

export function scanUnblockedVideos(): VideoInfo[] {
  const results: VideoInfo[] = [];
  const videos = document.querySelectorAll<HTMLElement>(
    SELECTORS.videoRenderer
  );

  for (const video of videos) {
    if (video.hasAttribute(BLOCKED_ATTR)) continue;

    const title = extractTitle(video);
    const channel = extractChannel(video);

    if (title) {
      results.push({ element: video, title, channel });
    }
  }

  return results;
}

function extractTitle(video: HTMLElement): string {
  const titleEl = video.querySelector<HTMLElement>(SELECTORS.videoTitle);
  if (titleEl?.textContent?.trim()) {
    return titleEl.textContent.trim();
  }

  const ariaLabel = video.querySelector<HTMLElement>("a[aria-label]");
  if (ariaLabel?.getAttribute("aria-label")?.trim()) {
    return ariaLabel.getAttribute("aria-label")!.trim();
  }

  const h3 = video.querySelector("h3");
  if (h3?.textContent?.trim()) {
    return h3.textContent.trim();
  }

  return "";
}

function extractChannel(video: HTMLElement): string {
  const channelEl = video.querySelector<HTMLElement>(SELECTORS.channelName);
  if (channelEl?.textContent?.trim()) {
    return channelEl.textContent.trim();
  }

  return "";
}
