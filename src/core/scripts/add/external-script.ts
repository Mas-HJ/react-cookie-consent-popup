export function loadExternalScript(elementId: string, src: string): void {
    const script = document.createElement('script');
    script.id = elementId;
    script.src = src;
    script.async = true;
    document.body.appendChild(script);
}
