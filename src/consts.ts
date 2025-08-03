// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

const baseUrl = import.meta.env.BASE_URL;

export const resolve = (str: string) => {
    return baseUrl + str;
}