'use client';
import React, { useEffect, useState } from 'react';
import {
  applicationInformationData,
  applicationSortData,
  applicationTabData,
  mockData
} from '../../../../constants/data';
import Tab from '../Tab';
import Search from './Search';
import { InformationType } from '../../../../constants/type';
import CommonTable from './CommonTable';
import { useRequest } from 'ahooks';
import InfoModal from './InfoModal';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';

interface ApplicationProp {}

const Application: React.FC<ApplicationProp> = () => {
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [searchInfo, setSearchInfo] = useState({
    status: applicationTabData[0].value,
    sort: applicationSortData[0].value,
    keyword: ''
  });
  const [tableInformation, setTableInformation] = useState<InformationType[]>(
    applicationInformationData
      .filter((v) => v.disable)
      .map((v) => ({
        value: v.value,
        label: v.label
      }))
  );
  const [open, setOpen] = useState(false);

  const handleSearch = (key: 'sort' | 'keyword', value: string) => {
    setSearchInfo({
      ...searchInfo,
      [key]: value
    });
  };

  const { run: refresh } = useRequest(async () => {});

  useEffect(() => {
    refresh();
  }, [searchInfo]);

  return (
    <div className="flex h-full flex-col gap-[40px]">
      {hackathon?.info?.mode !== 'ONLINE' && (
        <Tab
          curTab={searchInfo.status}
          tabs={applicationTabData}
          changeTab={(tab) =>
            setSearchInfo({
              ...searchInfo,
              status: tab
            })
          }
        />
      )}
      <div className="flex flex-1 flex-col gap-[24px]">
        <Search
          sort={searchInfo.sort}
          handleSearch={handleSearch}
          tableInformation={tableInformation.map((v) => v.value)}
          setTableInformation={(values) => {
            const newTableInformation: InformationType[] = [];
            applicationInformationData.map((v) => {
              values.includes(v.value) && newTableInformation.push(v);
            });
            setTableInformation(newTableInformation);
          }}
        />
        <CommonTable list={mockData} refresh={refresh} information={tableInformation} status={searchInfo.status} />
        <InfoModal open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default Application;
