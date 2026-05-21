/**
 * safeStorage — try/catch wrapper around localStorage so signature animation
 * gating and badminton best-rally tracking degrade gracefully in incognito,
 * disabled-storage, or private-mode browsers.
 *
 * If localStorage is unavailable, reads return null and writes silently no-op.
 * Callers should treat null as "no record" (e.g. signature animates every load,
 * best rally resets per session).
 */

let memoryStore: Record<string, string> = {};
let storageOk: boolean | null = null;

function probe(): boolean {
  if (storageOk !== null) return storageOk;
  try {
    const k = "__wz_probe__";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    storageOk = true;
  } catch {
    storageOk = false;
  }
  return storageOk;
}

export const safeStorage = {
  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    if (probe()) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return memoryStore[key] ?? null;
      }
    }
    return memoryStore[key] ?? null;
  },

  set(key: string, value: string): void {
    if (typeof window === "undefined") return;
    if (probe()) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch {
        // fall through to memory
      }
    }
    memoryStore[key] = value;
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    if (probe()) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch {
        // fall through
      }
    }
    delete memoryStore[key];
  },
};
