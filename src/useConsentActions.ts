import { useCallback } from 'react';
import { useConsent } from './useConsent';

export function useConsentActions() {
    const { services, setConsent, hidePopup } = useConsent();

    const approveAll = useCallback(() => {
        setConsent(services.map((s) => s.id));
        hidePopup();
    }, [services, setConsent, hidePopup]);

    const approveSelected = useCallback(
        (serviceIds: string[]) => {
            setConsent(serviceIds);
            hidePopup();
        },
        [setConsent, hidePopup]
    );

    const declineAll = useCallback(() => {
        const mandatoryOnly = services.filter((s) => s.mandatory).map((s) => s.id);
        setConsent(mandatoryOnly);
        hidePopup();
    }, [services, setConsent, hidePopup]);

    return { approveAll, approveSelected, declineAll };
}
