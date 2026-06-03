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
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath || '',
  },
  images: {
    unoptimized: true,
  },
  basePath,
  trailingSlash: true,
});
