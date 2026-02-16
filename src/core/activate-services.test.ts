import { activateServices } from './activate-services';
import { ELEMENT_ID_PREFIX } from '../config';
import type { ConsentService } from '../ConsentContext';

describe('activateServices', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('loads scripts for each service', () => {
        const services: ConsentService[] = [
            {
                id: 'analytics',
                name: 'Analytics',
                scripts: [{ id: 'ga', src: 'https://example.com/ga.js' }],
            },
            {
                id: 'marketing',
                name: 'Marketing',
                scripts: [{ id: 'fb', code: 'window.fb = true;' }],
            },
        ];

        activateServices(services);

        expect(document.getElementById(`${ELEMENT_ID_PREFIX}-analytics-ga`)).not.toBeNull();
        expect(document.getElementById(`${ELEMENT_ID_PREFIX}-marketing-fb`)).not.toBeNull();
    });

    it('handles services without scripts gracefully', () => {
        const services: ConsentService[] = [
            { id: 'basic', name: 'Basic' },
        ];

        expect(() => activateServices(services)).not.toThrow();
    });
});
