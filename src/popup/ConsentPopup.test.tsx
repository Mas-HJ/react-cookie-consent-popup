import { render, screen, act } from '@testing-library/react';
import { ConsentProvider } from '../ConsentProvider';
import { ConsentPopup } from './ConsentPopup';
import type { ConsentOptions } from '../ConsentContext';

const testOptions: ConsentOptions = {
    services: [
        { id: 'analytics', name: 'Analytics', description: 'Web analytics' },
        { id: 'marketing', name: 'Marketing' },
    ],
    theme: 'light',
};

function renderPopup(popupProps?: React.ComponentProps<typeof ConsentPopup>, options?: ConsentOptions) {
    return render(
        <ConsentProvider options={options ?? testOptions}>
            <ConsentPopup {...popupProps} />
        </ConsentProvider>
    );
}

describe('ConsentPopup', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders with default message when no children provided', () => {
        renderPopup();

        expect(screen.getByText('This website uses cookies to improve your experience.')).toBeInTheDocument();
    });

    it('renders custom message from children', () => {
        renderPopup({ children: 'We need your consent for cookies.' });

        expect(screen.getByText('We need your consent for cookies.')).toBeInTheDocument();
    });

    it('renders all three buttons by default', () => {
        renderPopup();

        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Decline')).toBeInTheDocument();
        expect(screen.getByText('Accept All')).toBeInTheDocument();
    });

    it('renders custom button labels', () => {
        renderPopup({
            settings: { label: 'More Options' },
            decline: { label: 'No Thanks' },
            approve: { label: 'Yes, Allow' },
        });

        expect(screen.getByText('More Options')).toBeInTheDocument();
        expect(screen.getByText('No Thanks')).toBeInTheDocument();
        expect(screen.getByText('Yes, Allow')).toBeInTheDocument();
    });

    it('hides settings button when settings.hidden is true', () => {
        renderPopup({ settings: { hidden: true } });

        expect(screen.queryByText('Settings')).not.toBeInTheDocument();
        expect(screen.getByText('Decline')).toBeInTheDocument();
    });

    it('hides decline button when decline.hidden is true', () => {
        renderPopup({ decline: { hidden: true } });

        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.queryByText('Decline')).not.toBeInTheDocument();
    });

    it('hides the popup after clicking Accept All', () => {
        renderPopup();

        act(() => {
            screen.getByText('Accept All').click();
        });

        expect(screen.queryByText('Accept All')).not.toBeInTheDocument();
    });

    it('hides the popup after clicking Decline', () => {
        renderPopup();

        act(() => {
            screen.getByText('Decline').click();
        });

        expect(screen.queryByText('Decline')).not.toBeInTheDocument();
    });

    it('shows settings modal when Settings button is clicked', () => {
        renderPopup();

        act(() => {
            screen.getByText('Settings').click();
        });

        expect(screen.getByText('Cookie Settings')).toBeInTheDocument();
        expect(screen.getByText('Analytics')).toBeInTheDocument();
    });

    it('applies the theme via data-theme attribute', () => {
        const { container } = renderPopup(undefined, { ...testOptions, theme: 'dark' });

        const popup = container.querySelector('.rcc-popup');
        expect(popup?.getAttribute('data-theme')).toBe('dark');
    });
});
