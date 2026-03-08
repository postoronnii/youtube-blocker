import { applyOverlay } from "../ui/overlay";
import { scanUnblockedVideos } from "./video-scanner";

export function filterByChannels(
  blockedChannels: string[],
  allowedChannels: string[]
): void {
  if (blockedChannels.length === 0 && allowedChannels.length === 0) return;

  const lowerBlocked = blockedChannels.map((c) => c.toLowerCase());
  const lowerAllowed = allowedChannels.map((c) => c.toLowerCase());

  for (const { element, channel } of scanUnblockedVideos()) {
    if (!channel) continue;

    const lowerChannel = channel.toLowerCase();
    const isAllowed =
      lowerAllowed.length > 0
        ? lowerAllowed.some((c) => lowerChannel.includes(c))
        : true;

    const isBlocked = lowerBlocked.some((c) => lowerChannel.includes(c));

    if (isBlocked || !isAllowed) {
      applyOverlay(element, `Channel: "${channel}"`);
    }
  }
}
