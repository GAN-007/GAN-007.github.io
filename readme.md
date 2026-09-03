# George Alfred Nyamema — Portfolio

Production GitHub Pages portfolio for George Alfred Nyamema (GAN-007), covering data science, full-stack software engineering, AI, fintech, analytics, cloud, DevOps, security, financial modelling and technical leadership.

## Features

- Responsive dark-navy/electric-blue portfolio with reduced-motion support
- CV-driven skills, experience, education, credentials and contact content
- Live GitHub repository explorer with All, Originals and Forks filters
- Safe curated repository fallback when GitHub is unavailable or rate-limited
- Private, client-side CV assistant; questions never leave the browser
- Hosted contact delivery through FormSubmit, with reCAPTCHA, honeypot protection, a success page and direct-email fallback
- Downloadable PDF CV plus printable web CV
- Installable PWA with offline caching
- Privacy-oriented GoatCounter page and conversion analytics
- Canonical metadata, social cards, robots policy and XML sitemap
- Dependency-free verification script enforced by GitHub Actions on pushes and pull requests

## Project structure

- `index.html` — portfolio content and semantic page shell
- `cv.html` — accessible printable web CV
- `privacy.html` and `thank-you.html` — privacy disclosure and contact confirmation
- `assets/css/styles.css` — responsive visual system and component styling
- `assets/js/app.mjs` — navigation, animation, repositories, contact, assistant and service-worker behavior
- `assets/js/repo-cache.mjs` — offline/rate-limit repository fallback
- `assets/docs/George_Alfred_Nyamema_CV.pdf` — downloadable CV
- `site.webmanifest` and `sw.js` — install and offline support
- `robots.txt` and `sitemap.xml` — crawler metadata
- `scripts/verify.mjs` — dependency-free structural, syntax and asset checks
- `.github/workflows/ci.yml` — continuous integration workflow

## Provider activation

The integrations contain no secret keys in the public repository.

1. FormSubmit uses `georgenyamema@gmail.com`. The first real/test submission sends an activation email to that address; approve it once to enable delivery.
2. GoatCounter uses the site code `gan-007`. Create or claim that site code in GoatCounter so the included `count.v5.js` integration can store pageviews and the `contact-submit` / `cv-download` conversions.

## Local run and verification

```bash
python3 -m http.server 8000
node scripts/verify.mjs
```

Open `http://localhost:8000`. Service workers and provider analytics intentionally do not run from `file://`; GoatCounter also filters localhost by default.

## Contact

- Email: georgenyamema@gmail.com
- Phone: +254 745 970 119
- GitHub: https://github.com/GAN-007
- LinkedIn: https://linkedin.com/in/george-nyamema-5684181
