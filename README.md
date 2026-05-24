# Image Processing Frontend

A React + Vite frontend for the Image Processing Service. It provides authentication, image upload, image browsing, and image detail views, and communicates with the backend API through Axios.

## Live demo

https://image-processing-frontend-xi.vercel.app/

## Backend repository

https://github.com/roshan-baka-dev/Image-processing-pipeline

---

## Features

- User registration and login
- JWT-based authentication
- Upload images to the backend
- Browse uploaded images with pagination
- View image details
- Protected routes for authenticated users
- API base URL configured through environment variables

---

## Tech Stack

- React 19
- Vite
- React Router
- Axios
- ESLint

---

## Project Structure

```bash
client/
│
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Prerequisites

- Node.js 18 or later
- npm
- Backend API running and accessible

---

## Environment Variables

Create a `.env` file inside the `client` folder.

### Local Development

```env
VITE_API_BASE_URL=http://localhost:5000
```

### Production Example

```env
VITE_API_BASE_URL=https://roshan-baka-dev-api.duckdns.org
```

---

## Installation

```bash
npm install
```

---

## Development

Start the Vite development server:

```bash
npm run dev
```

By default, the app runs at:

```text
http://localhost:5173
```

If you need to expose it on your network:

```bash
npm run dev -- --host
```

---

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Lint

Run ESLint:

```bash
npm run lint
```

---

## API Configuration

The app uses Axios from `src/api/axios.js` and reads the backend URL from Vite environment variables.

Make sure this matches your deployed backend, for example:

```env
VITE_API_BASE_URL=https://roshan-baka-dev-api.duckdns.org
```

---

## Deployment to Vercel

1. Push this frontend folder to its own GitHub repository.
2. Import the repository into Vercel.
3. Set the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add the environment variable:

```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

5. Deploy the project.

---

## Notes

- The frontend uses protected routes, so unauthenticated users are redirected to the login page.
- The backend must allow the Vercel domain in its CORS settings.
- If uploads fail with a `413 Request Entity Too Large`, increase the Nginx upload limit on the backend server.
- If the backend domain changes, update `VITE_API_BASE_URL` and redeploy the frontend.

---

## License

Private project.
