import { Decorator } from '@inc2734/unitone-css';
import NextImage from 'next/image';
import getConfig from 'next/config';

export function PreviewConainer({ backgroundColor, color, ...props }) {
  return (
    <div style={{ marginBlock: '1rem' }}>
      <div data-unitone-layout="-root:typography">
        <Decorator
          backgroundColor={backgroundColor || 'var(--unitone--color--light-gray)'}
          color={color || 'var(--unitone--color--text)'}
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

  return <NextImage {...props} src={`${basePath}${props.src}`} />;
}

export function Badge(props) {
  return (
    <span style={{ background: '#3730a3', padding: '.5em', fontSize: '14px', borderRadius: '4px' }}>
      {props.children}
    </span>
  );
}

export function ColorTile({ color }) {
  return (
    <div
      style={{ background: color, height: '2rem', width: '2rem', border: '1px solid #ffffff11' }}
    />
  );
}
