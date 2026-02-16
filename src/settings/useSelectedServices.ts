import { useState, useCallback } from 'react';
import { useConsent } from '../useConsent';

export function useSelectedServices() {
    const { consent, services } = useConsent();

    const [selectedIds, setSelectedIds] = useState<string[]>(() => {
        // Start with current consent + any mandatory services
        const mandatory = services.filter((s) => s.mandatory).map((s) => s.id);
        return [...new Set([...consent, ...mandatory])];
    });

    const toggleService = useCallback((serviceId: string, enabled: boolean) => {
        setSelectedIds((prev) =>
            enabled ? [...prev, serviceId] : prev.filter((id) => id !== serviceId)
        );
    }, []);

    return { selectedIds, toggleService };
}
