import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(active: boolean): React.RefObject<HTMLDivElement> {
    const containerRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!active || typeof document === 'undefined') return;

        previousFocusRef.current = document.activeElement as HTMLElement | null;

        // Focus the first focusable element inside the trap
        const container = containerRef.current;
        if (container) {
            const first = container.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
            first?.focus();
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key !== 'Tab' || !container) return;

            const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previousFocusRef.current?.focus();
        };
    }, [active]);

    return containerRef;
}
