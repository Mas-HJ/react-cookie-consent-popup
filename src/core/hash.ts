/**
 * Simple djb2 hash function.
 * Produces a deterministic hex string from any input string.
 */
function djb2(str: string): string {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
}

/**
 * Hash an array of service identifiers.
 * Only uses `id` and `name` so that description or script changes
 * do not invalidate existing consent.
 */
export function hashServices(services: { id: string; name: string }[]): string {
    const input = JSON.stringify(services.map((s) => ({ id: s.id, name: s.name })));
    return djb2(input);
}
