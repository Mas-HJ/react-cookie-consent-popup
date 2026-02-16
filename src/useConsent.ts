import { useContext } from 'react';
import { ConsentContext, type ConsentContextValue } from './ConsentContext';

export function useConsent(): ConsentContextValue {
    return useContext(ConsentContext);
}
