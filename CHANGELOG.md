# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.1] - 2026-02-25

### Changed

- CI now tests on Node 20 and 22 LTS (dropped Node 18).
- README: added icons, moved Live Demo section above Features.

## [1.5.0] - 2026-02-25

### Added

- `onConsentChange` callback prop on `ConsentOptions` — fires whenever consent changes.
- Focus trapping inside popup and settings modals for improved keyboard navigation.
- `Escape` key closes the settings modal.
- `aria-labelledby` on popup and settings dialogs for better screen reader support.
- SSR/Next.js compatibility — all browser API access is guarded with `typeof window`/`typeof document` checks.
- `prepublishOnly` script ensures tests and build pass before publishing.
- GitHub Actions CI workflow (lint, test, build).
- `CHANGELOG.md` and `CONTRIBUTING.md`.
- `./styles` export path for cleaner CSS imports.

### Changed

- **Zero runtime dependencies** — removed `object-hash` (replaced with a simple djb2 hash) and `react-toggle` (replaced with a custom CSS toggle).
- Updated `exports` field in `package.json` with explicit `./styles` entry instead of catch-all `./dist/*`.
- Updated `.nvmrc` to Node 20 LTS.
- Added `zero-dependency` keyword to npm package.

### Removed

- `object-hash` dependency.
- `react-toggle` dependency.
- `@types/object-hash` and `@types/react-toggle` dev dependencies.

## [1.0.5] - 2026-01-15

### Fixed

- Replaced bundlephobia badge with npm size badges in README.

## [1.0.4] - 2026-01-15

### Changed

- Externalized `object-hash` and `react-toggle` in esbuild config to reduce bundle size.

## [1.0.3] - 2026-01-14

### Changed

- Updated README.md with improved documentation.

## [1.0.2] - 2026-01-14

### Fixed

- CodeSandbox demo runs from the demo directory.
- TypeScript config fixes and enhanced demo app.

## [1.0.1] - 2026-01-13

### Changed

- Switched demo link from StackBlitz to CodeSandbox.

## [1.0.0] - 2026-01-13

### Added

- Initial release.
- `ConsentProvider` with context-based state management.
- `ConsentPopup` centered modal dialog with customizable buttons.
- `ConsentSettings` modal with per-service toggles.
- `useConsent` hook for accessing consent state.
- Script loading/unloading for consented services.
- Cookie, localStorage, and sessionStorage cleanup on consent revocation.
- Hash-based consent invalidation.
- Light and dark theme support via CSS custom properties.
- Comprehensive test suite.
