import React from 'react';
import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import Button from '@/components/Common/Button';
import { CourseTab } from '@/app/(web)/(base page)/(home)/instructor/constants/type';
import UgcTags from './UgcTags';
import { ProjectCourseType } from '@/service/webApi/course/type';

interface UgcCourseCardProp {
  isPublic?: boolean;
  course: ProjectCourseType;
}

const UgcCourseCard: React.FC<UgcCourseCardProp> = ({
  isPublic = true,
  course
}) => {
  const type = CourseTab.PUBLISHED;
  const renderButton = () => {
    switch (type) {
      case CourseTab.PUBLISHED:
        return (
          <>
            <Button
              type="primary"
              className="button-text-s h-[34px] flex-1 uppercase"
            >
              Preview
            </Button>
            <Button
              ghost
              className="button-text-s h-[34px] flex-1 border-neutral-black uppercase"
            >
              edit
            </Button>
          </>
        );
      // case CourseTab.DRAFT:
      //   return (
      //     <>
      //       <Button
      //         type="primary"
      //         className="button-text-s h-[34px] flex-1 uppercase"
      //       >
      //         edit & publish
      //       </Button>
      //     </>
      //   );
      // case CourseTab.UNDER_REVIEW:
      //   return (
      //     <>
      //       <Button
      //         ghost
      //         className="button-text-s h-[34px] flex-1 border-neutral-black uppercase"
      //       >
      //         revoke
      //       </Button>
      //     </>
      //   );
      // case CourseTab.UNPUBLISHED:
      //   return (
      //     <>
      //       <Button
      //         type="primary"
      //         className="button-text-s h-[34px] flex-1 p-0 uppercase"
      //       >
      //         Preview
      //       </Button>
      //       <Button
      //         ghost
      //         className="button-text-s h-[34px] flex-1 border-neutral-black p-0 uppercase"
      //       >
      //         edit & publish
      //       </Button>
      //     </>
      //   );
    }
  };
  return (
    <div className="card-hover overflow-hidden rounded-[16px] bg-neutral-white text-neutral-off-black">
      <div className="relative h-0 w-full pt-[56%]">
        <Image
          src={course.image || ''}
          alt="instructorCover"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex h-[216px] flex-col justify-between p-[16px]">
        <div className="flex flex-col gap-[16px]">
          <TrackTag track={course.track} />
          <div className="body-m-bold line-clamp-2">{course.title}</div>
          <div className="body-s line-clamp-2 text-neutral-medium-gray">
            {course.description}
          </div>
          {!isPublic && <UgcTags isPublic={isPublic} course={course} />}
        </div>
        {!isPublic ? (
          <div className="flex justify-between gap-[8px]">{renderButton()}</div>
        ) : (
          <UgcTags isPublic={isPublic} course={course} />
        )}
      </div>
    </div>
  );
};

export default UgcCourseCard;
