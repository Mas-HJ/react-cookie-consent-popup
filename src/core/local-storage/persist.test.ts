import { persistConsent } from './persist';
import { STORAGE_KEY } from '../../config';

describe('persistConsent', () => {
    afterEach(() => {
        localStorage.clear();
    });

    it('saves consent data to localStorage as JSON', () => {
        persistConsent(['analytics', 'marketing'], 'hash-abc');

        const raw = localStorage.getItem(STORAGE_KEY);
        expect(raw).not.toBeNull();

        const data = JSON.parse(raw!);
        expect(data.consent).toEqual(['analytics', 'marketing']);
        expect(data.hash).toBe('hash-abc');
        expect(typeof data.timestamp).toBe('number');
    });
});
