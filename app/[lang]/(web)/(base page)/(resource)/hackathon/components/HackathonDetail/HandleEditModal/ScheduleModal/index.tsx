import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { HackathonScheduleType, HackathonType } from '@/service/webApi/resourceStation/type';
import { HackathonEditContext, HackathonEditModalType } from '../../../../constants/type';
import { v4 } from 'uuid';
import Edit from './Edit';
import Preview from './Preview';
import Title from '../../Title';
import { IoIosAddCircle } from 'react-icons/io';
import CommonButton from '../CommonButton';
import RemoveSectionModal, { RemoveSectionModalRef } from '../../RemoveSectionModal';
import { cloneDeep } from 'lodash-es';
import { scheduleDefaultValues } from '../../../../constants/data';

interface ScheduleModalProp {
  hackathon: HackathonType;
}

const ScheduleModal: React.FC<ScheduleModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { modalType, setModalType } = useContext(HackathonEditContext);
  const [schedules, setSchedules] = useState<HackathonScheduleType[]>([]);
  const [editIds, setEditIds] = useState<string[]>([]);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);

  const handleRemoveEvent = () => {};

  const handleAdd = () => {};
  useEffect(() => {
    const newSchedules = hackathon.info?.schedule?.list || [];
    setSchedules(newSchedules);
  }, [hackathon]);
  return (
    <div className="">
      <div className="px-[40px]">
        <Title title={'hackathonDetail.schedule'} />
      </div>
      <div className="scroll-wrap-y flex w-full flex-1 flex-col gap-[24px] px-[40px]">
        <div className="flex flex-col gap-[24px]">
          {schedules.map((schedule) =>
            ~editIds.indexOf(schedule.id) ? (
              <Edit
                key={schedule.id}
                hackathon={hackathon}
                schedule={schedule}
                handleRemoveEvent={handleRemoveEvent}
                handleAdd={handleAdd}
              />
            ) : (
              <Preview
                schedule={schedule}
                key={schedule.id}
                handleRemoveEvent={() => handleRemoveEvent()}
                handleEdit={() => setEditIds([...editIds, schedule.id])}
              />
            )
          )}
        </div>
        <div
          className="h-[81px] flex-shrink-0 cursor-pointer rounded-[80px] bg-neutral-off-white p-[5px]"
          onClick={() => {
            const defaultValues = cloneDeep(scheduleDefaultValues);
            const id = v4();
            setEditIds([...editIds, id]);
            setSchedules([
              ...schedules,
              {
                ...defaultValues,
                id
              }
            ]);
          }}
        >
          <div className="flex-center h-full w-full rounded-[80px] border border-dashed border-neutral-light-gray text-neutral-medium-gray">
            <IoIosAddCircle size={32} />
          </div>
        </div>
      </div>

      <CommonButton
        hackathon={hackathon}
        handleSave={() => setModalType(HackathonEditModalType.NULL)}
        cantSubmit={false}
      />
      <RemoveSectionModal ref={removeSectionRef} type={modalType} />
    </div>
  );
};

export default ScheduleModal;
