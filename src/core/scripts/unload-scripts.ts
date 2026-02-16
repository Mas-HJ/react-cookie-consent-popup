import { ELEMENT_ID_PREFIX } from '../../config';
import type { ConsentScript } from '../../ConsentContext';

export function unloadScripts(serviceId: string, scripts: ConsentScript[]): void {
    for (const script of scripts) {
        const elementId = `${ELEMENT_ID_PREFIX}-${serviceId}-${script.id}`;
        const element = document.getElementById(elementId);
        if (element) {
            element.remove();
        }
    }
}
