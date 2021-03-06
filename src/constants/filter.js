export const FILTER_TYPE = {
  ALL: 'all',
  ACTIVE: 'uncompleted',
  COMPLETED: 'completed',
};

export const TODOS_FILTER_TYPE_OPTIONS = {
  [FILTER_TYPE.ALL]: {
    id: 1,
    title: 'All',
  },
  [FILTER_TYPE.ACTIVE]: {
    id: 2,
    title: 'Active',
  },
  [FILTER_TYPE.COMPLETED]: {
    id: 3,
    title: 'Completed',
  },
};
