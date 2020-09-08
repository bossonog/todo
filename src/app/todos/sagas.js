import { put, takeLatest, select, debounce, call } from 'redux-saga/effects';
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
import {
  isAllToDosCompleted,
  getToDos,
  getFilterType,
  getCurrentPage,
} from './selectors';
import {
  processValidationsArray,
  isEmpty,
  hasSymbols,
} from '../../util/validations';
import { FILTER_TYPE } from '../../constants/filter';
import HttpService from '../../services/HttpService';
import { SERVER_ROUTES } from '../../routes';
import { TODO_STATUS } from '../../constants/todos';
import ParamsBuilder from '../../util/paramsBuilder';

function* getAllToDos(action) {
  const { page } = action?.payload;

  const todos = yield select(getToDos);
  const filterType = yield select(getFilterType);
  const currentPage = yield select(getCurrentPage);

  const paramsBuilder = new ParamsBuilder(SERVER_ROUTES.ROOT_TODOS);

  if (filterType !== FILTER_TYPE.ALL) {
    paramsBuilder.buildOne('status', filterType);
  }

  paramsBuilder.buildOne('page', page);

  try {
    const response = yield call(HttpService.get, paramsBuilder.query);
    let result = [];

    if (+page > +currentPage) {
      result = [...todos, ...response.list];
    } else if (+page === 1) {
      result = response.list;
    } else {
      result = todos;
    }

    yield put({
      type: FETCH_ALL_TODOS.SUCCESS,
      payload: {
        todos: result,
        page: +response.page,
        totalPages: +response.totalPages,
      },
    });
  } catch (error) {
    yield put({
      type: FETCH_ALL_TODOS.FAIL,
      payload: {
        error: error.message,
      },
    });
  }
}

function* toggleAllToDos() {
  const isCompleted = yield select(isAllToDosCompleted);
  const todos = yield select(getToDos);
  const page = yield select(getCurrentPage);
  const ids = todos.map((todo) => todo.id);

  try {
    yield call(HttpService.patch, SERVER_ROUTES.TODOS.TOGGLE_STATUS_LIST, ids);

    yield put({
      type: TOGGLE_ALL_TODOS_STATUS.SUCCESS,
      payload: {
        todos: todos.map((t) => ({
          ...t,
          status: isCompleted ? TODO_STATUS.UNCOMPLETED : TODO_STATUS.COMPLETED,
        })),
        page,
      },
    });
  } catch (error) {
    yield put({
      type: TOGGLE_ALL_TODOS_STATUS.FAIL,
      payload: {
        error: error.message,
      },
    });
  }
}

function* changeToDo(action) {
  const { todo } = action.payload;

  const todos = yield select(getToDos);
  const page = yield select(getCurrentPage);

  try {
    yield call(
      HttpService.patch,
      `${SERVER_ROUTES.ROOT_TODOS}/${todo.id}`,
      todo
    );

    yield put({
      type: CHANGE_TODO.SUCCESS,
      payload: {
        todos: todos.map((t) => (t.id === todo.id ? { ...t, ...todo } : t)),
        page,
      },
    });
  } catch (error) {
    yield put({
      type: CHANGE_TODO.FAIL,
      payload: {
        error: error.message,
      },
    });
  }
}

function* clearAllCompletedToDos() {
  const todos = yield select(getToDos);
  const ids = todos.map((todo) => todo.id);

  try {
    yield call(HttpService.patch, SERVER_ROUTES.TODOS.COMPLETE_LIST, ids);

    yield put({
      type: CLEAR_ALL_COMPLETED.SUCCESS,
      payload: {
        todos: todos.filter((todo) => todo.status === TODO_STATUS.UNCOMPLETED),
      },
    });
  } catch (error) {
    yield put({
      type: CLEAR_ALL_COMPLETED.FAIL,
      payload: {
        error: error.message,
      },
    });
  }
}

function* addToDo(action) {
  const { title } = action.payload.todo;

  const page = yield select(getCurrentPage);

  try {
    const errorMsg = processValidationsArray(
      [isEmpty, hasSymbols],
      title.trim()
    );

    if (errorMsg) {
      throw new Error(errorMsg);
    }

    const response = yield call(HttpService.post, SERVER_ROUTES.ROOT_TODOS, {
      title,
    });

    const todos = yield select(getToDos);

    yield put({
      type: ADD_TODO.SUCCESS,
      payload: {
        todos: [
          { id: response.id, title: response.title, status: response.status },
          ...todos,
        ],
        page,
      },
    });
  } catch (error) {
    yield put({
      type: ADD_TODO.FAIL,
      payload: {
        error: error.message,
      },
    });
  }
}

function* removeToDo(action) {
  const { id } = action.payload;

  const page = yield select(getCurrentPage);

  try {
    yield call(HttpService.delete, `${SERVER_ROUTES.ROOT_TODOS}/${id}`);

    const todos = yield select(getToDos);

    yield put({
      type: REMOVE_TODO.SUCCESS,
      payload: {
        todos: todos.filter((t) => t.id !== id),
        page,
      },
    });
  } catch (error) {
    yield put({
      type: REMOVE_TODO.FAIL,
      payload: {
        error: error.message,
      },
    });
  }
}

function* setValidationError(action) {
  const { error } = action.payload;

  yield put({
    type: SET_TODO_VALIDATION_ERROR.SUCCESS,
    payload: {
      error: error.message,
    },
  });
}

function* setFilterType(action) {
  const { filterType } = action.payload;

  try {
    yield put({
      type: SET_FILTER_TYPE.SUCCESS,
      payload: { filterType, page: 1 },
    });
  } catch (error) {
    yield put({
      type: SET_FILTER_TYPE.FAIL,
      payload: {
        error: error.message,
      },
    });
  }
}

export default [
  debounce(200, TOGGLE_ALL_TODOS_STATUS.REQUEST, toggleAllToDos),
  debounce(100, CHANGE_TODO.REQUEST, changeToDo),
  takeLatest(CLEAR_ALL_COMPLETED.REQUEST, clearAllCompletedToDos),
  takeLatest(ADD_TODO.REQUEST, addToDo),
  takeLatest(REMOVE_TODO.REQUEST, removeToDo),
  takeLatest(SET_TODO_VALIDATION_ERROR.REQUEST, setValidationError),
  takeLatest(SET_FILTER_TYPE.REQUEST, setFilterType),
  takeLatest(
    [
      FETCH_ALL_TODOS.REQUEST,
      SET_FILTER_TYPE.SUCCESS,
      CHANGE_TODO.SUCCESS,
      ADD_TODO.SUCCESS,
      REMOVE_TODO.SUCCESS,
      TOGGLE_ALL_TODOS_STATUS.SUCCESS,
    ],
    getAllToDos
  ),
];
