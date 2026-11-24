import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { phoneTimeline } from './phone';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const motion = root.classList.contains('js-motion');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => el.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, el: ParentNode = document) => [...el.querySelectorAll<T>(s)];

// ---------------------------------------------------------------------------
// Works with or without motion
// ---------------------------------------------------------------------------

function setupCopy() {
  $$<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const label = $('[data-copy-label]', btn);
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
      } catch {
        return;
      }
      btn.classList.add('is-copied');
      if (label) label.textContent = 'copied ✓';
      setTimeout(() => {
        btn.classList.remove('is-copied');
        if (label) label.textContent = 'copy';
      }, 1600);
    });
  });
}

function setupNav() {
  const nav = $('.nav');
  const links = $$<HTMLAnchorElement>('[data-nav]');
  const indicator = $('.nav__indicator');
  if (!nav) return;

  let lastY = scrollY;
  addEventListener(
    'scroll',
    () => {
      const y = scrollY;
      nav.classList.toggle('is-hidden', y > lastY && y > 400);
      lastY = y;
    },
    { passive: true },
  );

  const setActive = (link?: HTMLAnchorElement) => {
    links.forEach((l) => l.classList.toggle('is-active', l === link));
    if (!indicator) return;
    if (!link) {
      indicator.style.opacity = '0';
      return;
    }
    indicator.style.opacity = '1';
    indicator.style.width = `${link.offsetWidth}px`;
    indicator.style.transform = `translateX(${link.offsetLeft}px)`;
  };

  links.forEach((link) => {
    const section = $(link.hash);
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => self.isActive && setActive(link),
      onLeaveBack: () => link === links[0] && setActive(undefined),
    });
  });
}

// ---------------------------------------------------------------------------
// Motion only
// ---------------------------------------------------------------------------

let lenis: Lenis | null = null;

function setupSmoothScroll() {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // The chat dialog scrolls inside an iframe; keep the page still meanwhile.
  window.addEventListener('chat:toggle', (e) => {
    (e as CustomEvent<boolean>).detail ? lenis!.stop() : lenis!.start();
  });

  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = a.hash.length > 1 ? $(a.hash) : null;
      if (!target) return;
      e.preventDefault();
      lenis!.scrollTo(target, { offset: a.hash === '#top' ? 0 : -24, duration: 1.4 });
      history.replaceState(null, '', a.hash);
    });
  });
}

function playLoader(): Promise<void> {
  const loader = $('.loader');
  if (!loader || !root.classList.contains('show-loader')) {
    loader?.remove();
    return Promise.resolve();
  }
  try {
    sessionStorage.setItem('loader-seen', '1');
  } catch {}

  lenis?.stop();
  const lines = $$('p', loader);
  const ms = $('.ms', loader)!;
  const counter = { v: 0 };

  return new Promise((resolve) => {
    gsap
      .timeline({
        onComplete: () => {
          loader.remove();
          root.classList.remove('show-loader');
          lenis?.start();
          resolve();
        },
      })
      .to(lines.slice(0, 3), { opacity: 1, y: 0, duration: 0.3, stagger: 0.18 })
      .to($('.bar i', loader), { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.1')
      .to(lines[3], { opacity: 1, y: 0, duration: 0.25 })
      .to(counter, { v: 1184, duration: 0.4, ease: 'power1.out', onUpdate: () => (ms.textContent = String(Math.round(counter.v))) }, '<')
      .to(lines[4], { opacity: 1, y: 0, duration: 0.25 }, '+=0.05')
      .to($('.loader__wipe', loader), { scaleY: 1, duration: 0.55, ease: 'power4.inOut' }, '+=0.15')
      .set($('.loader__term', loader), { opacity: 0 })
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power4.inOut' });
  });
}

function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.to('.hero .split-line > span', { y: 0, duration: 1.2, stagger: 0.09 })
    .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, '-=0.85')
    .fromTo(
      '[data-hero-phone]',
      { opacity: 0, y: 90, rotateX: 24, rotateZ: -4 },
      { opacity: 1, y: 0, rotateX: 0, rotateZ: 0, duration: 1.5, ease: 'expo.out' },
      0.15,
    );

  const phone = $('[data-phone]');
  if (!phone) return;
  const demo = phoneTimeline(phone);
  if (demo) {
    // Don't burn CPU on the demo when nobody can see it.
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => (self.isActive ? demo.play() : demo.pause()),
    });
  }
}

