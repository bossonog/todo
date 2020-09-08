import { put, takeLatest, delay } from 'redux-saga/effects';
import { INIT } from './actionTypes';
import { TOKEN_FIELDS_NAMES } from '../../constants/login';
import { SET_TOKENS } from '../authentication/actionTypes';
import LocalStorage from '../../util/localStorage';

function* init() {
  try {
    const tokens = LocalStorage.getItems(TOKEN_FIELDS_NAMES);

    yield put({
      type: SET_TOKENS.REQUEST,
      payload: { tokens },
    });
  } catch (error) {
    yield put({
      type: SET_TOKENS.FAIL,
    });
  }

  yield delay(1000);
  yield put({ type: INIT.SUCCESS });
}

export default [takeLatest(INIT.REQUEST, init)];
