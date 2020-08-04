const FILTER_TYPE = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
}

const EVENT_TODO_ADDED = 'EVENT_TODO_ADDED';
const EVENT_TODO_EDITED = 'EVENT_TODO_EDITED';
const EVENT_TODO_REMOVED = 'EVENT_TODO_REMOVED';
const EVENT_TODO_TOGGLED = 'EVENT_TODO_TOGGLED';
const EVENT_TODO_CHANGED = 'EVENT_TODO_CHANGED';
const EVENT_INPUT_VALIDATION = 'EVENT_INPUT_VALIDATION';
const EVENT_FILTER_APPLIED = 'EVENT_FILTER_APPLIED';
const EVENT_CLEAR_COMPLETED = 'EVENT_CLEAR_COMPLETED';

let todos = [
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