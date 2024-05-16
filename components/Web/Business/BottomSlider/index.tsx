'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { ReactNode, useContext, useRef, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';
import Pagination from './Pagination';
import Navigation from './Navigation';

interface BottomSliderProp<T> {
  title: string;
  viewLink?: string;
  list: T[];
  renderItem: (item: T) => ReactNode;
}

function BottomSlider<T extends { id: string }>({ list, title, viewLink, renderItem }: BottomSliderProp<T>) {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="py-[60px]">
      <div className="container mx-auto" ref={containerRef}>
        <div className="flex items-center justify-between">
          <div className="text-h3 text-neutral-off-black">{title}</div>
          {viewLink && (
            <div className="flex items-center gap-[7px]">
              <span>{t('viewAll')}</span>
              <BsArrowRight size={12}></BsArrowRight>
            </div>
          )}
        </div>
        <div>
          <div className="group relative">
            <div className="hidden group-hover:block">
              <Navigation changeState={scrollContainerState} />
            </div>
            <ScrollContainer ref={scrollContainerRef} gap={0} onChange={(state: any) => setScrollContainerState(state)}>
              <div className="mt-[30px] flex">
                {list.map((item) => (
                  <div
                    key={item.id}
                    className={`p-[10px]`}
                    style={{
                      width: `calc((${containerRef.current?.offsetWidth}px)/4)`
                    }}
                  >
                    {renderItem(item)}
                  </div>
                ))}
              </div>
            </ScrollContainer>
          </div>

          <div className="mt-[30px]">
            <Pagination changeState={scrollContainerState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomSlider;