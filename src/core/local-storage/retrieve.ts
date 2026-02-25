import { STORAGE_KEY } from '../../config';
import type { PersistedConsent } from './persist';

interface RetrievedConsent {
    consent: string[];
    isValid: boolean;
}

export function retrieveConsent(currentHash: string): RetrievedConsent {
    if (typeof window === 'undefined') {
        return { consent: [], isValid: false };
    }

    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
        return { consent: [], isValid: false };
    }

    try {
        const data: PersistedConsent = JSON.parse(raw);

        if (data.hash !== currentHash) {
            return { consent: [], isValid: false };
        }

        return { consent: data.consent, isValid: true };
    } catch {
        return { consent: [], isValid: false };
    }
}
