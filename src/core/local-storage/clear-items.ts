export function clearLocalStorageItems(keys: string[]): void {
    for (const key of keys) {
        localStorage.removeItem(key);
    }
}
