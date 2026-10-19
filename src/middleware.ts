import { defineMiddleware } from 'astro:middleware';
import { validatePublishedContent } from './lib/content/validate.ts';

let productionValidation: Promise<void> | undefined;

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) {
    // Share the pending check across static routes, but recheck edits in dev.
    if (import.meta.env.DEV) {
      await validatePublishedContent();
    } else {
      await (productionValidation ??= validatePublishedContent());
    }
  }
  return next();
});
