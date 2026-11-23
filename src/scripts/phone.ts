import gsap from 'gsap';

// Recreates keyboard_dock on the hero phone: focus a field, keyboard slides
// up, the Continue button rides on top of it, we type, keyboard goes away.
export function phoneTimeline(root: HTMLElement): gsap.core.Timeline | null {
  const kb = root.querySelector<HTMLElement>('[data-kb]');
  const dock = root.querySelector<HTMLElement>('[data-dock]');
  const btn = root.querySelector<HTMLElement>('[data-dock-btn]');
  const toast = root.querySelector<HTMLElement>('[data-toast]');
  const fields = [...root.querySelectorAll<HTMLElement>('[data-field]')];
  if (!kb || !dock || !btn || !toast || fields.length < 2) return null;

  const keys = new Map<string, HTMLElement>();
  root.querySelectorAll<HTMLElement>('[data-key]').forEach((k) => keys.set(k.dataset.key!, k));

  // Lift so the button sits just above the keyboard and the home-indicator
  // padding tucks underneath it, exactly what the package does.
  const lift = () => -(kb.offsetHeight - 22);

  const focus = (i: number | null) => () =>
    fields.forEach((f, j) => f.classList.toggle('is-focus', j === i));

  const type = (i: number, text: string) => {
    const out = fields[i].querySelector<HTMLElement>('[data-type]')!;
    const tl = gsap.timeline();
    [...text].forEach((ch, n) => {
      tl.call(
        () => {
          out.textContent = text.slice(0, n + 1);
          const key = keys.get(ch.toLowerCase()) ?? keys.get(' ');
          if (key) {
            key.classList.add('is-down');
            setTimeout(() => key.classList.remove('is-down'), 90);
          }
        },
        undefined,
        // Uneven gaps read as a person typing, not a machine.
        n === 0 ? 0 : `+=${0.07 + Math.random() * 0.09}`,
      );
    });
    return tl;
  };

  const clear = () => {
    fields.forEach((f) => {
      const t = f.querySelector('[data-type]');
      if (t) t.textContent = '';
    });
  };

  // Reset y as well: GSAP would otherwise read the CSS translateY(100%) as
  // a pixel offset and stack yPercent on top of it.
  gsap.set(kb, { y: 0, yPercent: 100 });
  gsap.set(toast, { xPercent: -50, y: -80, x: 0, left: '50%' });

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, delay: 0.6 });
  tl.call(focus(0))
    .to(kb, { yPercent: 0, duration: 0.45, ease: 'power3.out' }, '+=0.3')
    .to(dock, { y: lift, duration: 0.45, ease: 'power3.out' }, '<')
    .add(type(0, 'Manukumar'), '+=0.25')
    .call(focus(1), undefined, '+=0.35')
    .add(type(1, 'manu@flutter.dev'), '+=0.25')
    .call(focus(null), undefined, '+=0.5')
    .to(kb, { yPercent: 100, duration: 0.4, ease: 'power3.in' })
    .to(dock, { y: 0, duration: 0.4, ease: 'power3.in' }, '<')
    .to(btn, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' }, '+=0.35')
    .to(toast, { y: 0, duration: 0.5, ease: 'back.out(1.7)' })
    .to(toast, { y: -80, duration: 0.4, ease: 'power2.in' }, '+=1.3')
    .call(clear);

  return tl;
}
