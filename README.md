# Z-Note

The React client for Z-Note. It supports groups, tags, pinning, archive/trash, advanced search, autosave, and persisted light/dark mode while retaining the original coral visual identity.

## Local development

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_URL=http://localhost:3001/api`.
3. Run `npm ci` and `npm start`.

Use `npm test` for the Vitest suite and `npm run build` for a production build.

## Netlify

`netlify.toml` configures the Vite build, `dist` publish directory, Node runtime, and SPA redirects. Add this environment variable in Netlify:

```text
VITE_API_URL=https://your-render-service.onrender.com/api
```

After the Netlify deployment has a stable URL, add that exact origin to the backend's Render `CORS_ORIGINS` setting.
