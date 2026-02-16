import type { ConsentService } from '../ConsentContext';
import { unloadScripts } from './scripts/unload-scripts';
import { clearCookies } from './cookies/clear-cookies';
import { clearLocalStorageItems } from './local-storage/clear-items';
import { clearSessionStorageItems } from './session-storage/clear-items';

export function deactivateServices(services: ConsentService[]): void {
    for (const service of services) {
        if (service.scripts?.length) {
            unloadScripts(service.id, service.scripts);
        }
        if (service.cookies?.length) {
            clearCookies(service.cookies);
        }
        if (service.localStorage?.length) {
            clearLocalStorageItems(service.localStorage);
        }
        if (service.sessionStorage?.length) {
            clearSessionStorageItems(service.sessionStorage);
        }
    }
}
