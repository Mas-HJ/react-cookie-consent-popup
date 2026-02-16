import { render, screen, act } from '@testing-library/react';
import { ConsentProvider } from '../ConsentProvider';
import { ConsentSettings } from './ConsentSettings';
import type { ConsentOptions } from '../ConsentContext';

const testOptions: ConsentOptions = {
    services: [
        { id: 'analytics', name: 'Analytics', description: 'Web analytics service' },
        { id: 'marketing', name: 'Marketing' },
        { id: 'essential', name: 'Essential', mandatory: true },
    ],
};

function renderSettings(
    props?: Partial<React.ComponentProps<typeof ConsentSettings>>,
    options?: ConsentOptions
) {
    const onClose = props?.onClose ?? jest.fn();
    return render(
        <ConsentProvider options={options ?? testOptions}>
            <ConsentSettings onClose={onClose} modal={props?.modal} />
        </ConsentProvider>
    );
}

describe('ConsentSettings', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders default title', () => {
        renderSettings();

        expect(screen.getByText('Cookie Settings')).toBeInTheDocument();
    });

    it('renders all services', () => {
        renderSettings();

        expect(screen.getByText('Analytics')).toBeInTheDocument();
        expect(screen.getByText('Marketing')).toBeInTheDocument();
        expect(screen.getByText('Essential')).toBeInTheDocument();
    });

    it('renders service descriptions', () => {
        renderSettings();

        expect(screen.getByText('Web analytics service')).toBeInTheDocument();
    });

    it('renders default button labels', () => {
        renderSettings();

        expect(screen.getByText('Save Selection')).toBeInTheDocument();
        expect(screen.getByText('Decline All')).toBeInTheDocument();
        expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('renders custom modal labels', () => {
        renderSettings({
            modal: {
                title: 'Privacy Preferences',
                approve: 'Confirm',
                decline: 'Reject All',
                close: 'X',
            },
        });

        expect(screen.getByText('Privacy Preferences')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByText('Reject All')).toBeInTheDocument();
        expect(screen.getByText('X')).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = jest.fn();
        renderSettings({ onClose });

        act(() => {
            screen.getByText('Close').click();
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('has correct aria attributes for accessibility', () => {
        renderSettings();

        const dialog = screen.getByRole('dialog');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-label', 'Cookie Settings');
    });
});
