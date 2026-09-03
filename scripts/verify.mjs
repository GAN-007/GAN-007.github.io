import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { repoCache } from '../assets/js/repo-cache.mjs';

const requiredFiles = [
  'index.html',
  'cv.html',
  'assets/css/styles.css',
  'assets/js/app.mjs',
  'assets/js/repo-cache.mjs',
  'assets/docs/George_Alfred_Nyamema_CV.pdf',
  'assets/images/george-nyamema-hero.webp',
  'assets/images/icon-192.png',
  'assets/images/icon-512.png',
  'site.webmanifest',
  'sitemap.xml',
  'sw.js',
  'thank-you.html',
  'privacy.html',
];

for (const file of requiredFiles) await access(file, constants.R_OK);

for (const file of ['assets/js/app.mjs', 'assets/js/repo-cache.mjs', 'sw.js']) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
}

const index = await readFile('index.html', 'utf8');
const app = await readFile('assets/js/app.mjs', 'utf8');
const cv = await readFile('cv.html', 'utf8');
const manifest = JSON.parse(await readFile('site.webmanifest', 'utf8'));
const sitemap = await readFile('sitemap.xml', 'utf8');
const serviceWorker = await readFile('sw.js', 'utf8');
const pdf = await readFile('assets/docs/George_Alfred_Nyamema_CV.pdf');

const assertions = [
  [index.includes('<h3>FullStack Development</h3>'), 'FullStack Development heading is missing'],
  [!index.includes('<h3>Web Development</h3>'), 'Legacy Web Development service heading remains'],
  [index.includes('https://formsubmit.co/georgenyamema@gmail.com'), 'Contact endpoint is missing'],
  [index.includes('id="assistantPanel"'), 'Portfolio assistant is missing'],
  [index.includes('site.webmanifest'), 'Manifest link is missing'],
  [index.includes('assets/docs/George_Alfred_Nyamema_CV.pdf'), 'CV link is missing'],
  [cv.includes('George Alfred Nyamema'), 'Web CV content is missing'],
  [manifest.icons?.length >= 2, 'PWA icons are incomplete'],
  [sitemap.includes('https://gan-007.github.io/'), 'Sitemap homepage URL is missing'],
  [serviceWorker.includes('thank-you.html'), 'Thank-you page is not cached'],
  [repoCache.every(repo => repo.private === false && repo.visibility === 'public'), 'Repository cache contains an entry that is not explicitly public'],
  [app.includes('api.github.com/users/GAN-007/repos') && app.includes('filter(isPublicRepo)'), 'Public-only GitHub repository filtering is missing'],
  [pdf.subarray(0, 5).toString() === '%PDF-', 'CV download is not a PDF']
];

const failures = assertions.filter(([passed]) => !passed).map(([, message]) => message);
if (failures.length) throw new Error(`Portfolio verification failed:\n- ${failures.join('\n- ')}`);

console.log(`Portfolio verification passed (${requiredFiles.length} required files).`);

