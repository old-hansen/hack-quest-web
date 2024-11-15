export const searchTabData = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'News & Announcements',
    value: 'News & Announcements'
  },
  {
    label: 'Events',
    value: 'Events'
  },
  {
    label: 'Fireside Chats',
    value: 'Fireside Chats'
  },
  {
    label: 'Study Notes',
    value: 'Study Notes'
  },
  {
    label: 'User Spotlight',
    value: 'User Spotlight'
  },
  {
    label: 'Others',
    value: 'Others'
  }
];

export const sortData = [
  {
    label: 'Sort Lastest to Oldest',
    value: '-publishDate'
  },
  {
    label: 'Sort Oldest to Lastest',
    value: 'publishDate'
  }
];

export const initSearchInfo = {
  keyword: '',
  category: searchTabData[0].value,
  sort: sortData[0].value,
  page: 1,
  limit: 12
};
