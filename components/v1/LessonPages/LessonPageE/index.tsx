import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { FC, useEffect, useState } from 'react';
import Button from '@/components/v2/Common/Button';
import { useSearchParams } from 'next/navigation';
import {
  useBackToPrevLesson,
  useGotoNextLesson
} from '@/hooks/useCoursesHooks/useGotoNextLesson';
import webApi from '@/service';
import SessionRenderer from '@/components/v1/NotionRender/SessionRenderer';
interface LessonPageDProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageD: FC<LessonPageDProps> = (props) => {
  const { lesson, courseType } = props;
  const query = useSearchParams();
  const courseName = query.get('courseId');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // const sections = useParseLessonBSection(lesson.content);
  const { onNextClick } = useGotoNextLesson(lesson, courseType, true);
  const { isFirst, onBackClick } = useBackToPrevLesson(lesson, courseType);
  useEffect(() => {
    setIsCompleted(false);
    if (lesson) {
      webApi.courseApi.startLesson(lesson.id).catch((e) => {
        console.log('开始学习失败', e);
      });
    }
  }, [lesson]);

  return (
    <div className="w-full h-[80vh] relative flex mt-[1.25rem] text-white  bg-lesson-content-global-bg rounded-[2.5rem]">
      <div className="w-[47rem] h-full rounded-[2.5rem] bg-[url('/images/lesson/lesson_type_e_cover.jpg')] bg-no-repeat bg-cover bg-center"></div>
      <div className="flex-1 px-[3rem] py-[2.5rem]">
        <SessionRenderer
          type={'session'}
          source={lesson.content}
          parent={{ ...lesson, isRoot: true }}
          onCompleteStateChange={(value: boolean) => setIsCompleted(value)}
        ></SessionRenderer>
      </div>
      <div className="absolute bottom-10 right-10">
        {!isFirst && (
          <Button
            onClick={onBackClick}
            className="bg-lesson-ghost-button-bg text-lesson-ghost-button-text-color border border-lesson-ghost-border-color px-[3rem] py-[1rem]"
          >
            Back
          </Button>
        )}
        {isCompleted && (
          <Button
            onClick={() => onNextClick()}
            className="bg-lesson-primary-button-bg text-lesson-primary-button-text-color border border-lesson-primary-button-border-color font-next-book px-[3rem] py-[1rem]"
          >
            Next
          </Button>
        )}
      </div>
      {/* <CompleteModal
        title={courseName as string}
        open={completeModalOpen}
        onClose={() => setCompleteModalOpen(false)}
      ></CompleteModal> */}
    </div>
  );
};

export default LessonPageD;