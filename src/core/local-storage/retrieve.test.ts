import { retrieveConsent } from './retrieve';
import { STORAGE_KEY } from '../../config';

describe('retrieveConsent', () => {
    afterEach(() => {
        localStorage.clear();
    });

    it('returns valid consent when hash matches', () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ consent: ['analytics'], hash: 'correct-hash', timestamp: Date.now() })
        );

        const result = retrieveConsent('correct-hash');
        expect(result.isValid).toBe(true);
        expect(result.consent).toEqual(['analytics']);
    });

    it('returns invalid when hash does not match', () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ consent: ['analytics'], hash: 'old-hash', timestamp: Date.now() })
        );

        const result = retrieveConsent('new-hash');
        expect(result.isValid).toBe(false);
        expect(result.consent).toEqual([]);
    });

    it('returns invalid when localStorage is empty', () => {
        const result = retrieveConsent('any-hash');
        expect(result.isValid).toBe(false);
        expect(result.consent).toEqual([]);
    });

    it('returns invalid when localStorage contains malformed JSON', () => {
        localStorage.setItem(STORAGE_KEY, 'not-json');

        const result = retrieveConsent('any-hash');
        expect(result.isValid).toBe(false);
    });
});
