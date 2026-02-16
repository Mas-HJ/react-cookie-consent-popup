import { ConsentPopup, ConsentProvider, useConsent } from 'react-cookie-consent-popup';
import 'react-cookie-consent-popup/dist/styles/style.css';

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
        description: 'Helps us understand how visitors interact with our site.',
    },
    {
        id: 'marketing',
        name: 'Marketing & Ads',
        description: 'Used to deliver personalized advertisements.',
    },
];

function ConsentStatus() {
    const { consent, services, showPopup } = useConsent();

    return (
        <div style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto' }}>
            <h3 style={{ marginBottom: 12 }}>Consent Status</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {services.map((s) => (
                    <li key={s.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                        <strong>{s.name}</strong>
                        <span style={{ float: 'right' }}>
                            {consent.includes(s.id) ? 'Accepted' : 'Not accepted'}
                        </span>
                    </li>
                ))}
            </ul>
            <button
                onClick={showPopup}
                style={{
                    marginTop: 20,
                    padding: '10px 24px',
                    border: '2px solid #2563eb',
                    borderRadius: 6,
                    background: 'transparent',
                    color: '#2563eb',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}
            >
                Manage Cookie Preferences
            </button>
        </div>
    );
}

export function App() {
    return (
        <ConsentProvider options={{ services, theme: 'light' }}>
            <div style={{ fontFamily: 'system-ui, sans-serif', padding: '60px 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: 28, marginBottom: 8 }}>react-cookie-consent-popup</h1>
                <p style={{ color: '#666', marginBottom: 40 }}>
                    A centered popup-style cookie consent dialog for React.
                </p>
                <ConsentStatus />
            </div>
            <ConsentPopup
                settings={{
                    label: 'Customize',
                    modal: {
                        title: 'Cookie Preferences',
                        approve: 'Save My Choices',
                        decline: 'Reject All',
                    },
                }}
                decline={{ label: 'Decline All' }}
                approve={{ label: 'Accept All' }}
            >
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                By clicking "Accept All", you consent to our use of cookies.
            </ConsentPopup>
        </ConsentProvider>
    );
}
