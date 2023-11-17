import { Decorator } from '@inc2734/unitone-css';
import NextImage from 'next/image';
import getConfig from 'next/config';

export function PreviewConainer(props) {
  return (
    <div style={{ marginBlock: '1rem' }}>
      <div data-unitone-layout="-root:typography">
        <Decorator
          backgroundColor="var(--unitone--color--light-gray)"
          color="var(--unitone--color--text)"
        >
          <Decorator
            padding={1}
            borderWidth="1px"
            borderColor="#ffffff10"
            backgroundColor="#ffffff0f"
            overflow="hidden"
          >
            {props.children}
          </Decorator>
        </Decorator>
      </div>
    </div>
  );
}

export function Image(props) {
  const { publicRuntimeConfig } = getConfig();
  const basePath = (publicRuntimeConfig && publicRuntimeConfig.basePath) || '';

  return <NextImage src={`${basePath}${props.src}`} {...props} />;
}

export function Badge(props) {
  return <span style={{ background: '#3730a3', padding: '.5em', fontSize: '14px', borderRadius: '4px' }}>{props.children}</span>
}
