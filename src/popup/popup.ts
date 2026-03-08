import { getFilters, saveFilters } from "../shared/storage";
import type { BlockMode, FilterConfig } from "../shared/types";

const $ = <T extends HTMLElement>(id: string) =>
  document.getElementById(id) as T;

let filters: FilterConfig;

async function init(): Promise<void> {
  filters = await getFilters();
  render();
  bindEvents();
}

function render(): void {
  ($<HTMLInputElement>("toggle-enabled")).checked = filters.isEnabled;
  ($<HTMLInputElement>("toggle-shorts")).checked = filters.blockShorts;
  ($<HTMLInputElement>("toggle-clickbait")).checked = filters.blockClickbait;

  document.querySelectorAll<HTMLElement>(".mode-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset["mode"] === filters.blockMode);
  });

  renderTags("keyword-tags", filters.blockedKeywords, removeKeyword);
  renderTags("channel-tags", filters.blockedChannels, removeChannel);
}

function renderTags(
  containerId: string,
  items: string[],
  onRemove: (item: string) => void
): void {
  const container = $(containerId);
  container.innerHTML = "";
  for (const item of items) {
    const tag = document.createElement("span");
    tag.className = "tag";

    const label = document.createElement("span");
    label.textContent = item;

    const remove = document.createElement("span");
    remove.className = "tag-remove";
    remove.textContent = "\u00D7";
    remove.addEventListener("click", () => onRemove(item));

    tag.appendChild(label);
    tag.appendChild(remove);
    container.appendChild(tag);
  }
}

function bindEvents(): void {
  $<HTMLInputElement>("toggle-enabled").addEventListener("change", async (e) => {
    filters.isEnabled = (e.target as HTMLInputElement).checked;
    await saveFilters(filters);
  });

  $<HTMLInputElement>("toggle-shorts").addEventListener("change", async (e) => {
    filters.blockShorts = (e.target as HTMLInputElement).checked;
    await saveFilters(filters);
  });

  $<HTMLInputElement>("toggle-clickbait").addEventListener("change", async (e) => {
    filters.blockClickbait = (e.target as HTMLInputElement).checked;
    await saveFilters(filters);
  });

  document.querySelectorAll<HTMLElement>(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      filters.blockMode = btn.dataset["mode"] as BlockMode;
      await saveFilters(filters);
      render();
    });
  });

  $("add-keyword").addEventListener("click", addKeyword);
  $<HTMLInputElement>("keyword-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addKeyword();
  });

  $("add-channel").addEventListener("click", addChannel);
  $<HTMLInputElement>("channel-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") addChannel();
  });
}

async function addKeyword(): Promise<void> {
  const input = $<HTMLInputElement>("keyword-input");
  const value = input.value.trim();
  if (!value || filters.blockedKeywords.includes(value)) return;

  filters.blockedKeywords.push(value);
  input.value = "";
  await saveFilters(filters);
  render();
}

async function removeKeyword(keyword: string): Promise<void> {
  filters.blockedKeywords = filters.blockedKeywords.filter(
    (k) => k !== keyword
  );
  await saveFilters(filters);
  render();
}

async function addChannel(): Promise<void> {
  const input = $<HTMLInputElement>("channel-input");
  const value = input.value.trim();
  if (!value || filters.blockedChannels.includes(value)) return;

  filters.blockedChannels.push(value);
  input.value = "";
  await saveFilters(filters);
  render();
}

async function removeChannel(channel: string): Promise<void> {
  filters.blockedChannels = filters.blockedChannels.filter(
    (c) => c !== channel
  );
  await saveFilters(filters);
  render();
}

init();
