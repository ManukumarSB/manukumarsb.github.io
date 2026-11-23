# manukumarsb.github.io

My personal site. Astro + GSAP, deployed to GitHub Pages.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

- All the words live in `src/data/profile.ts`.
- Package stats come from the pub.dev API at build time (`src/data/packages.ts`).
  A scheduled workflow rebuilds the site every morning so the numbers stay current.
  To add a package, append its name to `packageNames`.
- Animations are off when the OS asks for reduced motion.
