import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    extractComponentDescription: ((_, { notes }) => notes?.readme),
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Primary />
        <ArgsTable story={PRIMARY_STORY} />
        <Description />
        <Stories />
      </>
    ),
    source: {
      code: '',
    }
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
}
