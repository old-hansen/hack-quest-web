export enum LaunchPoolProjectStatus {
  UPCOMING = 'upcoming',
  FUELING = 'fueling',
  ALLOCATION = 'allocation',
  AIRDROP = 'airdrop',
  END = 'end'
}

export const LIVE_NOW_STATUS = [
  LaunchPoolProjectStatus.FUELING,
  LaunchPoolProjectStatus.ALLOCATION,
  LaunchPoolProjectStatus.AIRDROP
];
export interface LaunchPoolProjectType {
  id: string;
  name: string;
  lowStakingTime: number;
  lowStakingAmount: number;
  currentStakings: number;
  totalAirdropAmount: number;
  airdropRatio: number;
  chain: string;
  stakingAddress: string;
  launchedAddress: string;
  fuelStart: Date;
  allocationStart: Date;
  airdropStart: Date;
  airdropEnd: Date;
  links: Record<string, string>;
  about: {};
  video: {};
  keyMtrics: [];
  tractions: [];
  status: LaunchPoolProjectStatus;
  createdAt: Date;
  updatedAt: Date;
  totalFuel: number;
  userCount: number;
}

export interface ParticipateInfo {
  totalFuel: number;
  inviteCount: number;
  inviteBy: string;
  rank: number;
  estimatedToken: number;
  isParticipate: boolean;
}

export interface StakeInfo {
  duration: number;
  amount: number;
  status: 'stake';
}

export interface FuelInfo {
  id: string;
  name: string;
  type: string;
  extra: string;
  reward: string;
  sequence: number;
  duration: number;
  amount: number;
  status: 'stake';
  inviteCount: number;
  completed: boolean;
  claimed: boolean;
  launchProjectId: string;
}
