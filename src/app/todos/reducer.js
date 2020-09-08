import {
  TOGGLE_ALL_TODOS_STATUS,
  CHANGE_TODO,
  CLEAR_ALL_COMPLETED,
  ADD_TODO,
  REMOVE_TODO,
  SET_TODO_VALIDATION_ERROR,
  SET_FILTER_TYPE,
  FETCH_ALL_TODOS,
} from './actionTypes';
import { FILTER_TYPE } from '../../constants/filter';
// import { TODOS } from '../../constants/todos';

const initialState = {
  list: [],
  error: '',
  filterType: FILTER_TYPE.ALL,
  page: 0,
  totalPages: 0,
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
        list: action.payload.todos,
      };
    case FETCH_ALL_TODOS.SUCCESS:
      return {
        ...state,
        list: action.payload.todos,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case SET_TODO_VALIDATION_ERROR.SUCCESS:
    case FETCH_ALL_TODOS.FAIL:
    case ADD_TODO.FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case SET_FILTER_TYPE.SUCCESS:
      return {
        ...state,
        filterType: action.payload.filterType,
        // list: action.payload.todos,
      };
    default:
      return state;
  }
};

export default todosReducer;
