export type BlockMode = "thumbnail" | "full";

export interface FilterConfig {
  isEnabled: boolean;
  blockShorts: boolean;
  blockClickbait: boolean;
  blockMode: BlockMode;
  blockedCategories: string[];
  blockedKeywords: string[];
  blockedChannels: string[];
  allowedChannels: string[];
}

export interface ExtensionState {
  filters: FilterConfig;
}

export type MessageType =
  | { type: "TOGGLE_EXTENSION"; enabled: boolean }
  | { type: "UPDATE_FILTERS"; filters: FilterConfig }
  | { type: "GET_STATUS"; }
  | { type: "STATUS_RESPONSE"; state: ExtensionState }
  | { type: "FILTERS_UPDATED"; filters: FilterConfig };
