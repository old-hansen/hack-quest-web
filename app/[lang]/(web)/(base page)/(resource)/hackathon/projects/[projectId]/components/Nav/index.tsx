'use client';
import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { OffsetTopsType, ProjectDetailContext } from '../../../../constants/type';

interface NavProp {
  handleClickAnchor: (index: number) => void;
  curAnchorIndex: number;
  offsetTops: OffsetTopsType[];
}

const Nav: React.FC<NavProp> = ({ handleClickAnchor, curAnchorIndex }) => {
  const { lang } = useContext(LangContext);
  const { titleTxtData } = useContext(ProjectDetailContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="body-l sticky left-0 top-[40px] w-[365px] pr-[40px] ">
      {titleTxtData.map((v, i) => (
        <div
          key={v}
          onClick={() => handleClickAnchor(i)}
          className={`mb-[4px] flex h-[42px] cursor-pointer items-center overflow-hidden rounded-l-[8px] border-l-[9px]  pl-[28px] ${i === curAnchorIndex ? 'border-yellow-primary bg-neutral-white text-neutral-black' : 'border-transparent text-neutral-medium-gray'}`}
        >
          {t(v)}
        </div>
      ))}
    </div>
  );
};

export default Nav;
