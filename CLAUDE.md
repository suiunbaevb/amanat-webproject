# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Vite HMR)
npm run build     # Production build → /dist
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test infrastructure exists in this project.

## Architecture

**Stack:** React 19 + Vite 6 + Material-UI 7 + React Router 7 + Framer Motion

**Entry point:** `src/main.jsx` → `src/App.jsx`

`App.jsx` is a monolithic file (~644 lines) containing: MUI ThemeProvider with custom theme, BrowserRouter, Navbar (with mobile drawer), and all route definitions.

### Routing

| Path | Component |
|------|-----------|
| `/` | `pages/HomePage.js` — hero, features, mortgage calc, application form |
| `/about` | `pages/AboutPage.jsx` — founder, CEO, team gallery |
| `/reviews` | `pages/ReviewsPage.jsx` — client testimonials (MUI Masonry) |
| `/faq` | `pages/FaqPage.jsx` — FAQ in Kyrgyz |
| `/adress` | `pages/AdressPage.jsx` — office location, map, photos |

### Styling

- **MUI ThemeProvider** defined in `App.jsx` with:
  - Primary color: `#006B4F` (green)
  - Typography: Playfair Display (headings), Inter/Roboto (body)
  - Global `borderRadius: 12px`
- Use MUI's `sx` prop for component-level styles; avoid separate CSS files
- Responsive breakpoints via MUI Grid: `xs`, `sm`, `md`, `lg`, `xl`

### State Management

Local `useState` only — no Redux/Zustand/Context. Data is hardcoded; the only external call is a Google Forms POST in `src/components/ApplicationForm.jsx` using `fetch` with `mode: 'no-cors'`.

### Language

UI text is in **Russian**; the FAQ page uses **Kyrgyz**. No i18n library — all text is hardcoded.
