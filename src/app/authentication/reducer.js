import { LOGIN, LOGOUT, SET_TOKENS } from './actionTypes';

const initialState = {
  isAuthenticated: false,
  error: '',
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKENS.SUCCESS:
    case LOGIN.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        error: '',
      };
    case LOGIN.FAIL:
      return {
        ...state,
        error: action.payload.error,
      };
    case SET_TOKENS.FAIL:
    case LOGOUT.SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        error: '',
      };
    default:
      return state;
  }
};

export default authenticationReducer;
