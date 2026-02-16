import { render, screen, act } from '@testing-library/react';
import { ConsentProvider } from './ConsentProvider';
import { useConsent } from './useConsent';
import type { ConsentOptions } from './ConsentContext';

const testOptions: ConsentOptions = {
    services: [
        { id: 'analytics', name: 'Analytics' },
        { id: 'marketing', name: 'Marketing' },
    ],
    theme: 'dark',
};

function TestConsumer() {
    const ctx = useConsent();
    return (
        <div>
            <span data-testid="theme">{ctx.theme}</span>
            <span data-testid="popup-visible">{String(ctx.isPopupVisible)}</span>
            <span data-testid="consent-count">{ctx.consent.length}</span>
            <button onClick={ctx.showPopup}>show</button>
            <button onClick={ctx.hidePopup}>hide</button>
        </div>
    );
}

describe('ConsentProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('provides theme from options', () => {
        render(
            <ConsentProvider options={testOptions}>
                <TestConsumer />
            </ConsentProvider>
        );

        expect(screen.getByTestId('theme').textContent).toBe('dark');
    });

    it('shows popup when no stored consent', () => {
        render(
            <ConsentProvider options={testOptions}>
                <TestConsumer />
            </ConsentProvider>
        );

        expect(screen.getByTestId('popup-visible').textContent).toBe('true');
    });

    it('allows toggling popup visibility', () => {
        render(
            <ConsentProvider options={testOptions}>
                <TestConsumer />
            </ConsentProvider>
        );

        act(() => {
            screen.getByText('hide').click();
        });
        expect(screen.getByTestId('popup-visible').textContent).toBe('false');

        act(() => {
            screen.getByText('show').click();
        });
        expect(screen.getByTestId('popup-visible').textContent).toBe('true');
    });
});
