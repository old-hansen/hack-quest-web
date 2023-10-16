import IconHack from '@/public/images/mission-center/icon_hack.png';
import IconMetaMask from '@/public/images/mission-center/icon_meta_mask.png';
import IconDiscord from '@/public/images/mission-center/icon_discord_communitypng.png';
import { MissionSubType } from '@/service/webApi/missionCenter/type';

type RewardsCardDataType = {
  [k in MissionSubType]: {
    targetIcon: any;
    unClaimPath: string;
    unClaimText: string;
    isShare?: boolean;
  };
};
export const rewardsCardData: RewardsCardDataType = {
  REGISTER_ACCOUNT: {
    targetIcon: IconHack,
    unClaimPath: '/',
    unClaimText: 'Register Account'
  },
  JOIN_DISCORD: {
    targetIcon: IconDiscord,
    unClaimPath: 'https://discord.gg/HJPqJnW2jw',
    unClaimText: 'Join Discord Community'
  },
  LINK_METAMASK: {
    targetIcon: IconMetaMask,
    unClaimPath: '/',
    unClaimText: 'Link with MetaMask'
  },
  ENROLL_LEARNING_TRACK: {
    targetIcon: IconHack,
    unClaimPath: '/learning-track',
    unClaimText: 'Go to Learning Track'
  },
  INVITE_USER: {
    targetIcon: IconHack,
    unClaimPath: '/',
    unClaimText: 'Share Invite Code',
    isShare: true
  }
};
