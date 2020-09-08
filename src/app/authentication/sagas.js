import { put, takeLatest, call, debounce } from 'redux-saga/effects';
import { LOGIN, LOGOUT, SET_TOKENS } from './actionTypes';
import { TOKEN_FIELDS_NAMES } from '../../constants/login';
import HttpService from '../../services/HttpService';
import { SERVER_ROUTES } from '../../routes';
import LocalStorage from '../../util/localStorage';

function* login(action) {
  const { username, password } = action.payload.credentials;

  try {
    const response = yield call(HttpService.post, SERVER_ROUTES.AUTH.LOGIN, {
      username,
      password,
    });

    const { refreshToken, accessToken } = response;

    yield setTokens({ payload: { tokens: { refreshToken, accessToken } } });
    yield put({ type: LOGIN.SUCCESS });
  } catch (error) {
    yield put({
      type: LOGIN.FAIL,
      payload: { error: error.message },
    });
  }
}

// export function* setToken(action) {
//   const { token } = action.payload;

//   localStorage.setItem(TOKEN.FIELD_NAME, token);

//   yield put({ type: SET_TOKEN.SUCCESS });
// }

export function* setTokens(action) {
  const { tokens } = action.payload;

  LocalStorage.setItems(tokens);

  // Object.keys(tokens).map((name) => {
  //   localStorage.setItem(name, tokens[name]);
  // });

  yield put({ type: SET_TOKENS.SUCCESS });
}

function* logout() {
  LocalStorage.removeItems(TOKEN_FIELDS_NAMES);

  // Object.keys(TOKEN_FIELDS_NAMES).map((name) => {
  //   localStorage.removeItem(TOKEN_FIELDS_NAMES[name]);
  // });

  yield put({ type: LOGOUT.SUCCESS });
}

export default [
  debounce(200, LOGIN.REQUEST, login),
  takeLatest(LOGOUT.REQUEST, logout),
  takeLatest(SET_TOKENS.REQUEST, setTokens),
];
