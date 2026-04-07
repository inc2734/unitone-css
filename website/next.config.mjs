import nextra from 'nextra';
import rehypeRestoreCssCustomProperties from './src/plugins/rehype-restore-css-custom-properties.mjs';

const withNextra = nextra({
  mdxOptions: {
    rehypePlugins: [rehypeRestoreCssCustomProperties],
  },
});

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