function setupHeroPointer() {
  const hero = $('.hero');
  const phone = $('[data-phone]');
  const grid = $('.hero .grid');
  if (!hero || !phone) return;

  const rx = gsap.quickTo(phone, 'rotationX', { duration: 0.8, ease: 'power3.out' });
  const ry = gsap.quickTo(phone, 'rotationY', { duration: 0.8, ease: 'power3.out' });
  const chips = $$('[data-float]').map((el) => ({
    depth: Number(el.dataset.float),
    x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3.out' }),
    y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3.out' }),
  }));

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ry(nx * 22);
    rx(-ny * 16);
    chips.forEach((c) => {
      c.x(nx * c.depth * 2);
      c.y(ny * c.depth * 2);
    });
    grid?.style.setProperty('--mx', `${e.clientX - r.left}px`);
    grid?.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
  hero.addEventListener('pointerleave', () => {
    rx(0);
    ry(0);
    chips.forEach((c) => (c.x(0), c.y(0)));
  });

  // Chips bob gently on their own too.
  $$('[data-float]').forEach((el, i) => {
    gsap.to(el, { yPercent: i % 2 ? 18 : -18, duration: 2.6 + i * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  });
}

function setupSplitHeadings() {
  $$('.section .h2, .projects .h2, .about__title, .contact__title').forEach((h) => {
    if (h.closest('.hero')) return;
    gsap.to($$('.split-line > span', h), {
      y: 0,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.1,
      scrollTrigger: { trigger: h, start: 'top 85%' },
    });
  });
}

function setupReveals() {
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%',
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1, overwrite: true }),
  });
}

function setupCounters() {
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: end,
      duration: end > 100 ? 2 : 1.4,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString()),
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });

  $$<SVGCircleElement>('[data-ring]').forEach((c) => {
    gsap.fromTo(
      c,
      { strokeDashoffset: Number(c.dataset.ringFull) },
      {
        strokeDashoffset: Number(c.dataset.ring),
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: c, start: 'top 90%' },
      },
    );
  });
}

function setupTimeline() {
  const list = $('[data-timeline]');
  const fill = $('[data-timeline-fill]');
  if (!list || !fill) return;
  gsap.to(fill, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: list, start: 'top 65%', end: 'bottom 65%', scrub: 0.6 },
  });
  $$('[data-job]').forEach((job) => {
    ScrollTrigger.create({
      trigger: job,
      start: 'top 65%',
      onEnter: () => job.classList.add('is-lit'),
      onLeaveBack: () => job.classList.remove('is-lit'),
    });
    gsap.from(job.children, {
      opacity: 0,
      x: 40,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: job, start: 'top 80%' },
    });
  });
}

function setupHorizontalProjects() {
  const section = $('[data-hscroll]');
  const track = $('[data-hscroll-track]');
  const index = $('[data-hscroll-index]');
  if (!section || !track) return;

  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    section.classList.add('is-pinned');
    const cards = $$('.proj', track);
    const distance = () => track.scrollWidth - innerWidth;

    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!index) return;
          const i = Math.min(cards.length, Math.floor(self.progress * cards.length) + 1);
          index.textContent = String(i).padStart(2, '0');
        },
      },
    });

    // Each card's art drifts a little against the scroll direction.
    cards.forEach((card) => {
      gsap.fromTo(
        $('.proj__orb', card),
        { x: 60 },
        { x: -60, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } },
      );
    });

    return () => section.classList.remove('is-pinned');
  });
}

function setupParallax() {
  const img = $('[data-parallax-img]');
  if (img) {
    gsap.fromTo(
      img,
      { yPercent: -6 },
      { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, scrub: true } },
    );
  }
  gsap.to('.ticker', {
    xPercent: -4,
    ease: 'none',
    scrollTrigger: { trigger: '.ticker', scrub: true },
  });
}

function setupCursor() {
  const cursor = $('.cursor');
  if (!cursor) return;
  const x = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
  const y = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });
  addEventListener('pointermove', (e) => (x(e.clientX), y(e.clientY)), { passive: true });
  document.addEventListener('pointerover', (e) => {
    const hit = (e.target as Element).closest('a, button, [data-tilt]');
    cursor.classList.toggle('is-hover', !!hit);
  });
}

function setupMagnetic() {
  $$('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magneticStrength ?? 0.3);
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * strength);
      y((e.clientY - r.top - r.height / 2) * strength);
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.35)' });
    });
  });
}

function setupCards() {
  $$('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', `${e.clientX - r.left}px`);
      card.style.setProperty('--y', `${e.clientY - r.top}px`);
    });
  });
  if (!motion) return;
  $$('[data-tilt]').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    gsap.set(card, { transformPerspective: 900 });
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
    });
    card.addEventListener('pointerleave', () => (rx(0), ry(0)));
  });
}

// ---------------------------------------------------------------------------

setupCopy();
setupNav();

if (finePointer) setupCards();

if (motion) {
  setupSmoothScroll();
  setupSplitHeadings();
  setupReveals();
  setupCounters();
  setupTimeline();
  setupHorizontalProjects();
  setupParallax();
  if (finePointer) {
    setupHeroPointer();
    setupCursor();
    setupMagnetic();
  }
  playLoader().then(heroIntro);

  // Fonts change line heights; re-measure pinned sections once they land.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
