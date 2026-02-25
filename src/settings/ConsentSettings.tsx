import type { ReactNode } from 'react';
import { useConsent } from '../useConsent';
import { useConsentActions } from '../useConsentActions';
import { useSelectedServices } from './useSelectedServices';
import { ServiceItem } from './ServiceItem';
import type { ConsentSettingsModalLabels } from '../ConsentContext';

interface ConsentSettingsProps {
    onClose: () => void;
    modal?: ConsentSettingsModalLabels;
}

export function ConsentSettings({ onClose, modal }: ConsentSettingsProps) {
    const { services } = useConsent();
    const { approveSelected, declineAll } = useConsentActions();
    const { selectedIds, toggleService } = useSelectedServices();

    const handleApprove = () => {
        approveSelected(selectedIds);
        onClose();
    };

    const handleDecline = () => {
        declineAll();
        onClose();
    };

    const titleContent: ReactNode = modal?.title ?? 'Cookie Settings';
    const approveLabel: ReactNode = modal?.approve ?? 'Save Selection';
    const declineLabel: ReactNode = modal?.decline ?? 'Decline All';
    const closeLabel: ReactNode = modal?.close ?? 'Close';

    return (
        <div className="rcc-settings" role="dialog" aria-modal="true" aria-labelledby="rcc-settings-title">
            <div className="rcc-settings__content">
                <header className="rcc-settings__header">
                    <h2 id="rcc-settings-title" className="rcc-settings__title">{titleContent}</h2>
                    <button
                        type="button"
                        className="rcc-settings__close"
                        onClick={onClose}
                        aria-label="Close settings"
                    >
                        {closeLabel}
                    </button>
                </header>

                <main className="rcc-settings__body">
                    {services.map((service) => (
                        <ServiceItem
                            key={service.id}
                            serviceId={service.id}
                            name={service.name}
                            description={service.description}
                            mandatory={service.mandatory}
                            onChange={toggleService}
                        />
                    ))}
                </main>

                <footer className="rcc-settings__footer">
                    <button
                        type="button"
                        className="rcc-settings__btn rcc-settings__btn--secondary"
                        onClick={handleDecline}
                    >
                        {declineLabel}
                    </button>
                    <button
                        type="button"
                        className="rcc-settings__btn rcc-settings__btn--primary"
                        onClick={handleApprove}
                    >
                        {approveLabel}
                    </button>
                </footer>
            </div>
        </div>
    );
}
