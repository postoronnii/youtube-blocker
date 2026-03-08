import { BLOCKED_ATTR, SELECTORS } from "../../shared/constants";
import type { BlockMode } from "../../shared/types";

let currentMode: BlockMode = "thumbnail";

export function setBlockMode(mode: BlockMode): void {
  currentMode = mode;
}

export function applyOverlay(element: HTMLElement, reason: string): void {
  if (element.hasAttribute(BLOCKED_ATTR)) return;
  element.setAttribute(BLOCKED_ATTR, reason);

  const overlay = document.createElement("div");
  overlay.className = "ytf-overlay";

  const icon = document.createElement("span");
  icon.className = "ytf-overlay-icon";
  icon.textContent = "\uD83D\uDCA9";

  const text = document.createElement("span");
  text.className = "ytf-overlay-text";
  text.textContent = `Blocked: ${reason}`;

  overlay.appendChild(icon);
  overlay.appendChild(text);

  if (currentMode === "full") {
    element.classList.add("ytf-full-blocked");
    element.appendChild(overlay);
  } else {
    const thumbnail =
      element.querySelector<HTMLElement>(SELECTORS.thumbnail) ?? element;
    thumbnail.classList.add("ytf-thumb-blocked");
    thumbnail.appendChild(overlay);
  }
}

export function removeOverlay(element: HTMLElement): void {
  element.removeAttribute(BLOCKED_ATTR);
  element.classList.remove("ytf-full-blocked");

  const thumb = element.querySelector(".ytf-thumb-blocked");
  if (thumb) {
    thumb.classList.remove("ytf-thumb-blocked");
    thumb.querySelector(".ytf-overlay")?.remove();
  }

  element.querySelector(".ytf-overlay")?.remove();
}

export function clearAllOverlays(): void {
  document.querySelectorAll<HTMLElement>(`[${BLOCKED_ATTR}]`).forEach((el) => {
    removeOverlay(el);
  });

  document.querySelectorAll<HTMLElement>(".ytf-thumb-blocked").forEach((el) => {
    el.classList.remove("ytf-thumb-blocked");
    el.querySelector(".ytf-overlay")?.remove();
  });

  document.querySelectorAll<HTMLElement>(".ytf-full-blocked").forEach((el) => {
    el.classList.remove("ytf-full-blocked");
    el.querySelector(".ytf-overlay")?.remove();
  });

  document.querySelectorAll(".ytf-overlay").forEach((el) => el.remove());
  document.querySelectorAll(".ytf-hidden").forEach((el) => {
    el.classList.remove("ytf-hidden");
  });
}

export function hideElement(element: HTMLElement): void {
  element.classList.add("ytf-hidden");
}

export function showElement(element: HTMLElement): void {
  element.classList.remove("ytf-hidden");
}
