import React from 'react';
import EventsBanner from './components/EventsBanner';
import UpcomingEvents from './components/UpcomingEvents';
import PastEvents from './components/PastEvents';
import ExploreMore from './components/ExploreMore';
import Reach from './components/Reach';
import LandingFooter from '@/components/Web/Business/LandingFooter';
import { Lang } from '@/i18n/config';

interface EventsProp {
  params: {
    lang: Lang;
  };
}

const Events: React.FC<EventsProp> = ({ params: { lang } }) => {
  return (
    <div>
      <EventsBanner />
      <UpcomingEvents />
      <PastEvents />
      <ExploreMore />
      <Reach />
      <LandingFooter lang={lang} />
    </div>
  );
};

export default Events;
