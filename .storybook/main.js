module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/stories/*.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    '@whitespace/storybook-addon-html',
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  "staticDirs": ['../dist']
}
