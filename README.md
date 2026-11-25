# SelfBind: Strict App Blocker — Official Website

Official landing page for **SelfBind: Strict App Blocker & Clean Browser** by **SelfBind Studio**, deployed via GitHub Pages at [https://selfbindstudio.github.io/](https://selfbindstudio.github.io/).

## Before Going Live

Replace `[PASTE_YOUR_GOOGLE_PLAY_URL_HERE]` with your live Google Play Store URL in:

- `src/data/selfbindData.ts`
- `index.html`

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## GitHub Pages Deployment

Pushing to the `main` branch automatically triggers `.github/workflows/deploy.yml` to build and deploy the static site to GitHub Pages. Make sure **Settings → Pages → Source** is set to **GitHub Actions**.
