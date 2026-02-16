import type { ReactNode } from 'react';
import { useConsent } from '../useConsent';
import { useConsentActions } from '../useConsentActions';
import { ConsentSettings } from '../settings/ConsentSettings';
import type { ConsentSettingsModalLabels } from '../ConsentContext';

export interface ConsentPopupProps {
    children?: ReactNode;
    settings?: {
        hidden?: boolean;
        label?: string | ReactNode;
        modal?: ConsentSettingsModalLabels;
    };
    decline?: {
        hidden?: boolean;
        label?: string | ReactNode;
    };
    approve?: {
        label?: string | ReactNode;
    };
}

export function ConsentPopup({ children, settings, decline, approve }: ConsentPopupProps) {
    const { isPopupVisible, isSettingsVisible, toggleSettings, theme } = useConsent();
    const { approveAll, declineAll } = useConsentActions();

    if (!isPopupVisible) {
        return null;
    }

    if (isSettingsVisible) {
        return (
            <div className="rcc-popup" data-theme={theme}>
                <ConsentSettings
                    onClose={toggleSettings}
                    modal={settings?.modal}
                />
            </div>
        );
    }

    const settingsLabel: ReactNode = settings?.label ?? 'Settings';
    const declineLabel: ReactNode = decline?.label ?? 'Decline';
    const approveLabel: ReactNode = approve?.label ?? 'Accept All';

    return (
        <div className="rcc-popup" data-theme={theme}>
            <div className="rcc-popup__card" role="dialog" aria-modal="true" aria-label="Cookie consent">
                <div className="rcc-popup__message">
                    {children ?? 'This website uses cookies to improve your experience.'}
                </div>

                <div className="rcc-popup__actions">
                    {!settings?.hidden && (
                        <button
                            type="button"
                            className="rcc-popup__btn rcc-popup__btn--secondary"
                            onClick={toggleSettings}
                        >
                            {settingsLabel}
                        </button>
                    )}
                    {!decline?.hidden && (
                        <button
                            type="button"
                            className="rcc-popup__btn rcc-popup__btn--secondary"
                            onClick={declineAll}
                        >
                            {declineLabel}
                        </button>
                    )}
                    <button
                        type="button"
                        className="rcc-popup__btn rcc-popup__btn--primary"
                        onClick={approveAll}
                    >
                        {approveLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
