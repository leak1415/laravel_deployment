# Frontend

This folder contains the Vue and Tailwind source for the UI layer.

Current structure:

- `src/app.js` mounts the dashboard UI
- `src/bootstrap.js` sets up the shared axios client
- `src/components/HomeDashboard.js` renders the landing dashboard
- `src/styles/app.css` is the Tailwind entry stylesheet

Run the frontend build from the repository root with:

```bash
npm install
npm run dev
```

The Blade layout loads these assets through Vite using the `Frontend/src/*`
paths, and the compiled assets are written into `Backend/public/build`.
