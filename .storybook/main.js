import remarkGfm from 'remark-gfm';

const config = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/stories/*.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true
    }
  },
  core: {},
  staticDirs: ['../dist'],
  docs: {
    autodocs: true
  },
};
export default config;
