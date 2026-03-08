type FilterCallback = () => void;

let observer: MutationObserver | null = null;

export function startObserving(onMutation: FilterCallback): void {
  stopObserving();

  let timeout: ReturnType<typeof setTimeout>;
  const debouncedCallback = () => {
    clearTimeout(timeout);
    timeout = setTimeout(onMutation, 300);
  };

  observer = new MutationObserver(debouncedCallback);

  const target = document.querySelector("ytd-app") ?? document.body;
  observer.observe(target, { childList: true, subtree: true });

  document.addEventListener("yt-navigate-finish", onMutation);

  onMutation();
}

export function stopObserving(): void {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}
