import { loadExternalScript } from './external-script';

describe('loadExternalScript', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('creates a script element with given id and src', () => {
        loadExternalScript('test-script-1', 'https://cdn.example.com/analytics.js');

        const el = document.getElementById('test-script-1') as HTMLScriptElement;
        expect(el).not.toBeNull();
        expect(el.tagName).toBe('SCRIPT');
        expect(el.src).toBe('https://cdn.example.com/analytics.js');
        expect(el.async).toBe(true);
    });

    it('appends the script to document.body', () => {
        loadExternalScript('test-script-2', 'https://cdn.example.com/tracker.js');

        const scripts = document.body.querySelectorAll('script');
        expect(scripts).toHaveLength(1);
    });
});
