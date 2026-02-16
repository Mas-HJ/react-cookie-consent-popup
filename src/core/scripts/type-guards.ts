import type { ConsentScript, ExternalScript, InlineScript } from '../../ConsentContext';

export function isExternalScript(script: ConsentScript): script is ExternalScript {
    return 'src' in script;
}

export function isInlineScript(script: ConsentScript): script is InlineScript {
    return 'code' in script;
}
