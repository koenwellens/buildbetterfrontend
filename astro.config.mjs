import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://buildbetterfrontend.com',
  output: 'static',
  integrations: [mdx()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-sans',
      fallbacks: ['sans-serif'],
      options: {
        variants: [{
          src: ['./src/assets/fonts/plus-jakarta-sans-latin-wght-normal.woff2'],
          weight: '200 800',
          style: 'normal',
          display: 'swap',
        }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Fira Code',
      cssVariable: '--font-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [{
          src: ['./src/assets/fonts/fira-code-latin-wght-normal.woff2'],
          weight: '300 700',
          style: 'normal',
          display: 'swap',
        }],
      },
    },
  ],
});
