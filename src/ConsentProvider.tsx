import type { ReactNode } from 'react';
import { ConsentContext, type ConsentOptions } from './ConsentContext';
import { useConsentState } from './useConsentState';

interface ConsentProviderProps {
    options: ConsentOptions;
    children: ReactNode;
}

export function ConsentProvider({ options, children }: ConsentProviderProps) {
    const state = useConsentState(options);

    return (
        <ConsentContext.Provider value={state}>
            {children}
        </ConsentContext.Provider>
    );
}
