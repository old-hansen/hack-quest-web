'use client';
import {
  HackathonInfoSectionCustomType,
  HackathonStatusType,
  HackathonType,
  HackathonVoteJudgeType,
  ProjectType,
  ProjectVotesType
} from '@/service/webApi/resourceStation/type';
import { createContext } from 'react';

export interface OffsetTopsType {
  title: string;
  offsetTop: number;
}

export enum ViewValue {
  AGENDA = 'agenda',
  GRID = 'grid',
  CALENDAR = 'calendar'
}

export interface VoteDataType {
  vote: number;
  projectId: string;
}

export interface HackathonVoteContextType {
  voteData: VoteDataType[];
  setVoteData: (data: VoteDataType[]) => void;
  view: ViewValue;
  setView: (view: ViewValue) => void;
  remainingVotes: number;
  setRemainingVotes: (count: number) => void;
  hackathon: HackathonType;
  totalLeftVotes: number;
  setTotalLeftVotes: (count: number) => void;
  judgeInfo: HackathonVoteJudgeType;
  setJudgeInfo: (data: HackathonVoteJudgeType) => void;
}

export const HackathonVoteContext = createContext<HackathonVoteContextType>({
  voteData: [],
  setVoteData: () => {},
  view: ViewValue.AGENDA,
  setView: () => {},
  remainingVotes: 0,
  setRemainingVotes: () => {},
  hackathon: {} as HackathonType,
  totalLeftVotes: 0,
  setTotalLeftVotes: () => {},
  judgeInfo: {} as HackathonVoteJudgeType,
  setJudgeInfo: () => {}
});

export interface ProjectDetailContextType {
  titleTxtData: string[];
  hackathon: HackathonType;
  project: ProjectType;
  projectVote: ProjectVotesType;
  isShowVoting: boolean;
}

export const ProjectDetailContext = createContext<ProjectDetailContextType>({
  titleTxtData: [],
  hackathon: {} as HackathonType,
  project: {} as ProjectType,
  projectVote: {} as ProjectVotesType,
  isShowVoting: false
});

export interface HackathonEditNavType {
  label: string;
  value: string;
}

export enum HackathonEditModalType {
  NULL = '',
  LIST = 'list',
  COVER = 'cover',
  INFO = 'info',
  TIMELINE = 'timeline',
  REWARDS = 'rewards',
  JUDGE = 'judge',
  APPLICATION = 'application',
  SUBMISSION = 'submission',
  LINKS = 'links',
  MEDIA_PARTNERS = 'mediaPartners',
  COMMUNITY_PARTNERS = 'communityPartners',
  PARTNERS = 'partners',
  SPEAKERS = 'speakers',
  SPONSORS = 'sponsors',
  SCHEDULE = 'schedule',
  FAQS = 'faqs',
  CUSTOM = 'custom',
  CUSTOM_TEXT = 'customText',
  CUSTOM_IMAGE_NAME = 'customTextImageName',
  CUSTOM_IMAGE_TITLE = 'customTextImageTitle'
}

export enum AddSectionType {
  MEDIA_PARTNERS = 'mediaPartners',
  COMMUNITY_PARTNERS = 'communityPartners',
  PARTNERS = 'partners',
  SPEAKERS = 'speakers',
  SPONSORS = 'sponsors',
  SCHEDULE = 'schedule',
  FAQS = 'faqs'
}

export interface UpdateHackathonParamType {
  data: Record<string, any>;
  status?: string;
  closeModal?: boolean;
  cb?: VoidFunction;
}
export interface HackathonEditContextType {
  navs: HackathonEditNavType[];
  modalType: HackathonEditModalType;
  setModalType: (type: HackathonEditModalType) => void;
  updateHackathon: (param: UpdateHackathonParamType) => void;
  refreshHackathon: VoidFunction;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isEdit: boolean;
  modalEditType: 'add' | 'edit' | '';
  setModalEditType: (type: 'add' | 'edit' | '') => void;
  editCustomInfo: HackathonInfoSectionCustomType | null;
  setEditCustomInfo: (info: HackathonInfoSectionCustomType | null) => void;
  hackathonCustomDelete: VoidFunction;
}

export const HackathonEditContext = createContext<HackathonEditContextType>({
  navs: [],
  modalType: HackathonEditModalType.NULL,
  setModalType: () => {},
  updateHackathon: () => {},
  refreshHackathon: () => {},
  loading: true,
  setLoading: () => {},
  isEdit: false,
  modalEditType: '',
  setModalEditType: () => {},
  editCustomInfo: null,
  setEditCustomInfo: () => {},
  hackathonCustomDelete: () => {}
});

export interface HackathonDetailContextType {
  navs: HackathonEditNavType[];
}

export const HackathonDetailContext = createContext<HackathonDetailContextType>({
  navs: []
});

export interface HackathonTabType {
  label: string;
  value: HackathonStatusType;
  count?: number;
}
