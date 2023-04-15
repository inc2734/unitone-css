import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

const preview = {
  parameters: {
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
        a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
  },
};
export default preview;
