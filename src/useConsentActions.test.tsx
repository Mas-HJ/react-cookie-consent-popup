import { renderHook, act } from '@testing-library/react';
import { type ReactNode } from 'react';
import { ConsentProvider } from './ConsentProvider';
import { useConsent } from './useConsent';
import { useConsentActions } from './useConsentActions';
import type { ConsentOptions } from './ConsentContext';

const testOptions: ConsentOptions = {
    services: [
        { id: 'analytics', name: 'Analytics' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'essential', name: 'Essential', mandatory: true },
    ],
};

function createWrapper(options: ConsentOptions) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return <ConsentProvider options={options}>{children}</ConsentProvider>;
    };
}

describe('useConsentActions', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('approveAll consents to all services and hides popup', () => {
        const { result } = renderHook(
            () => ({ actions: useConsentActions(), consent: useConsent() }),
            { wrapper: createWrapper(testOptions) }
        );

        act(() => {
            result.current.actions.approveAll();
        });

        expect(result.current.consent.consent).toEqual(['analytics', 'marketing', 'essential']);
        expect(result.current.consent.isPopupVisible).toBe(false);
    });

    it('declineAll keeps only mandatory services and hides popup', () => {
        const { result } = renderHook(
            () => ({ actions: useConsentActions(), consent: useConsent() }),
            { wrapper: createWrapper(testOptions) }
        );

        act(() => {
            result.current.actions.declineAll();
        });

        expect(result.current.consent.consent).toEqual(['essential']);
        expect(result.current.consent.isPopupVisible).toBe(false);
    });

    it('approveSelected consents to specific services', () => {
        const { result } = renderHook(
            () => ({ actions: useConsentActions(), consent: useConsent() }),
            { wrapper: createWrapper(testOptions) }
        );

        act(() => {
            result.current.actions.approveSelected(['analytics', 'essential']);
        });

        expect(result.current.consent.consent).toEqual(['analytics', 'essential']);
        expect(result.current.consent.isPopupVisible).toBe(false);
    });
});
