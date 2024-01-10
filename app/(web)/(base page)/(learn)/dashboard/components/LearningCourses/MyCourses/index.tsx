'use client';
import Loading from '@/components/Common/Loading';
import webApi from '@/service';
import { ProjectCourseType, ProcessType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { useEffect, useState } from 'react';
import LearningTrackList from './LearningTrackList';
import NoData from './NoData';
import { courseTab } from './data';
import Tab from '@/components/Web/Business/Tab';
import { TabListType } from '@/components/Web/Business/Tab/type';
import CourseSlider from '@/components/Web/Business/CourseSlider';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';

function MyCourses() {
  const [curTab, setCurTab] = useState<ProcessType>(ProcessType.IN_PROCESS);
  const [loading, setLoading] = useState(false);
  const [practicesListData, setPracticesListData] = useState<
    Record<ProcessType, ProjectCourseType[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const [miniElectiveListData, setMiniElectiveListData] = useState<
    Record<ProcessType, ElectiveCourseType[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const [learningTrackListData, setLearningTrackListData] = useState<
    Record<ProcessType, LearningTrackDetailType[]>
  >({
    [ProcessType.IN_PROCESS]: [],
    [ProcessType.COMPLETED]: []
  });
  const getPracticesList = () => {
    return new Promise(async (resolve) => {
      const res = await webApi.courseApi.getCourseListBySearch({
        status: curTab
      });
      const newData = {
        ...practicesListData,
        [curTab]: res.data
      };
      setPracticesListData(newData);
      resolve(false);
    });
  };

  const getLearningTrackList = () => {
    return new Promise(async (resolve) => {
      const list = await webApi.learningTrackApi.getLearningTracks({
        status: curTab
      });
      const newData = {
        ...learningTrackListData,
        [curTab]: list
      };
      setLearningTrackListData(newData);
      resolve(true);
    });
  };

  const getElectiveList = () => {
    return new Promise(async (resolve) => {
      const res = await webApi.electiveApi.getElectives({
        status: curTab
      });
      const newData = {
        ...miniElectiveListData,
        [curTab]: res.data
      };
      setMiniElectiveListData(newData);
      resolve(false);
    });
  };

  const changeTab = (tab: TabListType) => {
    setCurTab(tab.value as ProcessType);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getPracticesList(),
      getLearningTrackList(),
      getElectiveList()
    ]).finally(() => {
      setLoading(false);
    });
  }, [curTab]);
  return (
    <>
      <h2 className="text-[#131313] text-4xl font-next-poster-Bold tracking-[2.4px] mb-5">
        My Courses
      </h2>
      <Tab
        tabList={courseTab}
        curTab={curTab}
        changeTab={changeTab}
        className="pb-10"
      />
      <Loading loading={loading}>
        {!practicesListData[curTab].length &&
        !learningTrackListData[curTab].length ? (
          <NoData curTab={curTab} />
        ) : (
          <div className="flex flex-col gap-y-10">
            <LearningTrackList list={learningTrackListData[curTab]} />
            <div className="flex flex-col gap-4">
              <CourseSlider
                list={practicesListData[curTab]}
                // curTab={curTab}
                title="Practices"
                renderItem={(course) => {
                  return (
                    <PracticeCard
                      key={course.id}
                      course={course}
                    ></PracticeCard>
                  );
                }}
              />
              <CourseSlider
                list={miniElectiveListData[curTab]}
                renderItem={(course) => {
                  return (
                    <ElectiveCard
                      key={course.id}
                      course={course}
                    ></ElectiveCard>
                  );
                }}
                title="Electives"
              />
            </div>
          </div>
        )}
      </Loading>
    </>
  );
}

export default MyCourses;