export const FILTER_TYPE = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
}

export const EVENT_TYPE = {
  TODO_ADDED: 'TODO_ADDED',
  TODO_EDITED: 'TODO_EDITED',
  TODO_REMOVED: 'TODO_REMOVED',
  TODO_TOGGLED: 'TODO_TOGGLED',
  TODO_CHANGED: 'TODO_CHANGED',
  INPUT_VALIDATION: 'INPUT_VALIDATION',
  FILTER_APPLIED: 'FILTER_APPLIED',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS'
}

export const USER = {
  username: 'test',
  password: 'test'
}

export let todos = [
  {
    id: 1,
    title: 'todo 1',
    completed: false,
  },
  {
    id: 2,
    title: 'todo 2',
    completed: false,
  },
  {
    id: 3,
    title: 'todo 3',
    completed: true,
  }
];