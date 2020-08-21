import {
  call,
  put,
  debounce,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import {
  TOGGLE_ALL_TODOS_STATUS,
  CHANGE_TODO,
  CLEAR_ALL_COMPLETED,
  ADD_TODO,
  REMOVE_TODO,
  SET_TODO_VALIDATION_ERROR,
  SET_FILTER_TYPE,
} from './actionTypes';
import { isAllToDosCompleted, getToDos } from './selectors';
import {
  processValidationsArray,
  isEmpty,
  hasSymbols,
} from '../../util/validations';
import { FILTER_TYPE } from '../../constants/filter';

function* toggleAllToDos() {
  const completed = yield select(isAllToDosCompleted);
  const todos = yield select(getToDos);

  yield put({
    type: TOGGLE_ALL_TODOS_STATUS.SUCCESS,
    payload: {
      todos: todos.map((t) => ({ ...t, completed: !completed })),
    },
  });
}

function* changeToDo(action) {
  const { todo } = action.payload;

  const todos = yield select(getToDos);

  yield put({
    type: CHANGE_TODO.SUCCESS,
    payload: {
      todos: todos.map((t) => (t.id === todo.id ? { ...t, ...todo } : t)),
    },
  });
}

function* clearAllCompletedToDos() {
  const todos = yield select(getToDos);

  yield put({
    type: CLEAR_ALL_COMPLETED.SUCCESS,
    payload: {
      todos: todos.filter((todo) => !todo.completed),
    },
  });
}

function* addToDo(action) {
  const { title } = action.payload.todo;
  const errorMsg = processValidationsArray([isEmpty, hasSymbols], title.trim());

  if (errorMsg) {
    return yield put({ type: ADD_TODO.FAIL, payload: { error: errorMsg } });
  }

  const todos = yield select(getToDos);
  const id = todos.length ? todos[todos.length - 1].id + 1 : 1;

  yield put({
    type: ADD_TODO.SUCCESS,
    payload: {
      todos: [...todos, { id, title, completed: false }],
    },
  });
}

function* removeToDo(action) {
  const { id } = action.payload;

  const todos = yield select(getToDos);

  yield put({
    type: REMOVE_TODO.SUCCESS,
    payload: {
      todos: todos.filter((t) => t.id !== id),
    },
  });
}

function* setValidationError(action) {
  const { error } = action.payload;

  yield put({
    type: SET_TODO_VALIDATION_ERROR.SUCCESS,
    payload: {
      error,
    },
  });
}

function* setFilterType(action) {
  const { filterType } = action.payload;

  // const todos = yield select(getToDos);

  // let filteredToDos = [];

  // if (filterType === FILTER_TYPE.ALL) {
  //   filteredToDos = todos;
  // }

  // if (filterType === FILTER_TYPE.ACTIVE) {
  //   filteredToDos = todos.filter((todo) => {
  //     return !todo.completed;
  //   });
  // }

  // if (filterType === FILTER_TYPE.COMPLETED) {
  //   filteredToDos = todos.filter((todo) => {
  //     return todo.completed;
  //   });
  // }

  yield put({
    type: SET_FILTER_TYPE.SUCCESS,
    payload: { filterType },
  });
}

export default [
  takeLatest(TOGGLE_ALL_TODOS_STATUS.REQUEST, toggleAllToDos),
  takeLatest(CHANGE_TODO.REQUEST, changeToDo),
  takeLatest(CLEAR_ALL_COMPLETED.REQUEST, clearAllCompletedToDos),
  takeLatest(ADD_TODO.REQUEST, addToDo),
  takeLatest(REMOVE_TODO.REQUEST, removeToDo),
  takeLatest(SET_TODO_VALIDATION_ERROR.REQUEST, setValidationError),
  takeLatest(SET_FILTER_TYPE.REQUEST, setFilterType),
];
