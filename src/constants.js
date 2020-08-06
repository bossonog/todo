export const FILTER_TYPE = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
}

export const EVENT_TYPE = {
  TODO_ADDED: 'TODO_ADDED',
  EVENT_TODO_EDITED: 'EVENT_TODO_EDITED',
  EVENT_TODO_REMOVED: 'EVENT_TODO_REMOVED',
  EVENT_TODO_TOGGLED: 'EVENT_TODO_TOGGLED',
  EVENT_TODO_CHANGED: 'EVENT_TODO_CHANGED',
  EVENT_INPUT_VALIDATION: 'EVENT_INPUT_VALIDATION',
  EVENT_FILTER_APPLIED: 'EVENT_FILTER_APPLIED',
  EVENT_CLEAR_COMPLETED: 'EVENT_CLEAR_COMPLETED',
  EVENT_LOGIN_SUCCESS: 'EVENT_LOGIN_SUCCESS'
}

export const USER = {
  username: 'test',
  password: 'qwerty'
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