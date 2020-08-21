import { LOGIN, LOGOUT, SET_TOKEN } from './actionTypes';

const initialState = {
  isAuthenticated: false,
  error: '',
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN.SUCCESS:
    case LOGIN.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN.FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case LOGOUT.SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authenticationReducer;
