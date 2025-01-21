import nextra from 'nextra';

const withNextra = nextra({});

const basePath = process.env.GITHUB_ACTIONS && '/unitone-css';

export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath,
  trailingSlash: true,
  publicRuntimeConfig: {
    basePath,
  },
});
