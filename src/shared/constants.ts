import type { FilterConfig } from "./types";

export const BLOCKED_CATEGORIES_DEFAULT = [
  "Gaming",
  "Entertainment",
  "Comedy",
  "Film & Animation",
  "People & Blogs",
  "Sports",
] as const;

export const BLOCKED_KEYWORDS_DEFAULT = [
  "SHOCKING",
  "OMG",
  "GONE WRONG",
  "NOT CLICKBAIT",
  "YOU WON'T BELIEVE",
  "ШОКИРУЮЩ",
  "МАССОВО",
  "СРОЧНО",
  "ШОК",
  "ЖЕСТЬ",
  "СЛИВ",
  "ИСТЕРИКА",
  "СКАНДАЛ",
] as const;

export const DEFAULT_FILTERS: FilterConfig = {
  isEnabled: true,
  blockShorts: true,
  blockClickbait: true,
  blockMode: "thumbnail",
  blockedCategories: [...BLOCKED_CATEGORIES_DEFAULT],
  blockedKeywords: [...BLOCKED_KEYWORDS_DEFAULT],
  blockedChannels: [],
  allowedChannels: [],
};

export const SELECTORS = {
  shortsShelf: "ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts]",
  shortsEntry:
    'ytd-rich-section-renderer[is-shorts-grid], ytd-rich-section-renderer[is-shorts]',
  shortsItem: [
    "ytd-reel-item-renderer",
    "ytm-shorts-lockup-view-model-v2",
    "ytm-shorts-lockup-view-model",
  ].join(", "),
  shortsSidebar: 'ytd-guide-entry-renderer a[title="Shorts"]',
  shortsNavItem: "ytd-mini-guide-entry-renderer a[title='Shorts']",
  shortsPage: "ytd-shorts",
  videoRenderer: [
    "ytd-video-renderer",
    "ytd-rich-item-renderer",
    "ytd-compact-video-renderer",
    "ytd-grid-video-renderer",
  ].join(", "),
  videoTitle: [
    "#video-title",
    "#video-title-link",
    "a.yt-simple-endpoint#video-title",
    "yt-formatted-string#video-title",
    "h3 a",
    "h3",
  ].join(", "),
  channelName: [
    'a[href^="/@"]',
    "#channel-name a",
    "ytd-channel-name a",
    "ytd-channel-name yt-formatted-string",
  ].join(", "),
  thumbnail: [
    "ytd-thumbnail",
    "yt-thumbnail-view-model",
    "a.yt-lockup-view-model__content-image",
  ].join(", "),
} as const;

export const STORAGE_KEY = "ytFocusState";

export const BLOCKED_ATTR = "data-ytf-blocked";
