import { DEFAULT_FILTERS, STORAGE_KEY } from "../shared/constants";
import type { MessageType } from "../shared/types";

chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.sync.get(STORAGE_KEY);
  if (!existing[STORAGE_KEY]) {
    await chrome.storage.sync.set({ [STORAGE_KEY]: DEFAULT_FILTERS });
  }
});

chrome.runtime.onMessage.addListener(
  (message: MessageType, _sender, sendResponse) => {
    if (message.type === "GET_STATUS") {
      chrome.storage.sync.get(STORAGE_KEY).then((result) => {
        sendResponse({
          type: "STATUS_RESPONSE",
          state: { filters: result[STORAGE_KEY] ?? DEFAULT_FILTERS },
        });
      });
      return true;
    }
  }
);
