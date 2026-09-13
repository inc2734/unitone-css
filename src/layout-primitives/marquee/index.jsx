'use client';

import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { getMarqueeParts, markMarqueeCopy, measureMarquee, observeMarquee } from './layout';

const useMarqueeLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

// Copied elements must not attach caller-owned refs to additional DOM nodes.
const copyMarqueeChildren = (children) =>
  React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    const props =
      child.type === React.Fragment
        ? {}
        : { ref: null, autoFocus: false, 'aria-hidden': true, inert: true };
    if ('children' in child.props) props.children = copyMarqueeChildren(child.props.children);
    return React.cloneElement(child, props);
  });

export const Marquee = React.forwardRef(function Marquee(
  { duration, gap, itemWidth, reverse, pauseOnHover, style, children, ...props },
  forwardedRef,
) {
  const wrapperRef = useRef(null);
  const controllerRef = useRef(null);
  const [layout, setLayout] = useState({ groups: 0, distance: 0, rtl: false });
  useImperativeHandle(forwardedRef, () => wrapperRef.current, []);

  useMarqueeLayoutEffect(() => {
    const target = wrapperRef.current;
    const controller = observeMarquee(target, () => {
      const parts = getMarqueeParts(target);
      parts.copies.forEach(markMarqueeCopy);
      const next = measureMarquee(target, parts);
      setLayout((current) =>
        current.groups === next.groups &&
        current.rtl === next.rtl &&
        Math.abs(current.distance - next.distance) < 0.001
          ? current
          : next,
      );
    });
    controllerRef.current = controller;
    return () => {
      controllerRef.current = null;
      controller.dispose();
    };
  }, []);

  // React owns all child insertions and removals; remeasure after each committed render.
  useMarqueeLayoutEffect(() => controllerRef.current?.refresh());

  style = {
    ...style,
    ...(duration != null && duration !== '' ? { '--unitone--animation-duration': duration } : {}),
    ...(itemWidth != null && itemWidth !== '' ? { '--unitone--item-width': itemWidth } : {}),
  };

  return (
    <div
      data-unitone-layout={[
        'marquee-wrapper',
        reverse ? '-reverse' : undefined,
        pauseOnHover ? '-pause-on-hover' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
      ref={wrapperRef}
      data-unitone-marquee-react=""
    >
      <div
        data-unitone-layout={[
          'marquee',
          '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
          layout.distance > 0 ? 'marquee:initialized' : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          '--unitone--marquee-travel': `${layout.rtl ? layout.distance : -layout.distance}px`,
        }}
      >
        <React.Fragment key="original">{children}</React.Fragment>
        <span data-unitone-marquee-boundary="" hidden />
        {Array.from({ length: layout.groups }, (_, index) => (
          <React.Fragment key={`copy:${index}`}>{copyMarqueeChildren(children)}</React.Fragment>
        ))}
      </div>
    </div>
  );
});
