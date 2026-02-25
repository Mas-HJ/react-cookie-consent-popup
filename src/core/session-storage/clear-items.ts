export function clearSessionStorageItems(keys: string[]): void {
    if (typeof window === 'undefined') return;

    for (const key of keys) {
        sessionStorage.removeItem(key);
    }
}
