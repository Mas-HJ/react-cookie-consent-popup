import { render, screen } from '@testing-library/react';
import { ConsentProvider } from '../ConsentProvider';
import { ServiceItem } from './ServiceItem';
import type { ConsentOptions } from '../ConsentContext';

const testOptions: ConsentOptions = {
    services: [
        { id: 'analytics', name: 'Analytics' },
    ],
};

function renderItem(props: React.ComponentProps<typeof ServiceItem>, options?: ConsentOptions) {
    return render(
        <ConsentProvider options={options ?? testOptions}>
            <ServiceItem {...props} />
        </ConsentProvider>
    );
}

describe('ServiceItem', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders the service name', () => {
        renderItem({ serviceId: 'analytics', name: 'Analytics', onChange: jest.fn() });

        expect(screen.getByText('Analytics')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
        renderItem({
            serviceId: 'analytics',
            name: 'Analytics',
            description: 'Tracks usage data',
            onChange: jest.fn(),
        });

        expect(screen.getByText('Tracks usage data')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
        const { container } = renderItem({
            serviceId: 'analytics',
            name: 'Analytics',
            onChange: jest.fn(),
        });

        expect(container.querySelector('.rcc-settings__item__description')).toBeNull();
    });

    it('renders a toggle with correct aria-label', () => {
        renderItem({ serviceId: 'analytics', name: 'Analytics', onChange: jest.fn() });

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByLabelText('Toggle Analytics')).toBeInTheDocument();
    });
});
