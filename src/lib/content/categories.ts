export const categoryIds = ['tips', 'deep-dives', 'codex'] as const;
export type CategoryId = (typeof categoryIds)[number];

export const categories = {
  tips: { label: 'Frontend Tips' },
  'deep-dives': { label: 'Deep Dives' },
  codex: { label: 'Building with Codex' },
} satisfies Record<CategoryId, { label: string }>;
