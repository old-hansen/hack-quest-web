'use client';
import Image from 'next/image';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { IoIosMail } from 'react-icons/io';
import { IoLogoWechat } from 'react-icons/io5';
import { FaTelegramPlane } from 'react-icons/fa';
import { ProjectMemberType } from '@/service/webApi/resourceStation/type';
import { copyText } from '@/helper/utils';

interface TeamCardProp {
  member: ProjectMemberType;
}

const TeamCard: React.FC<TeamCardProp> = ({ member }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="shaow-[0_0_8px_0_rgba(rgba(0,0,0,0.12))] flex gap-[1rem] rounded-[1rem] bg-neutral-white p-[.75rem] text-neutral-off-black">
      <div className="flex-shrink-0">
        <div className="relative h-[5.25rem] w-[5.25rem] overflow-hidden rounded-[50%]">
          <Image src={member.avatar} alt={member.firstName} fill className="object-cover" />
        </div>
        <div className="mt-[.5rem] flex justify-between">
          {member.email && <IoIosMail size={16} className="cursor-pointer" onClick={() => copyText(member.email)} />}
          {member.weChat && (
            <IoLogoWechat size={16} className="cursor-pointer" onClick={() => copyText(member.weChat)} />
          )}
          {member.telegram && (
            <FaTelegramPlane size={16} className="cursor-pointer" onClick={() => copyText(member.telegram)} />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-shrink-0 flex-col">
        <div className="h-[5.25rem]">
          <h2 className="body-s-bold line-clamp-1">{`${member.firstName}${member.lastName}`}</h2>
          <p className="body-xs line-clamp-1 text-neutral-rich-gray">
            {member.isAdmin ? t('projectsDetail.teamLeader') : t('projectsDetail.teamMember')}
          </p>
          <p className="body-xs mt-[.25rem] line-clamp-2 h-[58px] w-full  text-neutral-medium-gray">{member.bio}</p>
        </div>
        {/* <div className="body-xs mt-[.5rem] flex w-full justify-end">
          <span>{t('learnMore')}</span>
        </div> */}
      </div>
    </div>
  );
};

export default TeamCard;
