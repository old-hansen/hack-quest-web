import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { TabListType } from '@/components/Web/Business/Tab/type';

export const hackathonTab: TabListType[] = [
  {
    label: 'Ongoing Hackathons',
    value: HackathonStatusType.ON_GOING,
    type: 'tab'
  },
  {
    label: 'Past Hackathons',
    value: HackathonStatusType.PAST,
    type: 'tab'
  },
  {
    label: 'All Projects',
    value: HackathonStatusType.ALL_PROJECT,
    type: 'link'
  }
];