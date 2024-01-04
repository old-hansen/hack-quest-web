import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import CourseTags from '@/components/v2/Business/CourseTags';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';
import { cn } from '@/helper/utils';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
interface MobLearningTrackCardProps {
  learningTrack: LearningTrackDetailType;
  isLandingPage?: boolean;
  status?: LearningTrackCourseType;
  className?: string;
}
const MobLearningTrackCard: React.FC<MobLearningTrackCardProps> = ({
  learningTrack: track,
  isLandingPage,
  className
}) => {
  const { redirectToUrl } = useRedirect();
  const [learningTrack, setLearningTrack] =
    useState<LearningTrackDetailType>(track);

  useEffect(() => {
    setLearningTrack(track);
  }, [track]);

  const goLearningTrackDetail = (e: any) => {
    if (isLandingPage) return;
    redirectToUrl(
      `${menuLink.learningTrack}/${learningTrack.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrack.id}&menu=${Menu.LEARNING_TRACK}`
    );
  };

  return (
    <div
      className={cn(
        ' w-full  p-[1.25rem] flex flex-col gap-[1.25rem] cursor-pointer rounded-[1rem] bg-[var(--neutral-white)] overflow-hidden',
        className
      )}
      onClick={goLearningTrackDetail}
    >
      <div className="flex w-full justify-between">
        <div className="text-h6-mob h-fit w-fit px-[0.625rem] py-[0.25rem] text-[var(--neutral-off-black)] border border-[#3E3E3E] rounded-[1.25rem] ">
          {learningTrack.track}
        </div>
        <div className="w-[3rem] h-[3rem] relative">
          <Image
            src={learningTrack.image || LearningTrackImg}
            fill
            alt="learning-track-img"
            className="object-cover"
          ></Image>
        </div>
      </div>
      <div className="w-[calc(100%-3rem)] text-[var(--neutral-off-black)] text-h4-mob line-clamp-1 mt-[-1.8rem]">
        {learningTrack.name}
      </div>
      <div className="text-h6-mob-m  text-[var(--neutral-medium-gray)]  line-clamp-2">
        {learningTrack.description}
      </div>
      <div>
        <CourseTags
          language={learningTrack.language}
          level={learningTrack?.level as string}
          unitCount={learningTrack?.courseCount}
          type={'learning-track'}
          className="justify-between text-h6-mob text-[var(--neutral-rich-gray)]"
        ></CourseTags>
      </div>
    </div>
  );
};

export default MobLearningTrackCard;
