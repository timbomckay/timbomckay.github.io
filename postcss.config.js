/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const themeDir = `${__dirname}`;

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./hugo_stats.json'],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return els.tags.concat(els.classes, els.ids);
  },
});

module.exports = {
  plugins: [
    require('postcss-import')({ path: [`${themeDir}/assets/`] }),
    require('tailwindcss')(`${themeDir}/tailwind.config.js`),
    ...process.env.HUGO_ENVIRONMENT === 'production'
      ? [purgecss]
      : [],
  ],
};
