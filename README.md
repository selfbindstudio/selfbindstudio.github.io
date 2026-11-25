# SelfBind: Strict App Blocker — Official Website

Official landing page for **SelfBind: Strict App Blocker & Clean Browser** by **SelfBind Studio**, deployed via GitHub Pages at [https://selfbindstudio.github.io/](https://selfbindstudio.github.io/).

- **Google Play:** [SelfBind on Google Play](https://play.google.com/store/apps/details?id=com.selfbind.app)
- **Privacy Policy:** [Official Privacy Policy](https://sites.google.com/view/selfbind-privacy/)
- **Support:** `vishnuaravind.mech@gmail.com`

## Local Development

```bash
npm install --legacy-peer-deps
npm run dev
```

## Production Build

```bash
npm run build
```

## GitHub Pages Deployment

Pushing to `main` automatically runs `.github/workflows/deploy.yml` to build and publish `dist/` to GitHub Pages. Ensure **Settings → Pages → Source** is set to **GitHub Actions**.
