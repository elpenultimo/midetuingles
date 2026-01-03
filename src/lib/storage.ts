export type StoredScores = Record<string, number>;

const safeWindow = typeof window !== 'undefined' ? window : undefined;

export function loadFromStorage<T>(key: string): T | null {
  if (!safeWindow) return null;
  try {
    const raw = safeWindow.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (err) {
    console.error('Error reading localStorage', err);
    return null;
  }
}

export function saveToStorage<T>(key: string, value: T) {
  if (!safeWindow) return;
  try {
    safeWindow.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('Error writing localStorage', err);
  }
}

export function clearFromStorage(key: string) {
  if (!safeWindow) return;
  try {
    safeWindow.localStorage.removeItem(key);
  } catch (err) {
    console.error('Error clearing localStorage', err);
  }
}

export const STORAGE_KEYS = {
  BEST_LEVEL: 'bestLevel',
  BEST_SCORES: 'bestScores',
  LAST_ATTEMPT: 'lastAttempt',
  ATTEMPT_STATE: 'attemptState'
};
