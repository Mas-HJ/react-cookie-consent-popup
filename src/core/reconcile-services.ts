import type { ConsentService } from '../ConsentContext';
import { activateServices } from './activate-services';
import { deactivateServices } from './deactivate-services';
import { persistConsent } from './local-storage/persist';

export function reconcileServices(
    allServices: ConsentService[],
    previousConsent: string[],
    nextConsent: string[],
    hash: string
): void {
    const added = allServices.filter(
        (s) => nextConsent.includes(s.id) && !previousConsent.includes(s.id)
    );
    const removed = allServices.filter(
        (s) => !nextConsent.includes(s.id) && previousConsent.includes(s.id)
    );

    deactivateServices(removed);
    activateServices(added);
    persistConsent(nextConsent, hash);
}
