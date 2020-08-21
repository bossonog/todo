import {
  TOGGLE_ALL_TODOS_STATUS,
  CHANGE_TODO,
  CLEAR_ALL_COMPLETED,
  ADD_TODO,
  REMOVE_TODO,
  SET_TODO_VALIDATION_ERROR,
  SET_FILTER_TYPE,
} from './actionTypes';
import { FILTER_TYPE } from '../../constants/filter';

const initialState = {
  todos: [
    {
      id: 2,
      title: 'todo 2',
      completed: false,
    },
    {
      id: 3,
      title: 'todo 3',
      completed: true,
    },
  ],
  error: '',
  filterType: FILTER_TYPE.ALL,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_TODO.SUCCESS:
    case ADD_TODO.SUCCESS:
    case CLEAR_ALL_COMPLETED.SUCCESS:
    case CHANGE_TODO.SUCCESS:
    case TOGGLE_ALL_TODOS_STATUS.SUCCESS:
      return {
        ...state,
        todos: action.payload.todos,
      };
    case SET_TODO_VALIDATION_ERROR.SUCCESS:
    case ADD_TODO.FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case SET_FILTER_TYPE.SUCCESS:
      return {
        ...state,
        filterType: action.payload.filterType,
        todos: action.payload.todos,
      };
    default:
      return state;
  }
};

export default todosReducer;
