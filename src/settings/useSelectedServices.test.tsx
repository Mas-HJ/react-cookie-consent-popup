import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ConsentProvider } from '../ConsentProvider';
import { useSelectedServices } from './useSelectedServices';
import type { ConsentOptions } from '../ConsentContext';

const testOptions: ConsentOptions = {
    services: [
        { id: 'analytics', name: 'Analytics' },
        { id: 'essential', name: 'Essential', mandatory: true },
    ],
};

function createWrapper(options: ConsentOptions) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return <ConsentProvider options={options}>{children}</ConsentProvider>;
    };
}

describe('useSelectedServices', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('initializes with mandatory services selected', () => {
        const { result } = renderHook(() => useSelectedServices(), {
            wrapper: createWrapper(testOptions),
        });

        expect(result.current.selectedIds).toContain('essential');
    });

    it('toggleService adds a service when enabled', () => {
        const { result } = renderHook(() => useSelectedServices(), {
            wrapper: createWrapper(testOptions),
        });

        act(() => {
            result.current.toggleService('analytics', true);
        });

        expect(result.current.selectedIds).toContain('analytics');
    });

    it('toggleService removes a service when disabled', () => {
        const { result } = renderHook(() => useSelectedServices(), {
            wrapper: createWrapper(testOptions),
        });

        // First add it
        act(() => {
            result.current.toggleService('analytics', true);
        });
        expect(result.current.selectedIds).toContain('analytics');

        // Then remove it
        act(() => {
            result.current.toggleService('analytics', false);
        });
        expect(result.current.selectedIds).not.toContain('analytics');
    });
});
