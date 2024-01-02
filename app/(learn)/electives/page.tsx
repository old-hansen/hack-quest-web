'use client';
import Title from '@/components/v1/Head/Title';
import { useEffect, useRef, useState } from 'react';
import CourseListPageHeader from '@/components/v2/Business/CourseListPageHeader';
import CourseSlider from '@/components/v2/Business/CourseSlider';
import { CourseFilterListType } from '@/components/v2/Business/CourseFilterList';
import webApi from '@/service';
import ElectiveCard from '@/components/v2/Business/ElectiveCard';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import CourseFilterListSearch from './components/CourseFilterListSearch';
import CourseFilterListDefault from './components/CourseFilterListDefault';

function ElectivesPage() {
  const selectiveCoursesRef = useRef<HTMLDivElement | null>(null);
  const [loadNum, setLoadNum] = useState(0);
  const [apiStatus, setApiStatus] = useState('init');
  const [topElectives, setTopElectives] = useState<ElectiveCourseType[]>([]);

  const [searchKeyword, setSearchKeyword] = useState('');

  const [type, setType] = useState<CourseFilterListType>(
    CourseFilterListType.DEFAULT
  );

  const handleScroll = () => {
    if (apiStatus !== 'init') return;
    const clientHeight = selectiveCoursesRef.current?.clientHeight || 0;
    const scrollTop = selectiveCoursesRef.current?.scrollTop || 0;
    const scrollHeight = selectiveCoursesRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setLoadNum((num) => num + 1);
    }
  };

  const onSearch = (value: string) => {
    setSearchKeyword(value);
    if (!value) {
      setType(CourseFilterListType.DEFAULT);
      return;
    }
    setType(CourseFilterListType.SEARCH);
  };

  const loadTopCourses = () => {
    webApi.electiveApi.getElectives({}).then((res) => {
      setTopElectives(res.data);
    });
  };

  useEffect(() => {
    loadTopCourses();
  }, []);

  return (
    <div
      className="h-full overflow-auto"
      onScroll={handleScroll}
      ref={selectiveCoursesRef}
    >
      <Title title="Electives" />
      <div className="container mx-auto ">
        <CourseListPageHeader
          title="Electives"
          description="Each elective course is relatively short and independent, with a focused topic. You will  learn how to build a project step by step."
          coverImageUrl={'/images/course/course_cover/elective_cover.png'}
          coverWidth={523}
          coverHeight={277}
          onSearch={onSearch}
        ></CourseListPageHeader>
        {!!topElectives?.length && type === CourseFilterListType.DEFAULT && (
          <CourseSlider
            title="Top Electives"
            renderItem={(course) => {
              return (
                <ElectiveCard
                  key={course.id}
                  course={course as ElectiveCourseType}
                ></ElectiveCard>
              );
            }}
            list={topElectives}
          ></CourseSlider>
        )}
        {type === CourseFilterListType.DEFAULT && (
          <div className="mt-[60px]">
            <CourseFilterListDefault></CourseFilterListDefault>
          </div>
        )}
        {type === CourseFilterListType.SEARCH && (
          <CourseFilterListSearch
            keyword={searchKeyword}
          ></CourseFilterListSearch>
        )}
        {/*
        <SelectiveCoursesBox
          loadNum={loadNum}
          setApiStatus={(status) => setApiStatus(status)}
          apiStatus={apiStatus}
        /> */}
      </div>
    </div>
  );
}

export default ElectivesPage;
