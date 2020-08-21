import { put, takeLatest } from 'redux-saga/effects';
import { INIT } from './actionTypes';
import { TOKEN_NAME } from '../../constants/login';
import { SET_TOKEN } from '../authentication/actionTypes';

function* init() {
  const token = localStorage.getItem(TOKEN_NAME);

  if (token) {
    yield put({ type: SET_TOKEN.REQUEST, payload: { token } });
  }

  yield put({ type: INIT.SUCCESS });
}

export default [takeLatest(INIT.REQUEST, init)];
