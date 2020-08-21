import { call, put, takeEvery, takeLatest, take } from 'redux-saga/effects';
import { LOGIN, LOGOUT, SET_TOKEN } from './actionTypes';
import { CREDENTIALS } from '../../constants/user';
import { TOKEN_NAME } from '../../constants/login';

function* login(action) {
  const { username, password } = action.payload.credentials;

  if (CREDENTIALS.username === username && CREDENTIALS.password === password) {
    yield setToken(true);
    yield put({ type: LOGIN.SUCCESS });

    return;
  }

  yield put({
    type: LOGIN.FAIL,
    payload: { error: 'There is no user with provided credentials' },
  });
}

export function* setToken(token) {
  localStorage.setItem(TOKEN_NAME, token);

  yield put({ type: SET_TOKEN.SUCCESS });
}

function* logout() {
  localStorage.removeItem(TOKEN_NAME);

  yield put({ type: LOGOUT.SUCCESS });
}

export default [
  takeLatest(LOGIN.REQUEST, login),
  takeLatest(LOGOUT.REQUEST, logout),
  takeLatest(SET_TOKEN.REQUEST, setToken),
];
