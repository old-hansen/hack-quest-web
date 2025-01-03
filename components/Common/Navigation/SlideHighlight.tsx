'use client';
import { useUserStore } from '@/store/zustand/userStore';
import { CSSProperties, FC, MouseEventHandler, useEffect, useRef, useState } from 'react';

export enum SlideClassName {
  FIST_NAVBAR = 'slide-navigator slide-navigator-fist-navbar',
  SECOND_NAVBAR = 'slide-navigator slide-navigator-second-navbar',
  BLOG_FILTER = 'slide-blog-navigator',
  LEARNING_TRACK = 'slide-navigator slide-learning-track-navbar',
  GLOSSARY_FILTER = 'slide-glossary-navigator',
  GROWTH_TAB = 'slide-growth-tab',
  VARIOUS_ECHARTS_TAB = 'slide-various-echarts-tab'
}

interface SlideHighlightProps {
  children: React.ReactNode;
  className: string;
  type?:
    | 'FIST_NAVBAR'
    | 'SECOND_NAVBAR'
    | 'BLOG_FILTER'
    | 'LEARNING_TRACK'
    | 'GLOSSARY_FILTER'
    | 'GROWTH_TAB'
    | 'VARIOUS_ECHARTS_TAB';
  currentIndex: number;
}

type SlideNavigatorHighlight = CSSProperties & {
  '--highlight-x'?: string;
  '--highlight-width'?: string;
};

const SlideHighlight: FC<SlideHighlightProps> = function (props) {
  const userInfo = useUserStore((state) => state.userInfo);
  const { className, children, type = 'FIST_NAVBAR', currentIndex } = props;
  const theClassName = `${className} ${SlideClassName[type]}`;
  const root = useRef<HTMLDivElement>(null);
  const [navStyle, setNavStyle] = useState<SlideNavigatorHighlight>();

  const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!root.current) return;
    const target = Array.from(root.current.children).find((v) => v.contains(event.target as Node)) as HTMLElement;
    const { left } = root.current.getBoundingClientRect();
    const { left: l, width } = target?.getBoundingClientRect() || {};
    if (!width) return;
    setNavStyle({
      '--highlight-x': `${l - left}px`,
      '--highlight-width': `${width}px`
    });
  };

  useEffect(() => {
    if (!root.current) return;

    if (currentIndex === -1) {
      setNavStyle({
        '--highlight-width': `0px`
      });
      return;
    }

    const { left } = root.current.getBoundingClientRect();
    const target = root.current.children[currentIndex] as HTMLElement;
    const { left: l, width } = target?.getBoundingClientRect() || {};
    setNavStyle({
      '--highlight-x': `${l - left}px`,
      '--highlight-width': `${width}px`
    });
  }, [currentIndex, userInfo]);

  return (
    <div ref={root} className={theClassName} style={navStyle} onClick={onClick}>
      {children}
    </div>
  );
};

export default SlideHighlight;
