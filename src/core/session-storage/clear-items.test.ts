import { clearSessionStorageItems } from './clear-items';

describe('clearSessionStorageItems', () => {
    afterEach(() => {
        sessionStorage.clear();
    });

    it('removes specified keys from sessionStorage', () => {
        sessionStorage.setItem('session_tracker', 'xyz');
        sessionStorage.setItem('temp_data', '456');
        sessionStorage.setItem('keep_this', 'yes');

        clearSessionStorageItems(['session_tracker', 'temp_data']);

        expect(sessionStorage.getItem('session_tracker')).toBeNull();
        expect(sessionStorage.getItem('temp_data')).toBeNull();
        expect(sessionStorage.getItem('keep_this')).toBe('yes');
    });
});
