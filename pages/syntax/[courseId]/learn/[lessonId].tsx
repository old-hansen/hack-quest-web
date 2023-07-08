// ./pages/article/[articleId].tsx

import webApi from '@/service';
import {
  CourseLessonType,
  CourseType,
  LessonStyleType
} from '@/service/webApi/course/type';
import wrapper from '@/store/redux';

import type { GetServerSideProps, NextPage } from 'next';

import LessonHeader from '@/components/LessonPages/LessonHeader';
import LessonPageA from '@/components/LessonPages/LessonPageA';

interface IProps {
  lesson: CourseLessonType;
}

const SyntaxUnit: NextPage<IProps> = (props) => {
  const { lesson } = props;

  const renderLessonPage = (style: LessonStyleType) => {
    switch (style) {
      case LessonStyleType.A:
        return (
          <LessonPageA
            lesson={lesson}
            courseType={CourseType.SYNTAX}
          ></LessonPageA>
        );
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <LessonHeader lesson={lesson}></LessonHeader>
        {renderLessonPage(lesson.style)}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      const { lessonId } = context.query;

      let lesson = null;
      try {
        lesson = await webApi.courseApi.getLessonContent(lessonId as any);
      } catch (e: any) {
        // message.error(`Course detail ${e.message}`);
        console.log(e);
        lesson = {};
      }
      return {
        props: {
          lesson: lesson
        }
      };
    };
  });

export default SyntaxUnit;
