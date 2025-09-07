let expiryTimer: number | undefined;

export function scheduleAutoLogout(expiresAtISO: string, onExpire: () => void) {
  if (expiryTimer) window.clearTimeout(expiryTimer);

  const ms = new Date(expiresAtISO).getTime() - Date.now();
  const delay = Math.max(0, ms);

  expiryTimer = window.setTimeout(() => {
    onExpire();
    expiryTimer = undefined;
  }, delay);
}

export function cancelAutoLogout() {
  if (expiryTimer) window.clearTimeout(expiryTimer);
  expiryTimer = undefined;
}
