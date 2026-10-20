import type { PreviewRegistration } from '../lib/content/schemas.ts';

// Reviewed registrations only. Paths are relative to src/examples/ and are not
// imports or public URLs. The rendering step will decide how eligible demos run.
export const previews: readonly PreviewRegistration[] = [];
