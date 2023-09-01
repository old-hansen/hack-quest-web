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
import { useMemo } from 'react';

interface IProps {
  // lesson: CourseLessonType;
}

const SyntaxUnit: NextPage<IProps> = (props) => {
  return (
    <>
      <div className="w-full h-full flex flex-col"></div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(function (store) {
    return async (context) => {
      const { lessonId } = context.query;

      let lesson = null;
      try {
        lesson = await webApi.courseApi.getLessonContent(lessonId as string);
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