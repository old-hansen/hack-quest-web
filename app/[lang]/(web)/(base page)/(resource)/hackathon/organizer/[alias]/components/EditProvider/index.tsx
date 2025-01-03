import React, { ReactNode, useEffect, useState } from 'react';
import webApi from '@/service';
import { HackathonInfoSectionCustomType, HackathonType } from '@/service/webApi/resourceStation/type';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';
// import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import {
  HackathonEditContext,
  HackathonEditModalType,
  HackathonEditNavType,
  UpdateHackathonParamType
} from '../../../../constants/type';
// import { initEditNavs } from '../../../../constants/data';

interface EditProviderProp {
  children: ReactNode;
  refreshHackathon: VoidFunction;
  hackathon: HackathonType;
  isEdit: boolean;
  navs: HackathonEditNavType[];
}

const EditProvider: React.FC<EditProviderProp> = ({ children, refreshHackathon, hackathon, isEdit, navs }) => {
  // const { dealModalList } = useDealHackathonData();
  const [loading, setLoading] = useState(false);
  const [modalType, setModalType] = useState<HackathonEditModalType>(HackathonEditModalType.NULL);
  const [modalEditType, setModalEditType] = useState<'add' | 'edit' | ''>('');
  const [editCustomInfo, setEditCustomInfo] = useState<HackathonInfoSectionCustomType | null>(null);
  const updateHackathon = ({ data, status = modalType, closeModal = true, cb }: UpdateHackathonParamType) => {
    setLoading(true);
    webApi.hackathonV2Api
      .updateHackathonEdit(
        hackathon.id,
        {
          ...data
        },
        status
      )
      .then(() => {
        refreshHackathon();
        message.success('Updated successfully');
        closeModal && setModalType(HackathonEditModalType.NULL);
        cb && cb();
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const hackathonCustomDelete = () => {
    setLoading(true);
    webApi.resourceStationApi
      .hackathonCustomizeDeleteById(hackathon.id, editCustomInfo?.id as string)
      .then(() => {
        refreshHackathon();
        message.success('Delete successfully');
        setModalType(HackathonEditModalType.NULL);
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const navs = useMemo(() => {
  //   const addList = dealModalList(hackathon)
  //     .filter((v) => v.added)
  //     .map((v) => ({
  //       label: `hackathonDetail.${v.type}`,
  //       value: v.type
  //     }));
  //   return [...initEditNavs, ...addList];
  // }, [hackathon]);

  useEffect(() => {
    if (modalType === HackathonEditModalType.NULL) {
      setEditCustomInfo(null);
      setModalEditType('');
    }
  }, [modalType]);
  return (
    <HackathonEditContext.Provider
      value={{
        navs,
        modalType,
        setModalType,
        updateHackathon,
        refreshHackathon,
        loading,
        setLoading,
        isEdit,
        modalEditType,
        setModalEditType,
        editCustomInfo,
        setEditCustomInfo,
        hackathonCustomDelete
      }}
    >
      {children}
    </HackathonEditContext.Provider>
  );
};

export default EditProvider;
