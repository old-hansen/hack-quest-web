import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType, ProjectRankType, ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo } from 'react';

import { ProjectDetailContext } from '../../../../../constants/type';
import Title from '../../Title';
import VotingInfo from './VotingInfo';
import YourVotes from './YourVotes';
import YourVoteRole from './YourVoteRole';
import YourTotalVotes from './YourTotalVotes';
import VoteMsg from './VoteMsg';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import dayjs from '@/components/Common/Dayjs';

interface VotingProp {
  project: ProjectType;
  rankInfo: ProjectRankType;
  hackathon: HackathonType;
}

const Voting: React.FC<VotingProp> = ({ project, rankInfo, hackathon }) => {
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { titleTxtData } = useContext(ProjectDetailContext);
  const isEnd = useMemo(() => {
    return dayjs().tz().isAfter(hackathon?.rewardTime);
  }, [hackathon]);
  const isJoin = useMemo(() => {
    return (
      hackathon?.participation?.team?.creatorId === hackathon?.participation?.userId ||
      !Object.keys(hackathon?.participation?.team || {}).length
    );
  }, []);
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={`${t(titleTxtData[1])} for ${project.name}`} />
      {!isEnd && !isJoin && userInfo ? (
        <div className="flex w-full">
          <div className="flex-1 border-r border-neutral-medium-gray pr-[40px] ">
            <VotingInfo project={project} hackathon={hackathon} rankInfo={rankInfo} />
            <YourVotes project={project} hackathon={hackathon} />
          </div>
          <div className="flex flex-1 flex-col justify-between pl-[40px]">
            <YourVoteRole project={project} hackathon={hackathon} />
            <YourTotalVotes project={project} hackathon={hackathon} />
          </div>
        </div>
      ) : (
        <VoteMsg project={project} hackathon={hackathon} rankInfo={rankInfo} isJoin={isJoin} />
      )}
    </div>
  );
};

export default Voting;