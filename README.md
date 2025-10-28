## BingeBites Frontend

Modern React (Vite) frontend for BingeBites — a short‑video style food discovery and ordering experience for users and food partners.

### Live and Source
- GitHub: [`SanathRai33/BingeBites-Client`](https://github.com/SanathRai33/BingeBites-Client)
- Deployed (if available): `binge-bites-client.vercel.app`

## Tech Stack
- React 19 + Vite 7
- React Router DOM 7
- Redux Toolkit + React Redux
- Axios for API calls
- Tailwind CSS 4 (with PostCSS + Autoprefixer)

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install
```bash
cd frontend
npm install
```

### Environment
Create a `.env` file in `frontend/` with:
```bash
VITE_BACKEND_URL=http://localhost:5000
```
Adjust to your backend base URL.

### Scripts
```bash
# Start dev server
npm run dev

# Production build
npm run build

# Preview built app
npm run preview

# Lint
npm run lint
```

## Project Structure
```
frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ component/
│  │  ├─ partner/
│  ├─ layouts/
│  ├─ pages/
│  │  ├─ auth/
│  │  ├─ foodPartners/
│  │  └─ user/
│  ├─ redux/
│  │  ├─ Slices/
│  │  └─ Store.js
│  ├─ routes/
│  ├─ styles/
│  ├─ App.jsx
│  └─ main.jsx
└─ vite.config.js
```

## Features
- User auth for users and food partners
- Short‑form food reels with like/save
- Ordering flow with address, payment, and summary
- Partner dashboard: profile, create food, manage orders

## API Configuration
All API requests use `import.meta.env.VITE_BACKEND_URL` as the base, e.g.:
```js
axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/food/get`)
```
Make sure your backend server sets proper CORS and cookies if using `withCredentials`.

## Routing and Deployment
- Client routing handled by React Router; `vercel.json` includes a catch‑all rewrite for SPA routing.
- To deploy on Vercel, push to the repo and import the project. Ensure `VITE_BACKEND_URL` is set in Vercel Project → Settings → Environment Variables.

## Contributing
1. Fork and create a feature branch
2. Keep changes focused
3. Open a PR with a clear description

## Maintainer
- Email: `sanathrai03@gmail.com`
- GitHub: [`@SanathRai33/BingeBites-Client`](https://github.com/SanathRai33/BingeBites-Client)

---
This README references the code hosted at [`SanathRai33/BingeBites-Client`](https://github.com/SanathRai33/BingeBites-Client).
