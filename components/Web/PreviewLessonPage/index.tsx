'use client';
import { LessonContent as LessonContentType } from '@/components/Web/Business/Renderer/type';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { ConfigProvider, Spin, message } from 'antd';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import Split from 'react-split';
import LessonContent from '../LessonPage/LessonContent';
import LessonFooter from '../LessonPage/LessonFooter';
import Playground from '../LessonPage/Playground';

interface PreviewLessonPageProps {
  previewUrl: string;
}

const PreviewLessonPage: FC<PreviewLessonPageProps> = (props) => {
  const { previewUrl } = props;
  const [lesson, setLesson] = useState<
    Omit<CourseLessonType, 'content'> & { content: LessonContentType }
  >();

  const [errorMessage, setErrorMessage] = useState('');

  const { run, loading, refresh } = useRequest(
    async (previewUrl) => {
      // const res = await webApi.previewApi.getPreviewLesson(previewUrl);
      // return res;
      const res = await axios.post('/api/preview/lesson', {
        notionPageUrl: previewUrl
      });
      return res.data;
    },
    {
      manual: true,
      onSuccess(res: any) {
        setLesson(res);
      },
      onError(error: any) {
        message.error(error.response?.data.msg);
        setErrorMessage(error.response?.data.msg);
      }
    }
  );

  useEffect(() => {
    run(previewUrl);
  }, [run, previewUrl]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            contentHeight: 400
          }
        },
        token: {
          colorPrimary: '#ffd850'
        }
      }}
    >
      <Spin
        spinning={loading}
        className="h-[100vh] flex justify-center items-center translate-y-[calc(50vh-50%)]"
        tip="loading..."
        size="large"
      >
        {lesson && (
          <div className="relative w-full h-[calc(100vh-115px)] pl-[20px]">
            <Split
              className="flex-1 w-full h-full flex justify-between [&>div]:w-[50%] [&>.gutter]:cursor-col-resize"
              minSize={80}
              cursor="col-resize"
            >
              <LessonContent
                lesson={lesson as any}
                courseType={CourseType.GUIDED_PROJECT}
                isPreview={true}
              ></LessonContent>
              <Playground
                lesson={lesson! as any}
                isPreview={true}
                onCompleted={() => {
                  // 请求下一个lesson
                  message.info('当前是预览模式');
                }}
              ></Playground>
            </Split>
            <LessonFooter lesson={lesson as any} onNextClick={() => {}} />
          </div>
        )}
        {!lesson && !!errorMessage && (
          <div className="text-[18px] text-text-default-color">
            {errorMessage}
          </div>
        )}
      </Spin>
    </ConfigProvider>
  );
};

export default PreviewLessonPage;