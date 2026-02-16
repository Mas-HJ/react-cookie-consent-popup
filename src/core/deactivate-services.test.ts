import { deactivateServices } from './deactivate-services';
import { ELEMENT_ID_PREFIX } from '../config';
import type { ConsentService } from '../ConsentContext';

describe('deactivateServices', () => {
    afterEach(() => {
        document.body.innerHTML = '';
        localStorage.clear();
        sessionStorage.clear();
    });

    it('removes scripts from the DOM', () => {
        const script = document.createElement('script');
        script.id = `${ELEMENT_ID_PREFIX}-analytics-ga`;
        document.body.appendChild(script);

        const services: ConsentService[] = [
            {
                id: 'analytics',
                name: 'Analytics',
                scripts: [{ id: 'ga', src: 'https://example.com/ga.js' }],
            },
        ];

        deactivateServices(services);

        expect(document.getElementById(`${ELEMENT_ID_PREFIX}-analytics-ga`)).toBeNull();
    });

    it('clears localStorage items', () => {
        localStorage.setItem('tracker_data', 'val');

        const services: ConsentService[] = [
            { id: 'tracker', name: 'Tracker', localStorage: ['tracker_data'] },
        ];

        deactivateServices(services);

        expect(localStorage.getItem('tracker_data')).toBeNull();
    });

    it('clears sessionStorage items', () => {
        sessionStorage.setItem('session_id', 'val');

        const services: ConsentService[] = [
            { id: 'session', name: 'Session', sessionStorage: ['session_id'] },
        ];

        deactivateServices(services);

        expect(sessionStorage.getItem('session_id')).toBeNull();
    });
});
