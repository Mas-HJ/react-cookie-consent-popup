export function loadInlineScript(elementId: string, code: string): void {
    if (typeof document === 'undefined') return;

    const script = document.createElement('script');
    script.id = elementId;
    script.innerHTML = code;
    document.body.appendChild(script);
}
