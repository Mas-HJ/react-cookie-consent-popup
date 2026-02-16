import { useState } from 'react';
import {
    ConsentPopup,
    ConsentProvider,
    useConsent,
    type Theme,
    type ConsentService,
} from 'react-cookie-consent-popup';
import 'react-cookie-consent-popup/dist/styles/style.css';

const services: ConsentService[] = [
    {
        id: 'essential',
        name: 'Essential Cookies',
        description: 'Required for the website to function properly. These cannot be disabled.',
        mandatory: true,
    },
    {
        id: 'analytics',
        name: 'Google Analytics',
        description: 'Helps us understand how visitors interact with our site by collecting anonymous usage data.',
    },
    {
        id: 'marketing',
        name: 'Marketing & Ads',
        description: 'Used to deliver personalized advertisements and measure campaign effectiveness.',
    },
    {
        id: 'preferences',
        name: 'Preference Cookies',
        description: 'Remember your settings and preferences like language and region.',
    },
];

function ConsentStatus() {
    const { consent, services, showPopup } = useConsent();

    return (
        <div style={{ textAlign: 'left', width: '100%', maxWidth: 520 }}>
            <h3 style={{ marginBottom: 12, fontSize: 16 }}>Current Consent Status</h3>
            <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                {services.map((s, i) => (
                    <div
                        key={s.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px',
                            borderBottom: i < services.length - 1 ? '1px solid var(--border)' : 'none',
                        }}
                    >
                        <div>
                            <strong>{s.name}</strong>
                            {s.mandatory && (
                                <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.6, fontWeight: 400 }}>
                                    (required)
                                </span>
                            )}
                        </div>
                        <span
                            style={{
                                padding: '4px 10px',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 600,
                                background: consent.includes(s.id) ? '#dcfce7' : '#fef2f2',
                                color: consent.includes(s.id) ? '#166534' : '#991b1b',
                            }}
                        >
                            {consent.includes(s.id) ? 'Accepted' : 'Declined'}
                        </span>
                    </div>
                ))}
            </div>
            <button onClick={showPopup} className="demo-btn demo-btn--primary" style={{ marginTop: 20 }}>
                Manage Cookie Preferences
            </button>
        </div>
    );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
    return (
        <div
            style={{
                padding: '16px 20px',
                border: '1px solid var(--border)',
                borderRadius: 8,
                textAlign: 'left',
            }}
        >
            <strong style={{ fontSize: 14 }}>{title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 13, opacity: 0.7, lineHeight: 1.5 }}>{description}</p>
        </div>
    );
}

