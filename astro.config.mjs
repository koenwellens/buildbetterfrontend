import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://buildbetterfrontend.com',
  output: 'static',
  integrations: [mdx()],
});
