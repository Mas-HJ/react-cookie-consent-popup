import { STORAGE_KEY } from '../../config';

export interface PersistedConsent {
    consent: string[];
    hash: string;
    timestamp: number;
}

export function persistConsent(consent: string[], hash: string): void {
    const data: PersistedConsent = {
        consent,
        hash,
        timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