function DemoContent({ theme, onThemeChange }: { theme: Theme; onThemeChange: (t: Theme) => void }) {
    const [settingsHidden, setSettingsHidden] = useState(false);
    const [declineHidden, setDeclineHidden] = useState(false);
    const [approveLabel, setApproveLabel] = useState('Accept All');
    const [declineLabel, setDeclineLabel] = useState('Decline All');
    const [settingsLabel, setSettingsLabel] = useState('Customize');
    const [message, setMessage] = useState(
        'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.'
    );

    return (
        <>
            <div
                style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    minHeight: '100vh',
                    padding: '40px 20px',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    transition: 'background 0.3s, color 0.3s',
                }}
            >
                <div style={{ maxWidth: 640, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <h1 style={{ fontSize: 28, marginBottom: 4 }}>react-cookie-consent-popup</h1>
                        <p style={{ opacity: 0.6, fontSize: 14 }}>Interactive Demo</p>
                    </div>

                    {/* Theme Toggle */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 12,
                            marginBottom: 32,
                        }}
                    >
                        <span style={{ fontSize: 14, fontWeight: 600 }}>Theme:</span>
                        <button
                            onClick={() => onThemeChange('light')}
                            className={`demo-btn ${theme === 'light' ? 'demo-btn--primary' : 'demo-btn--secondary'}`}
                        >
                            Light
                        </button>
                        <button
                            onClick={() => onThemeChange('dark')}
                            className={`demo-btn ${theme === 'dark' ? 'demo-btn--primary' : 'demo-btn--secondary'}`}
                        >
                            Dark
                        </button>
                    </div>

                    {/* Consent Status */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40 }}>
                        <ConsentStatus />
                    </div>

                    {/* Popup Customization */}
                    <div style={{ marginBottom: 40 }}>
                        <h3 style={{ fontSize: 16, marginBottom: 16 }}>Customize Popup</h3>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
                                <label style={{ fontSize: 13 }}>
                                    <span style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>
                                        Approve Button Label
                                    </span>
                                    <input
                                        type="text"
                                        value={approveLabel}
                                        onChange={(e) => setApproveLabel(e.target.value)}
                                        className="demo-input"
                                    />
                                </label>
                                <label style={{ fontSize: 13 }}>
                                    <span style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>
                                        Decline Button Label
                                    </span>
                                    <input
                                        type="text"
                                        value={declineLabel}
                                        onChange={(e) => setDeclineLabel(e.target.value)}
                                        className="demo-input"
                                    />
                                </label>
                            </div>
                            <label style={{ fontSize: 13 }}>
                                <span style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>
                                    Settings Button Label
                                </span>
                                <input
                                    type="text"
                                    value={settingsLabel}
                                    onChange={(e) => setSettingsLabel(e.target.value)}
                                    className="demo-input"
                                />
                            </label>
                            <label style={{ fontSize: 13 }}>
                                <span style={{ display: 'block', marginBottom: 4, fontWeight: 600 }}>
                                    Consent Message
                                </span>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className="demo-input"
                                    style={{ resize: 'vertical' }}
                                />
                            </label>
                            <div style={{ display: 'flex', gap: 20, fontSize: 13 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={settingsHidden}
                                        onChange={(e) => setSettingsHidden(e.target.checked)}
                                    />
                                    <span>Hide Settings Button</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={declineHidden}
                                        onChange={(e) => setDeclineHidden(e.target.checked)}
                                    />
                                    <span>Hide Decline Button</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 style={{ fontSize: 16, marginBottom: 16 }}>Features</h3>
                        <div style={{ display: 'grid', gap: 8 }}>
                            <FeatureCard
                                title="Service Management"
                                description="Define services with scripts, cookies, localStorage, and sessionStorage items. Scripts are loaded/unloaded automatically based on consent."
                            />
                            <FeatureCard
                                title="Hash-Based Invalidation"
                                description="Consent is persisted in localStorage with a hash of your config. Change services and the popup reappears automatically."
                            />
                            <FeatureCard
                                title="Settings Modal"
                                description="Built-in settings modal with per-service toggles. Mandatory services cannot be disabled."
                            />
                            <FeatureCard
                                title="Light & Dark Themes"
                                description="Toggle between light and dark themes. Uses CSS custom properties for easy customization."
                            />
                            <FeatureCard
                                title="Fully Customizable Labels"
                                description="Every button label and modal text can be customized via props. Use strings or React nodes."
                            />
                            <FeatureCard
                                title="useConsent() Hook"
                                description="Access consent state from any component. Check consent, show/hide popup, and manage preferences programmatically."
                            />
                        </div>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: 40, fontSize: 12, opacity: 0.4 }}>
                        react-cookie-consent-popup
                    </p>
                </div>
            </div>

            <ConsentPopup
                settings={{
                    hidden: settingsHidden,
                    label: settingsLabel,
                    modal: {
                        title: 'Cookie Preferences',
                        approve: 'Save My Choices',
                        decline: 'Reject All',
                    },
                }}
                decline={{ hidden: declineHidden, label: declineLabel }}
                approve={{ label: approveLabel }}
            >
                {message}
            </ConsentPopup>
        </>
    );
}

export function App() {
    const [theme, setTheme] = useState<Theme>('light');

    return (
        <ConsentProvider options={{ services, theme }} key={theme}>
            <style>{`
                :root {
                    --bg: ${theme === 'light' ? '#f8f9fa' : '#0f0f1a'};
                    --text: ${theme === 'light' ? '#1a1a2e' : '#e8e8e8'};
                    --border: ${theme === 'light' ? '#e5e7eb' : '#2a2a3a'};
                    --input-bg: ${theme === 'light' ? '#ffffff' : '#1e1e2e'};
                }
                * { box-sizing: border-box; }
                body { margin: 0; }
                .demo-btn {
                    padding: 8px 18px;
                    border-radius: 6px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    border: 2px solid #2563eb;
                    font-family: inherit;
                    transition: all 0.2s;
                }
                .demo-btn--primary {
                    background: #2563eb;
                    color: #fff;
                }
                .demo-btn--secondary {
                    background: transparent;
                    color: #2563eb;
                }
                .demo-btn--primary:hover { filter: brightness(1.1); }
                .demo-btn--secondary:hover { background: #2563eb; color: #fff; }
                .demo-input {
                    width: 100%;
                    padding: 8px 12px;
                    border: 1px solid var(--border);
                    border-radius: 6px;
                    background: var(--input-bg);
                    color: var(--text);
                    font-size: 13px;
                    font-family: inherit;
                }
                .demo-input:focus {
                    outline: none;
                    border-color: #2563eb;
                }
            `}</style>
            <DemoContent theme={theme} onThemeChange={setTheme} />
        </ConsentProvider>
    );
}
