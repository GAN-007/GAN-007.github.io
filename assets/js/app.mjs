import { repoCache } from './repo-cache.mjs';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const featured = [
  ['github-ai-genius', 'AI / Developer Tooling', 'Go-based original repository in my public GitHub portfolio.'],
  ['MPESA', 'FinTech / Payments', 'M-Pesa integration work and payment engineering.'],
  ['ai-document-assistant', 'AI / Documents', 'AI-assisted document workflow project.'],
  ['GANTECH-HRM', 'Enterprise / HR', 'Human-resource management platform work.'],
  ['PAWA-Q-A-AI', 'AI / Q&A', 'AI question-and-answer platform.'],
  ['FREEPBX-AI-', 'AI / Telecom', 'AI-assisted telephony and FreePBX experimentation.']
];

const assistantKnowledge = {
  skills: 'George works across Python, Django, DRF, Flask, FastAPI, PHP, JavaScript, React, Vue, PostgreSQL, MySQL, MongoDB, REST, GraphQL, Docker, Kubernetes, AWS, GCP, Azure, BI, machine learning, NLP, LLMs and application security.',
  sevi: 'George is Data Scientist & Tech Lead at SEVI in Nairobi. Since August 2025, his work has covered fintech analytics, PostgreSQL and Metabase, KPI governance, credit risk, collections, portfolio and lifecycle analysis, data quality, automation and responsible AI.',
  experience: 'George’s eight listed roles span SEVI, 5ived.com, Creativebits LLC, Upwork, Aqua Links Ke, self-employment, Free Website Guys and Sai Offices. His technology career covers full-stack delivery, data, fintech, AI, deployment, support and technical leadership.',
  education: 'George holds a Bachelor’s in Information Technology, training in Financial Modeling & Valuation Analysis, CPA Levels 1 & 2, a Python Programmer certification, and certificates in web development, graphics and computerized accounting.',
  certifications: 'His listed credentials include DEVTOWN Machine Learning & Python and Web Development bootcamps, plus monday.com Project Management certification.',
  projects: 'Featured work includes github-ai-genius, MPESA, ai-document-assistant, GANTECH-HRM, PAWA-Q-A-AI and FREEPBX-AI-. The live explorer lists current public GitHub repositories and labels forks separately.',
  finance: 'George combines software and data engineering with financial modelling, accounting, credit-risk, repayment, collections, reconciliation, valuation, Sage and QuickBooks experience.',
  contact: 'George is based in Nairobi, Kenya. Email georgenyamema@gmail.com, call +254 745 970 119, or use the GitHub and LinkedIn links in the Contact section.',
  languages: 'George lists English and Swahili at native or professional fluency. Referees are available upon request.',
  cv: 'Use Download CV near the top of the page for the PDF, or open the web CV for an accessible browser and print version.'
};

let repoData = [];

function isPublicRepo(repo) {
  return repo?.private === false && repo.visibility === 'public';
}

const cachedPublicNames = new Set(repoCache.filter(isPublicRepo).map(repo => repo.name));

