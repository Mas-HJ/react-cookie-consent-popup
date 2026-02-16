import { clearLocalStorageItems } from './clear-items';

describe('clearLocalStorageItems', () => {
    afterEach(() => {
        localStorage.clear();
    });

    it('removes specified keys from localStorage', () => {
        localStorage.setItem('tracker_data', 'abc');
        localStorage.setItem('user_pref', '123');
        localStorage.setItem('keep_me', 'yes');

        clearLocalStorageItems(['tracker_data', 'user_pref']);

        expect(localStorage.getItem('tracker_data')).toBeNull();
        expect(localStorage.getItem('user_pref')).toBeNull();
        expect(localStorage.getItem('keep_me')).toBe('yes');
    });
});
