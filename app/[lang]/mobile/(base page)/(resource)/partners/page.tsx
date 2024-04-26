import MenuLink from '@/constants/MenuLink';
import { Lang } from '@/i18n/config';
import { Metadata } from 'next';
import React from 'react';
import PartnersBanner from './components/PartnersBanner';
import PartnerData from './components/PartnerData';
import PartnerList from './components/PartnerList';
import PartnerCase from './components/PartnerCase';
import MobLandingFooter from '@/components/Mobile/MobLandingFooter';

interface PartnersProp {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata({ params }: PartnersProp): Promise<Metadata> {
  const { lang } = params;

  const metadata: Metadata = {
    title: 'HackQuest Partners',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.PARTNERS}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.PARTNERS}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.PARTNERS}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.PARTNERS}`
      }
    }
  };

  return metadata;
}

const Partners: React.FC<PartnersProp> = ({ params }) => {
  const { lang } = params;
  return (
    <div className="flex flex-col gap-[5rem]">
      <PartnersBanner lang={lang} />
      <div className="flex flex-col gap-[5rem] px-[1.25rem]">
        <PartnerData lang={lang} />
        <PartnerList lang={lang} />
      </div>
      <PartnerCase lang={lang} />
      <div>
        <MobLandingFooter lang={lang} />
      </div>
    </div>
  );
};

export default Partners;
