import type { CookiePattern } from '../../ConsentContext';

function getAllCookieNames(): string[] {
    if (typeof document === 'undefined') return [];

    return document.cookie
        .split(';')
        .map((entry) => entry.trim().split('=')[0])
        .filter(Boolean);
}

function expireCookie(name: string): void {
    if (typeof document === 'undefined') return;

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export function clearCookies(patterns: CookiePattern[]): void {
    const cookieNames = getAllCookieNames();

    for (const { pattern } of patterns) {
        if (typeof pattern === 'string') {
            expireCookie(pattern);
        } else {
            for (const name of cookieNames) {
                if (pattern.test(name)) {
                    expireCookie(name);
                }
            }
        }
    }
}
