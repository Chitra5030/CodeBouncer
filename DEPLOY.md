# Deploying CodeBouncer

CodeBouncer deploys as a **single service**: the Express server serves the API *and*
the built React client from one origin. No CORS, no separate frontend URL.

- Build: `npm run deploy:build` (installs everything, then builds the client into `client/dist`)
- Start: `npm start` (runs the Express server, which serves the API + `client/dist`)
- The server listens on `process.env.PORT` (falls back to 5001 locally).

## Before you deploy

1. **Push to GitHub** (the `.env` file is gitignored — never commit your keys).
2. **EmailJS keys are build-time.** Vite inlines `VITE_*` vars when the client is built,
   so they must be set as environment variables on the host *before/at build*, not just at runtime.
   You need:
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_WAITLIST_TEMPLATE_ID`
   - `VITE_EMAILJS_CONTACT_TEMPLATE_ID`
3. **Allowed origins.** In your EmailJS dashboard, add your production domain to the
   allowed origins list so email sends aren't blocked.

---

## Option A — Render (recommended, free tier)

This repo includes `render.yaml`, so:

1. Go to https://render.com → **New > Blueprint** → connect this GitHub repo.
2. Render reads `render.yaml`: build `npm run deploy:build`, start `npm start`,
   health check `/api/health`.
3. When prompted, paste the four `VITE_EMAILJS_*` values.
4. Deploy. Your app is live at `https://<name>.onrender.com`.

(No blueprint? Create a **Web Service** manually with the same build/start commands and add the env vars.)

## Option B — Railway

1. https://railway.app → **New Project > Deploy from GitHub repo**.
2. Set **Build Command** `npm run deploy:build` and **Start Command** `npm start`.
3. Add the four `VITE_EMAILJS_*` variables.
4. Deploy. Railway assigns a public URL.

## Option C — Docker (Fly.io, Cloud Run, a VPS, anywhere)

A `Dockerfile` is included. EmailJS keys are passed as build args:

```bash
docker build \
  --build-arg VITE_EMAILJS_PUBLIC_KEY=zB8-... \
  --build-arg VITE_EMAILJS_SERVICE_ID=service_... \
  --build-arg VITE_EMAILJS_WAITLIST_TEMPLATE_ID=template_... \
  --build-arg VITE_EMAILJS_CONTACT_TEMPLATE_ID=template_... \
  -t codebouncer .

docker run -p 5001:5001 codebouncer
```

Then open http://localhost:5001.

---

## Notes / production hardening

- **Storage is ephemeral.** Waitlist/contact entries are written to `server/data/*.json`,
  which resets on redeploy on most platforms. Email notifications (via EmailJS) still work;
  only the local log is lost. For durable records, attach a persistent disk or swap
  `appendJson` for a real database.
- **Outbound internet required.** Package checks hit live npm + PyPI registries.
- **Frontend + backend split?** If you'd rather host the client on Vercel/Netlify and the
  API separately, you'll need to point the client's `fetch("/api/...")` calls at the API's
  full URL and enable CORS for that origin. The single-service setup above avoids all of that.
