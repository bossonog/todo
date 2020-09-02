import authenticationSagas from '../app/authentication/sagas';
import todosSagas from '../app/todos/sagas';
import mainSagas from '../app/main/sagas';
import { all } from 'redux-saga/effects';

export default function* () {
  yield all([...authenticationSagas, ...todosSagas, ...mainSagas]);
}
