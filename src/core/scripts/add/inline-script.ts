export function loadInlineScript(elementId: string, code: string): void {
    const script = document.createElement('script');
    script.id = elementId;
    script.innerHTML = code;
    document.body.appendChild(script);
}
