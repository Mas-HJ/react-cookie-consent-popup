import { isExternalScript, isInlineScript } from './type-guards';

describe('isExternalScript', () => {
    it('returns true when script has src property', () => {
        expect(isExternalScript({ id: 'ga', src: 'https://example.com/ga.js' })).toBe(true);
    });

    it('returns false when script has code property', () => {
        expect(isExternalScript({ id: 'ga', code: 'console.log("hi")' })).toBe(false);
    });
});

describe('isInlineScript', () => {
    it('returns true when script has code property', () => {
        expect(isInlineScript({ id: 'ga', code: 'console.log("hi")' })).toBe(true);
    });

    it('returns false when script has src property', () => {
        expect(isInlineScript({ id: 'ga', src: 'https://example.com/ga.js' })).toBe(false);
    });
});
