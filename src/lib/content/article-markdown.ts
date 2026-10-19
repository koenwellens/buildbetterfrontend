import { satteri } from '@astrojs/markdown-satteri';

// Extend Astro's normal MDX pipeline; count prose, never fenced source or ESM.
export const articleMarkdown = satteri({
  mdastPlugins: [() => {
    const prose: string[] = [];
    return {
      name: 'bbf-reading-time',
      text(node) { prose.push(node.value); },
      inlineCode(node) { prose.push(node.value); },
      after(_root, context) {
        const words = prose.join(' ').match(/\S+/gu)?.length ?? 0;
        if (context.data.astro) {
          context.data.astro.frontmatter.readingMinutes = Math.max(1, Math.ceil(words / 200));
        }
      },
    };
  }],
});
