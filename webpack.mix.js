const mix = require('laravel-mix');

mix.webpackConfig({
  stats: {
    children: true,
  },
});

/**
 * Frontend 
 */
mix
  .js('./src/main.js', 'dist/compare-advanced.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'css/compare-advanced.bundle.css')
  .setPublicPath('dist');

/**
 * Backend
 */
 mix
  .js('./src/backend.js', 'dist/compare-advanced.backend.bundle.js')
  .react()
  .sass('./src/scss/backend.scss', 'css/compare-advanced.backend.bundle.css')
  .setPublicPath('dist');