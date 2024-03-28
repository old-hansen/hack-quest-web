import WebService from '@/service/webService/webService';
import { PageResult } from '../type';
import { FuelInfo, LaunchPoolProjectType, ParticipateInfo, StakeInfo } from './type';
import { cache } from 'react';

export enum LaunchPoolApiType {
  LaunchPoolProjects = '/launch-projects'
}

class LaunchPoolApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /* 获取projects列表 */
  getProjects() {
    return this.service.get<PageResult<LaunchPoolProjectType>>(LaunchPoolApiType.LaunchPoolProjects);
  }

  getProjectsFromCache() {
    const cacheFn = cache(async () => {
      return this.getProjects();
    });

    return cacheFn();
  }

  /* 根据获取project详情 */
  getProjectById(projectId: string) {
    const url = `${LaunchPoolApiType.LaunchPoolProjects}/${projectId}`;
    return this.service.get<LaunchPoolProjectType>(url);
  }

  /* 获取用户参与信息 */
  getParticipateInfo(projectId: string) {
    const url = `${LaunchPoolApiType.LaunchPoolProjects}/${projectId}/me`;
    return this.service.get<ParticipateInfo>(url);
  }

  /* 获取fuels信息 */
  getFuelsInfo(projectId: string) {
    const url = `${LaunchPoolApiType.LaunchPoolProjects}/${projectId}/fuels`;
    return this.service.get<FuelInfo[]>(url);
  }

  /* 加入project */
  participateProject(projectId: string, inviteCode: string) {
    const url = `${LaunchPoolApiType.LaunchPoolProjects}/${projectId}/join`;
    return this.service.get(url, {
      params: { code: inviteCode }
    });
  }

  /* 质押 */
  stake(projectId: string) {
    const url = `${LaunchPoolApiType.LaunchPoolProjects}/${projectId}/stake`;
    return this.service.post<StakeInfo>(url);
  }

  /** 加入白名单 */
  joinWaitList(projectId: string, email: string) {
    return this.service.post(`${LaunchPoolApiType.LaunchPoolProjects}/${projectId}/wait-list`, {
      data: { email }
    });
  }

  /** 检查是否在白名单 */
  checkJoinWaitList(projectId: string) {
    return this.service.get<{ isJoin: boolean; email: string }>(
      `${LaunchPoolApiType.LaunchPoolProjects}/${projectId}/check-wait-list`
    );
  }
}

export default LaunchPoolApi;
