import { unloadScripts } from './unload-scripts';
import { ELEMENT_ID_PREFIX } from '../../config';

describe('unloadScripts', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('removes script elements from the DOM', () => {
        const script = document.createElement('script');
        script.id = `${ELEMENT_ID_PREFIX}-analytics-ga`;
        document.body.appendChild(script);

        expect(document.getElementById(`${ELEMENT_ID_PREFIX}-analytics-ga`)).not.toBeNull();

        unloadScripts('analytics', [{ id: 'ga', src: 'https://example.com/ga.js' }]);

        expect(document.getElementById(`${ELEMENT_ID_PREFIX}-analytics-ga`)).toBeNull();
    });

    it('does nothing if the script element does not exist', () => {
        expect(() => {
            unloadScripts('missing', [{ id: 'x', src: 'https://example.com/x.js' }]);
        }).not.toThrow();
    });
});
