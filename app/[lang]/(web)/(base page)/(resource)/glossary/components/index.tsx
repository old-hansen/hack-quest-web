'use client';
import React, { useEffect, useRef, useState } from 'react';
import GlossaryHeader from './GlossaryHeader';
import NoData from './NoData';
import MenuLink from '@/constants/MenuLink';
import { BlogType, ResourceFrom } from '@/service/webApi/resourceStation/type';
import FilterLetter from './FilterLetter';
import FilterTrack from './FilterTrack';
import GlossaryList, { GlossaryListType, OffsetTopsType } from './GlossaryList';
import BlogFooter from '../../blog/components/BlogFooter';
import { useRedirect } from '@/hooks/router/useRedirect';
import { getSearchParamsUrl } from '@/helper/utils';

interface GlossaryPageProp {
  galossaryList: BlogType[];
  searchParams: { keyword?: string; category?: string };
}

const GlossaryPage: React.FC<GlossaryPageProp> = ({ galossaryList, searchParams }) => {
  const [list, setList] = useState<GlossaryListType[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);
  const [letter, setLetter] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const timerOut = useRef<NodeJS.Timeout | null>(null);
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([]);
  const [letterData, setLetterData] = useState<string[]>([]);
  const { redirectToUrl } = useRedirect();
  const letterClick = (val: string) => {
    setLetter(val);
  };

  const trackClick = (val: string) => {
    const newTracks = ~tracks.indexOf(val) ? tracks.filter((v) => v !== val) : [...tracks, val];
    const url = getSearchParamsUrl(
      {
        category: newTracks.join(',')
      },
      MenuLink.GLOSSARY
    );
    redirectToUrl(url);
  };
  const getTrackList = () => {
    const newTracks = searchParams.category?.split(',') || [];
    setTracks(newTracks);
    if (!newTracks.length) {
      dealList(galossaryList);
    } else {
      const newList = galossaryList.filter((v) => v.tracks.some((c) => newTracks.includes(c)));
      dealList(newList);
    }
  };
  const dealList = (gList: BlogType[]) => {
    let newGlossaryList: GlossaryListType[] = [];
    let letters: string[] = [];
    let k = '';
    gList.forEach((v) => {
      const firstLetter = v.title.charAt(0).toUpperCase();
      if (/\w/.test(firstLetter)) {
        if (firstLetter !== k) {
          k = firstLetter;
          letters.push(firstLetter);
          const obj = {
            letter: firstLetter,
            list: [v]
          };
          newGlossaryList.push(obj);
        } else {
          const index = newGlossaryList.findIndex((g) => g.letter === firstLetter);
          newGlossaryList[index].list.push(v);
        }
      }
    });
    if (!letter) {
      setLetter(letters[0] || '');
    }
    setLetterData(letters);
    setList(newGlossaryList);
  };
  const onScroll = () => {
    if (!letterData.length || timerOut.current) return;
    timerOut.current = setTimeout(() => {
      timerOut.current = null;
      const boxScrollTop = boxRef.current?.scrollTop || 0;
      const letterOffsetTop = letterRef.current?.offsetTop || 0;
      setIsSticky(boxScrollTop >= letterOffsetTop - 1);
      for (let i = 0; i < offsetTops.length; i++) {
        if (boxScrollTop >= offsetTops[offsetTops.length - 1].offsetTop - 80) {
          setLetter(offsetTops[offsetTops.length - 1].letter);
          break;
        } else if (boxScrollTop >= offsetTops[i].offsetTop - 80 && boxScrollTop < offsetTops[i + 1].offsetTop - 80) {
          setLetter(offsetTops[i].letter);
          break;
        }
      }
    }, 150);
  };
  useEffect(() => {
    getTrackList();
  }, [galossaryList]);

  return (
    <div ref={boxRef} className="scroll-wrap-y relative h-full" onScroll={onScroll}>
      <div className="container mx-auto">
        <GlossaryHeader keyword={searchParams.keyword || ''} />
      </div>

      {!searchParams.keyword && (
        <>
          {letterData.length > 0 && (
            <div className="sticky left-0 top-0 z-[10] w-full" ref={letterRef}>
              <FilterLetter letterData={letterData} letterClick={letterClick} isSticky={isSticky} letter={letter} />
            </div>
          )}

          <FilterTrack tracks={tracks} trackClick={trackClick} />
        </>
      )}
      <div className="container  mx-auto  pb-[70px]">
        {searchParams.keyword ? (
          <div className="body-xl mb-[40px] text-center text-neutral-black">
            {galossaryList.length} Results for
            <span className="pl-[4px] text-neutral-medium-gray">“{searchParams.keyword}”</span>
          </div>
        ) : null}
        {list.length > 0 ? (
          <GlossaryList list={list} setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)} />
        ) : (
          <NoData href={MenuLink.GLOSSARY} keyword={searchParams.keyword}></NoData>
        )}
      </div>
      {list.length === 0 || searchParams.keyword ? <BlogFooter from={ResourceFrom.GLOSSARY} /> : null}
    </div>
  );
};

export default GlossaryPage;