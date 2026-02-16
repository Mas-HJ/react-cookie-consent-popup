import { ELEMENT_ID_PREFIX } from '../../config';
import type { ConsentScript } from '../../ConsentContext';
import { isExternalScript, isInlineScript } from './type-guards';
import { loadExternalScript } from './add/external-script';
import { loadInlineScript } from './add/inline-script';

function buildElementId(serviceId: string, scriptId: string): string {
    return `${ELEMENT_ID_PREFIX}-${serviceId}-${scriptId}`;
}

export function loadScripts(serviceId: string, scripts: ConsentScript[]): void {
    for (const script of scripts) {
        const elementId = buildElementId(serviceId, script.id);

        if (document.getElementById(elementId)) {
            continue;
        }

        if (isExternalScript(script)) {
            loadExternalScript(elementId, script.src);
        } else if (isInlineScript(script)) {
            loadInlineScript(elementId, script.code);
        }
    }
}
