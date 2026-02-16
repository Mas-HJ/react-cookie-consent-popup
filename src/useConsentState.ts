import { useState, useCallback, useEffect, useRef } from 'react';
import hash from 'object-hash';
import type { ConsentOptions } from './ConsentContext';
import { retrieveConsent } from './core/local-storage/retrieve';
import { reconcileServices } from './core/reconcile-services';
import { activateServices } from './core/activate-services';

function computeHash(options: ConsentOptions): string {
    if (options.customHash) {
        return options.customHash;
    }
    return hash(options.services.map((s) => ({ id: s.id, name: s.name })));
}

export function useConsentState(options: ConsentOptions) {
    const optionsHash = computeHash(options);
    const { services } = options;

    const [consent, setConsentState] = useState<string[]>(() => {
        const { consent: stored, isValid } = retrieveConsent(optionsHash);
        return isValid ? stored : [];
    });

    const [isPopupVisible, setIsPopupVisible] = useState(() => {
        const { isValid } = retrieveConsent(optionsHash);
        return !isValid;
    });

    const [isSettingsVisible, setIsSettingsVisible] = useState(false);

    const previousConsentRef = useRef<string[]>(consent);

    // On initial mount, activate services that already have consent
    useEffect(() => {
        const consentedServices = services.filter((s) => consent.includes(s.id));
        activateServices(consentedServices);
        // Only run on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setConsent = useCallback(
        (nextConsent: string[]) => {
            const prev = previousConsentRef.current;
            reconcileServices(services, prev, nextConsent, optionsHash);
            setConsentState(nextConsent);
            previousConsentRef.current = nextConsent;
        },
        [services, optionsHash]
    );

    const hasConsent = useCallback(
        (serviceId: string) => consent.includes(serviceId),
        [consent]
    );

    const showPopup = useCallback(() => setIsPopupVisible(true), []);
    const hidePopup = useCallback(() => setIsPopupVisible(false), []);
    const toggleSettings = useCallback(() => setIsSettingsVisible((v) => !v), []);

    return {
        consent,
        services,
        theme: options.theme ?? 'light' as const,
        isPopupVisible,
        isSettingsVisible,
        setConsent,
        hasConsent,
        showPopup,
        hidePopup,
        toggleSettings,
    };
}
