import { useConsent } from '../useConsent';

interface ServiceItemProps {
    serviceId: string;
    name: string;
    description?: string;
    mandatory?: boolean;
    onChange: (serviceId: string, enabled: boolean) => void;
}

export function ServiceItem({ serviceId, name, description, mandatory, onChange }: ServiceItemProps) {
    const { hasConsent } = useConsent();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(serviceId, e.target.checked);
    };

    return (
        <div className="rcc-settings__item">
            <div className="rcc-settings__item__info">
                <label htmlFor={`rcc-toggle-${serviceId}`} className="rcc-settings__item__name">
                    {name}
                </label>
                {description && (
                    <p className="rcc-settings__item__description">{description}</p>
                )}
            </div>
            <label className="rcc-toggle" aria-label={`Toggle ${name}`}>
                <input
                    type="checkbox"
                    id={`rcc-toggle-${serviceId}`}
                    className="rcc-toggle__input"
                    defaultChecked={mandatory || hasConsent(serviceId)}
                    disabled={mandatory}
                    onChange={handleChange}
                />
                <span className="rcc-toggle__track" />
            </label>
        </div>
    );
}
