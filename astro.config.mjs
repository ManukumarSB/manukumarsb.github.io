import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://manukumarsb.github.io',
  security: {
    // GitHub Pages can't send headers, so Astro writes the policy into a
    // <meta> tag and hashes every script and style it emits.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self' data:",
        "connect-src 'self'",
        'frame-src https://www.honestify.me',
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
    },
  },
});