function create(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function externalLink(label, href) {
  const link = create('a', 'project-link', label);
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

function initNavigation() {
  const menu = $('#menu');
  const mobile = $('#mobile');
  const closeMenu = () => {
    mobile.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  };
  menu.addEventListener('click', () => {
    const open = !mobile.classList.contains('open');
    mobile.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('#mobile a').forEach(link => link.addEventListener('click', closeMenu));
  addEventListener('resize', () => { if (innerWidth > 1000) closeMenu(); }, { passive: true });

  const header = $('#header');
  const progress = $('.progress i');
  const updateScroll = () => {
    const scrollable = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    progress.style.width = `${Math.min(100, scrollY / scrollable * 100)}%`;
    header.style.borderBottomColor = scrollY > 20 ? '#17304f' : 'transparent';
  };
  updateScroll();
  addEventListener('scroll', updateScroll, { passive: true });

  const links = $$('.nav nav a');
  const sections = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-42% 0px -52%' });
    sections.forEach(section => observer.observe(section));
  }
}

function initReveals() {
  const items = $$('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  items.forEach(item => observer.observe(item));
}

function initCounters() {
  $$('[data-count]').forEach(element => {
    const target = Number(element.dataset.count);
    if (reducedMotion || !('IntersectionObserver' in window)) {
      element.textContent = target;
      return;
    }
    element.textContent = '0';
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const started = performance.now();
      requestAnimationFrame(function frame(now) {
        const progress = Math.min(1, (now - started) / 900);
        element.textContent = String(Math.round(target * progress));
        if (progress < 1) requestAnimationFrame(frame);
      });
    });
    observer.observe(element);
  });
}

function initTypewriter() {
  if (reducedMotion) return;
  const words = ['full-stack systems', 'fintech analytics', 'data engineering', 'AI-assisted workflows', 'technical leadership', 'automation with impact'];
  const element = $('#typed');
  let wordIndex = 0;
  let characterIndex = words[0].length;
  let deleting = true;
  let timer;
  const tick = () => {
    const word = words[wordIndex];
    characterIndex += deleting ? -1 : 1;
    element.textContent = word.slice(0, characterIndex);
    let delay = deleting ? 45 : 85;
    if (!deleting && characterIndex === word.length) {
      deleting = true;
      delay = 1300;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 250;
    }
    timer = setTimeout(tick, delay);
  };
  timer = setTimeout(tick, 1200);
  addEventListener('pagehide', () => clearTimeout(timer), { once: true });
}

function projectCard(name, tag, description) {
  const article = create('article');
  const top = create('div', 'project-top');
  top.append(create('span', 'tag', tag), create('span', '', '↗'));
  article.append(top, create('h3', '', name), create('p', '', description), externalLink('View repository ↗', `https://github.com/GAN-007/${encodeURIComponent(name)}`));
  return article;
}

function renderFeatured() {
  const box = $('#featured');
  featured.filter(([name]) => cachedPublicNames.has(name)).forEach(item => box.append(projectCard(...item)));
}

function repoCard(repo) {
  const article = create('article');
  const top = create('div', 'repo-top');
  top.append(create('span', 'tag', repo.fork ? 'Fork' : 'Original'), create('small', '', repo.language || 'Mixed'));
  article.append(top, create('h3', '', repo.name), create('p', '', repo.description || 'Public GitHub repository.'), externalLink('GitHub ↗', repo.html_url));
  return article;
}

function renderRepos(filter = 'all') {
  const box = $('#repos');
  const filtered = repoData.filter(isPublicRepo).filter(repo => filter === 'all' || (filter === 'fork' ? repo.fork : !repo.fork)).slice(0, 18);
  box.replaceChildren();
  if (!filtered.length) {
    box.append(create('p', 'muted', 'No repositories in this filter.'));
    return;
  }
  const fragment = document.createDocumentFragment();
  filtered.forEach(repo => fragment.append(repoCard(repo)));
  box.append(fragment);
}

async function loadRepos() {
  const status = $('#repoStatus');
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const response = await fetch('https://api.github.com/users/GAN-007/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const data = await response.json();
    repoData = data.map(({ name, description, html_url, language, fork, private: isPrivate, visibility }) => ({ name, description, html_url, language, fork, private: isPrivate, visibility })).filter(isPublicRepo);
    status.textContent = `${repoData.length} public repositories loaded from GitHub.`;
  } catch {
    repoData = repoCache.filter(isPublicRepo);
    status.textContent = 'Live GitHub data is unavailable; showing a curated cached selection.';
  }
  renderRepos('all');

  $$('.filter').forEach(button => button.addEventListener('click', () => {
    $$('.filter').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderRepos(button.dataset.filter);
  }));
}

function initContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  form.addEventListener("submit", event => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }
    const submit = $("button[type=\"submit\"]", form);
    submit.disabled = true;
    submit.textContent = "Sending…";
    status.textContent = "Securely submitting your message…";
  });
}

function portfolioAnswer(question) {
  const q = question.toLowerCase();
  if (/sevi|current|fintech/.test(q)) return assistantKnowledge.sevi;
  if (/skill|stack|python|django|react|sql|cloud|devops|security|technology/.test(q)) return assistantKnowledge.skills;
  if (/project|github|repo|built|portfolio/.test(q)) return assistantKnowledge.projects;
  if (/education|degree|university|college|study/.test(q)) return assistantKnowledge.education;
  if (/certificate|certification|award/.test(q)) return assistantKnowledge.certifications;
  if (/finance|account|credit|risk|collection|repayment|valuation/.test(q)) return assistantKnowledge.finance;
  if (/contact|email|phone|linkedin|location|nairobi|hire/.test(q)) return assistantKnowledge.contact;
  if (/language|swahili|english|referee|reference/.test(q)) return assistantKnowledge.languages;
  if (/cv|resume|curriculum|download/.test(q)) return assistantKnowledge.cv;
  if (/experience|career|work|role|job/.test(q)) return assistantKnowledge.experience;
  return 'I can answer from this portfolio about George’s skills, SEVI role, career history, education, certifications, projects, finance background, languages, referees, contact details or CV.';
}

function initAssistant() {
  const panel = $('#assistantPanel');
  const toggle = $('#assistantToggle');
  const close = $('#assistantClose');
  const form = $('#assistantForm');
  const input = $('#assistantInput');
  const messages = $('#assistantMessages');
  const setOpen = open => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) input.focus();
    else toggle.focus();
  };
  const addMessage = (text, kind) => {
    messages.append(create('p', `msg ${kind}`, text));
    messages.scrollTop = messages.scrollHeight;
  };
  const ask = question => {
    const clean = question.trim();
    if (!clean) return;
    addMessage(clean, 'user');
    addMessage(portfolioAnswer(clean), 'bot');
    input.value = '';
  };
  toggle.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));
  form.addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  $$('.assistant-prompts button').forEach(button => button.addEventListener('click', () => ask(button.dataset.question)));
  addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) setOpen(false); });
}

function initServiceWorker() {
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}), { once: true });
  }
}

function init() {
  $('#year').textContent = String(new Date().getFullYear());
  initNavigation();
  initReveals();
  initCounters();
  initTypewriter();
  renderFeatured();
  loadRepos();
  initContactForm();
  initAssistant();
  initServiceWorker();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
