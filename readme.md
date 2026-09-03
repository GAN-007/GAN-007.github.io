# George Alfred Nyamema — Portfolio

Production GitHub Pages portfolio for George Alfred Nyamema (GAN-007), covering data science, full-stack software engineering, AI, fintech, analytics, cloud, DevOps, security, financial modelling and technical leadership.

## Features

- Responsive dark-navy/electric-blue portfolio with reduced-motion support
- CV-driven skills, experience, education, credentials and contact content
- Live GitHub repository explorer with All, Originals and Forks filters
- Safe curated repository fallback when GitHub is unavailable or rate-limited
- Client-side, CV-grounded portfolio assistant
- Contact form that validates locally and opens a prepared email (no visitor data is stored)
- Downloadable PDF CV plus printable web CV
- Installable PWA with offline caching
- Canonical metadata, social cards, robots policy and XML sitemap

## Project structure

- `index.html` — portfolio content and semantic page shell
- `cv.html` — accessible printable web CV
- `assets/css/styles.css` — responsive visual system and component styling
- `assets/js/app.mjs` — navigation, animation, repositories, contact, assistant and service-worker behavior
- `assets/js/repo-cache.mjs` — offline/rate-limit repository fallback
- `assets/docs/George_Alfred_Nyamema_CV.pdf` — downloadable CV
- `site.webmanifest` and `sw.js` — install and offline support
- `robots.txt` and `sitemap.xml` — crawler metadata

## Local run

Serve the repository root through any static web server. For example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Service workers do not run directly from `file://` URLs.

## Contact

- Email: georgenyamema@gmail.com
- Phone: +254 745 970 119
- GitHub: https://github.com/GAN-007
- LinkedIn: https://linkedin.com/in/george-nyamema-5684181
