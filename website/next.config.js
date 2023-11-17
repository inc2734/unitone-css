const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

const basePath = process.env.GITHUB_ACTIONS && '/unitone-css';

module.exports = withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath,
  trailingSlash: true,
  publicRuntimeConfig: {
    basePath,
  }
});
