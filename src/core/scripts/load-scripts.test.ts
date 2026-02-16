import { loadScripts } from './load-scripts';
import { ELEMENT_ID_PREFIX } from '../../config';

describe('loadScripts', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('loads external scripts into the DOM', () => {
        loadScripts('analytics', [
            { id: 'ga', src: 'https://example.com/ga.js' },
        ]);

        const el = document.getElementById(`${ELEMENT_ID_PREFIX}-analytics-ga`);
        expect(el).not.toBeNull();
        expect(el?.tagName).toBe('SCRIPT');
    });

    it('loads inline scripts into the DOM', () => {
        loadScripts('tracking', [
            { id: 'pixel', code: 'window.pixel = true;' },
        ]);

        const el = document.getElementById(`${ELEMENT_ID_PREFIX}-tracking-pixel`);
        expect(el).not.toBeNull();
        expect(el?.innerHTML).toBe('window.pixel = true;');
    });

    it('does not duplicate scripts that already exist', () => {
        loadScripts('svc', [{ id: 's1', src: 'https://example.com/s1.js' }]);
        loadScripts('svc', [{ id: 's1', src: 'https://example.com/s1.js' }]);

        const elements = document.querySelectorAll(`#${ELEMENT_ID_PREFIX}-svc-s1`);
        expect(elements).toHaveLength(1);
    });
});
