export function clearSessionStorageItems(keys: string[]): void {
    for (const key of keys) {
        sessionStorage.removeItem(key);
    }
}
