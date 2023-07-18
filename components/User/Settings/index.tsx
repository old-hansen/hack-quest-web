import EmailFillIcon from '@/components/Common/Icon/EmailFill';
import LockIcon from '@/components/Common/Icon/Lock';
import UserIcon from '@/components/Common/Icon/User';
import UserFillIcon from '@/components/Common/Icon/UserFill';
import Modal from '@/components/Common/Modal';
import { AppRootState } from '@/store/redux';
import { setSettingsOpen } from '@/store/redux/modules/user';
import { Upload } from 'antd';
import Image from 'next/image';
import { FC, ReactNode, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ChangePassword from './ChangePassword';
import AvatarUpload from './AvatarUpload';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';

interface SettingsProps {
  // children: ReactNode;
}

const Settings: FC<SettingsProps> = (props) => {
  const { settingsOpen } = useSelector((state: AppRootState) => {
    return {
      settingsOpen: state.user.settingsOpen
    };
  });

  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(setSettingsOpen(false));
  };

  const userInfo = useGetUserInfo();

  return (
    <div>
      <Modal open={settingsOpen} onClose={onClose} showCloseIcon={true}>
        <div className="relative w-full m-auto py-[7.81rem] rounded-[2.5rem] bg-[#131313] z-[99] flex justify-center">
          <div className="flex flex-col w-[64%] ">
            <h1 className="text-white text-[2rem] font-next-poster-Bold leading-[110%] tracking-[0.04rem]">
              Settings
            </h1>
            <div className="mt-[4rem] flex flex-col gap-[1.5rem] ">
              <AvatarUpload userInfo={userInfo}></AvatarUpload>
              <div className="w-full relative flex flex-col gap-[0.25rem] bottom-line">
                <span className="text-[#676767] text-[0.875rem] font-next-book leading-[110%]">
                  ID
                </span>
                <div className="h-[3.5rem] flex gap-[1.25rem] items-center">
                  <span>
                    <UserFillIcon color="#9597A1" size={24}></UserFillIcon>
                  </span>
                  <input
                    type="text"
                    disabled
                    defaultValue={userInfo?.name}
                    className="bg-transparent h-full text-[#EDEDED] text-[1rem] font-next-book leading-[120%] outline-none w-full disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="w-full relative flex flex-col gap-[0.25rem] bottom-line">
                <span className="text-[#676767] text-[0.875rem] font-next-book leading-[110%]">
                  Email
                </span>
                <div className="h-[3.5rem] flex gap-[1.25rem] items-center">
                  <span>
                    <EmailFillIcon color="#676767" size={24}></EmailFillIcon>
                  </span>
                  <input
                    type="text"
                    disabled
                    defaultValue={userInfo?.email}
                    className="bg-transparent h-full text-[#EDEDED] text-[1rem] font-next-book leading-[120%] outline-none w-full disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              <ChangePassword></ChangePassword>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
