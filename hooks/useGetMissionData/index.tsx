import { FC, ReactNode } from 'react';

import webApi from '@/service';
import { useDispatch } from 'react-redux';
import {
  setUserLevel,
  setUserCoin,
  setMissionData
} from '@/store/redux/modules/missionCenter';
import { useRequest } from 'ahooks';

export const useGetMissionData = () => {
  const dispatch = useDispatch();

  const updateUserLevel = async () => {
    let res = await webApi.missionCenterApi.getUserLevel();
    dispatch(setUserLevel(res || {}));
  };
  const updateUserCoin = async () => {
    let res = await webApi.missionCenterApi.getUserCoins();
    dispatch(setUserCoin(res || {}));
  };
  const updateMissionData = async () => {
    let res = await webApi.missionCenterApi.getAllMission();
    dispatch(setMissionData(res || []));
  };
  const updateAll = () => {
    updateUserLevel();
    updateUserCoin();
    updateMissionData();
  };

  return { updateMissionDataAll: updateAll };
};