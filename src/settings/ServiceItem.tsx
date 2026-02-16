import Toggle from 'react-toggle';
import { useConsent } from '../useConsent';

interface ServiceItemProps {
    serviceId: string;
    name: string;
    description?: string;
    mandatory?: boolean;
    onChange: (serviceId: string, enabled: boolean) => void;
}

// Type workaround: react-toggle's types are slightly incompatible with strict React 18 JSX
const ToggleComponent = Toggle as unknown as React.ComponentType<{
    id?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    'aria-label'?: string;
}>;

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
            <ToggleComponent
                id={`rcc-toggle-${serviceId}`}
                defaultChecked={mandatory || hasConsent(serviceId)}
                disabled={mandatory}
                onChange={handleChange}
                aria-label={`Toggle ${name}`}
            />
        </div>
    );
}
