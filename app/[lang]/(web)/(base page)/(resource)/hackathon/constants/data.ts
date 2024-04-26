import { MotionProps } from 'framer-motion';

export const projectSort = [
  {
    label: 'Latest to oldest',
    value: '-openTime'
  },
  {
    label: 'Oldest to latest',
    value: 'openTime'
  }
];

export const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '95%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 0 }
};

export const hackathonDetailTimeLine = [
  {
    key: 'registrationOpen',
    time: 'openTime'
  },
  {
    key: 'submissionsClose',
    time: 'reviewTime'
  },
  {
    key: 'rewardAnnouncement',
    time: 'rewardTime'
  }
];
