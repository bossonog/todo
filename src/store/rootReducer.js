import todosReducer from '../app/todos/reducer';
import authenticationReducer from '../app/authentication/reducer';
import mainReducer from '../app/main/reducer';

import { combineReducers } from 'redux';

export default combineReducers({
  main: mainReducer,
  todos: todosReducer,
  authentication: authenticationReducer,
});
