import type { ConsentService } from '../ConsentContext';
import { loadScripts } from './scripts/load-scripts';

export function activateServices(services: ConsentService[]): void {
    for (const service of services) {
        if (service.scripts?.length) {
            loadScripts(service.id, service.scripts);
        }
    }
}
