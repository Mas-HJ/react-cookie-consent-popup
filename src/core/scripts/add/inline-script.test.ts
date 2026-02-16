import { loadInlineScript } from './inline-script';

describe('loadInlineScript', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('creates a script element with given id and inline code', () => {
        loadInlineScript('test-inline-1', 'window.tracked = true;');

        const el = document.getElementById('test-inline-1') as HTMLScriptElement;
        expect(el).not.toBeNull();
        expect(el.tagName).toBe('SCRIPT');
        expect(el.innerHTML).toBe('window.tracked = true;');
    });

    it('appends the script to document.body', () => {
        loadInlineScript('test-inline-2', 'console.log("ok")');

        const scripts = document.body.querySelectorAll('script');
        expect(scripts).toHaveLength(1);
    });
});
