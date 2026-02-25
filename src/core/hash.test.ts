import { hashServices } from './hash';

describe('hashServices', () => {
    it('returns a hex string', () => {
        const result = hashServices([{ id: 'a', name: 'A' }]);
        expect(result).toMatch(/^[0-9a-f]+$/);
    });

    it('returns the same hash for the same input', () => {
        const services = [{ id: 'analytics', name: 'Analytics' }];
        expect(hashServices(services)).toBe(hashServices(services));
    });

    it('returns different hashes for different inputs', () => {
        const a = hashServices([{ id: 'a', name: 'A' }]);
        const b = hashServices([{ id: 'b', name: 'B' }]);
        expect(a).not.toBe(b);
    });

    it('only uses id and name for hashing', () => {
        const withExtra = [{ id: 'a', name: 'A', description: 'extra' }];
        const without = [{ id: 'a', name: 'A' }];
        expect(hashServices(withExtra)).toBe(hashServices(without));
    });
});
