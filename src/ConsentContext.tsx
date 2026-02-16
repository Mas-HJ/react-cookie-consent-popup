import { createContext, type ReactNode } from 'react';

// ── Service & Script Types ──────────────────────────────────────────

export interface ExternalScript {
    id: string;
    src: string;
}

export interface InlineScript {
    id: string;
    code: string;
}

export type ConsentScript = ExternalScript | InlineScript;

export interface CookiePattern {
    pattern: string | RegExp;
}

export interface ConsentService {
    id: string;
    name: string;
    description?: string;
    scripts?: ConsentScript[];
    cookies?: CookiePattern[];
    localStorage?: string[];
    sessionStorage?: string[];
    mandatory?: boolean;
}

// ── Options & Theme ─────────────────────────────────────────────────

export type Theme = 'light' | 'dark';

export interface ConsentOptions {
    services: ConsentService[];
    customHash?: string;
    theme?: Theme;
}

// ── Settings Modal Customization ────────────────────────────────────

export interface ConsentSettingsModalLabels {
    title?: string | ReactNode;
    approve?: string | ReactNode;
    decline?: string | ReactNode;
    close?: string | ReactNode;
}

// ── Context Value ───────────────────────────────────────────────────

export interface ConsentContextValue {
    consent: string[];
    services: ConsentService[];
    theme: Theme;
    isPopupVisible: boolean;
    isSettingsVisible: boolean;
    setConsent: (serviceIds: string[]) => void;
    hasConsent: (serviceId: string) => boolean;
    showPopup: () => void;
    hidePopup: () => void;
    toggleSettings: () => void;
}

const defaultValue: ConsentContextValue = {
    consent: [],
    services: [],
    theme: 'light',
    isPopupVisible: true,
    isSettingsVisible: false,
    setConsent: () => {},
    hasConsent: () => false,
    showPopup: () => {},
    hidePopup: () => {},
    toggleSettings: () => {},
};

export const ConsentContext = createContext<ConsentContextValue>(defaultValue);
