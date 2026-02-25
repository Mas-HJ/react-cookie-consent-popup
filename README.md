# react-cookie-consent-popup

[![npm version](https://img.shields.io/npm/v/react-cookie-consent-popup)](https://www.npmjs.com/package/react-cookie-consent-popup)
[![npm package size](https://img.shields.io/npm/unpacked-size/react-cookie-consent-popup)](https://www.npmjs.com/package/react-cookie-consent-popup)
[![npm downloads](https://img.shields.io/npm/dw/react-cookie-consent-popup)](https://www.npmjs.com/package/react-cookie-consent-popup)
[![CI](https://github.com/Mas-HJ/react-cookie-consent-popup/actions/workflows/ci.yml/badge.svg)](https://github.com/Mas-HJ/react-cookie-consent-popup/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/react-cookie-consent-popup)](https://github.com/Mas-HJ/react-cookie-consent-popup/blob/main/LICENSE)

A **zero-dependency** React cookie consent popup with GDPR-compliant service management, automatic script loading, storage cleanup, and light/dark themes.

## Features

- **Zero runtime dependencies** — only React as a peer dependency
- **Service management** — define scripts, cookies, localStorage and sessionStorage per service
- **Automatic cleanup** — scripts, cookies and storage are removed when consent is revoked
- **Hash-based invalidation** — popup reappears automatically when your service config changes
- **Settings modal** — per-service toggles with mandatory service support
- **Light & dark themes** — built-in themes with full CSS custom property support
- **Accessible** — focus trapping, keyboard navigation, `Escape` to close, ARIA labels
- **SSR compatible** — works with Next.js, Remix, and other server-rendered frameworks
- **Fully typed** — written in strict TypeScript with exported types
- **Tiny footprint** — ~8 KB minified (JS + CSS)

---

### Live Demo

> **Try it out instantly!**
>
> [![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/Mas-HJ/react-cookie-consent-popup/tree/main?file=/demo/src/App.tsx)

---

## Installation

```bash
npm install react-cookie-consent-popup
# or
yarn add react-cookie-consent-popup
```

## Quick Start

```tsx
import { ConsentPopup, ConsentProvider } from 'react-cookie-consent-popup';
import 'react-cookie-consent-popup/styles';

const services = [
    {
        id: 'essential',
        name: 'Essential Cookies',
        description: 'Required for the website to function properly.',
        mandatory: true,
    },
    {
        id: 'analytics',
        name: 'Google Analytics',
        description: 'Helps us understand how visitors use our site.',
        scripts: [
            { id: 'gtag', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX' },
            {
                id: 'gtag-init',
                code: `window.dataLayer = window.dataLayer || [];
                       function gtag(){dataLayer.push(arguments);}
                       gtag('js', new Date());
                       gtag('config', 'G-XXXXXXX');`,
            },
        ],
        cookies: [{ pattern: /^_ga/ }],
    },
    {
        id: 'marketing',
        name: 'Marketing',
        description: 'Used to deliver personalized advertisements.',
        scripts: [
            { id: 'fb-pixel', src: 'https://connect.facebook.net/en_US/fbevents.js' },
        ],
        cookies: [{ pattern: '_fbp' }],
        localStorage: ['fb_tracking_data'],
        sessionStorage: ['fb_session'],
    },
];

function App() {
    return (
        <ConsentProvider
            options={{
                services,
                theme: 'light',
                onConsentChange: (consent) => console.log('Consent updated:', consent),
            }}
        >
            <main>
                <h1>My Website</h1>
            </main>
            <ConsentPopup
                settings={{ label: 'Customize' }}
                decline={{ label: 'Decline' }}
                approve={{ label: 'Accept All' }}
            >
                We use cookies to enhance your browsing experience and analyze site traffic.
            </ConsentPopup>
        </ConsentProvider>
    );
}
```

## API

### `<ConsentProvider>`

Wraps your application and provides consent state to all child components.

| Prop       | Type             | Description                      |
|------------|------------------|----------------------------------|
| `options`  | `ConsentOptions` | Configuration object (see below) |
| `children` | `ReactNode`      | Your application                 |

#### `ConsentOptions`

| Field              | Type                          | Required | Description                                                                                                       |
|--------------------|-------------------------------|----------|-------------------------------------------------------------------------------------------------------------------|
| `services`         | `ConsentService[]`            | Yes      | Array of services requiring consent                                                                               |
| `theme`            | `'light' \| 'dark'`           | No       | Color theme (default: `'light'`)                                                                                  |
| `customHash`       | `string`                      | No       | Override the auto-generated config hash. When this changes, stored consent is invalidated and the popup reappears |
| `onConsentChange`  | `(consent: string[]) => void` | No       | Callback fired whenever consent changes. Receives the array of consented service IDs                             |

#### `ConsentService`

| Field            | Type               | Required | Description                                          |
|------------------|--------------------|----------|------------------------------------------------------|
| `id`             | `string`           | Yes      | Unique identifier                                    |
| `name`           | `string`           | Yes      | Display name shown in the settings modal             |
| `description`    | `string`           | No       | Description shown in the settings modal              |
| `scripts`        | `ConsentScript[]`  | No       | Scripts to load when consent is given                |
| `cookies`        | `CookiePattern[]`  | No       | Cookies to clear when consent is revoked             |
| `localStorage`   | `string[]`         | No       | localStorage keys to clear when consent is revoked   |
| `sessionStorage` | `string[]`         | No       | sessionStorage keys to clear when consent is revoked |
| `mandatory`      | `boolean`          | No       | If `true`, this service cannot be toggled off        |

#### `ConsentScript`

Either an external script or inline code:

```ts
// External script
const external: ExternalScript = { id: 'gtag', src: 'https://www.googletagmanager.com/gtag/js' };

// Inline script
const inline: InlineScript = { id: 'init', code: 'console.log("initialized")' };
```

### `<ConsentPopup>`

The centered popup dialog that appears over a semi-transparent backdrop.

| Prop               | Type                         | Description                                              |
|--------------------|------------------------------|----------------------------------------------------------|
| `children`         | `ReactNode`                  | Custom consent message (default: generic cookie message) |
| `settings`         | `object`                     | Settings button config                                   |
| `settings.hidden`  | `boolean`                    | Hide the settings button                                 |
| `settings.label`   | `ReactNode`                  | Button label (default: `'Settings'`)                     |
| `settings.modal`   | `ConsentSettingsModalLabels` | Customize the settings modal labels                      |
| `decline`          | `object`                     | Decline button config                                    |
| `decline.hidden`   | `boolean`                    | Hide the decline button                                  |
| `decline.label`    | `ReactNode`                  | Button label (default: `'Decline'`)                      |
| `approve`          | `object`                     | Approve button config                                    |
| `approve.label`    | `ReactNode`                  | Button label (default: `'Accept All'`)                   |

#### `ConsentSettingsModalLabels`

| Field     | Type        | Default              |
|-----------|-------------|----------------------|
| `title`   | `ReactNode` | `'Cookie Settings'`  |
| `approve` | `ReactNode` | `'Save Selection'`   |
| `decline` | `ReactNode` | `'Decline All'`      |
| `close`   | `ReactNode` | `'Close'`            |

### `useConsent()` Hook

Access consent state from any component inside `<ConsentProvider>`.

```tsx
import { useConsent } from 'react-cookie-consent-popup';

function MyComponent() {
    const {
        consent,          // string[] — IDs of consented services
        services,         // ConsentService[] — all configured services
        theme,            // 'light' | 'dark'
        isPopupVisible,   // boolean
        isSettingsVisible,// boolean
        setConsent,       // (serviceIds: string[]) => void
        hasConsent,       // (serviceId: string) => boolean
        showPopup,        // () => void
        hidePopup,        // () => void
        toggleSettings,   // () => void
    } = useConsent();

    return (
        <button onClick={showPopup}>
            Manage Cookie Preferences
        </button>
    );
}
```

## Hash-Based Invalidation

Consent is persisted in `localStorage`. A hash is computed from your service configuration (`id` and `name` fields). If you add, remove, or rename services, the hash changes automatically and the popup will reappear, prompting users to re-consent.

You can also force re-consent by providing a `customHash`:

```tsx
<ConsentProvider options={{ services, customHash: 'v2' }}>
```

## Themes

Supports `'light'` and `'dark'` themes out of the box via CSS custom properties. The theme is applied via a `data-theme` attribute on the popup container.

```tsx
<ConsentProvider options={{ services, theme: 'dark' }}>
```

### Custom Theme

Override any CSS variable to match your brand:

```css
[data-theme='light'] {
    --rcc-text: #1a1a2e;
    --rcc-bg: #ffffff;
    --rcc-backdrop: rgb(0 0 0 / 45%);
    --rcc-border: #e0e0e0;
    --rcc-btn-primary-bg: #2563eb;
    --rcc-btn-primary-text: #ffffff;
    --rcc-btn-secondary-bg: transparent;
    --rcc-btn-secondary-text: #2563eb;
    --rcc-btn-secondary-border: #2563eb;
    --rcc-scrollbar-track: #f0f0f0;
    --rcc-scrollbar-thumb: #c0c0c0;
}
```

## Accessibility

The popup and settings modal include:

- **Focus trapping** — Tab and Shift+Tab cycle within the modal
- **Escape key** — closes the settings modal
- **Focus restoration** — returns focus to the previously focused element on close
- **ARIA attributes** — `role="dialog"`, `aria-modal`, `aria-labelledby` on both modals
- **Keyboard-friendly toggles** — custom toggle switches with focus-visible outlines

## SSR / Next.js

All browser API access (`document`, `window`, `localStorage`, `sessionStorage`) is guarded with runtime checks. The library works out of the box with Next.js, Remix, Gatsby, and other server-rendered React frameworks.

## Development

```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Run tests in watch mode
yarn test:dev

# Build for production
yarn build

# Build in watch mode
yarn dev

# Run tests with coverage
yarn coverage
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

MIT
