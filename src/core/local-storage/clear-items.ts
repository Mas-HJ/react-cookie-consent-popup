export function clearLocalStorageItems(keys: string[]): void {
    if (typeof window === 'undefined') return;

    for (const key of keys) {
        localStorage.removeItem(key);
    }
}
