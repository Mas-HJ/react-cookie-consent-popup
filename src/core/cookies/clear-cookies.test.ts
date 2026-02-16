import { clearCookies } from './clear-cookies';

describe('clearCookies', () => {
    afterEach(() => {
        // Clear all cookies
        document.cookie.split(';').forEach((c) => {
            const name = c.trim().split('=')[0];
            if (name) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            }
        });
    });

    it('removes a cookie by exact name', () => {
        document.cookie = 'tracking_id=abc123; path=/';

        clearCookies([{ pattern: 'tracking_id' }]);

        expect(document.cookie).not.toContain('tracking_id');
    });

    it('removes cookies matching a regex pattern', () => {
        document.cookie = '_ga_abc=val1; path=/';
        document.cookie = '_ga_def=val2; path=/';
        document.cookie = 'safe_cookie=keep; path=/';

        clearCookies([{ pattern: /^_ga_/ }]);

        expect(document.cookie).not.toContain('_ga_abc');
        expect(document.cookie).not.toContain('_ga_def');
        expect(document.cookie).toContain('safe_cookie');
    });
});
