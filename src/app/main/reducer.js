const { INIT } = require('./actionTypes');

const initialState = {
  isAppReady: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT.SUCCESS:
      return {
        ...state,
        isAppReady: true,
      };
    case INIT.FAIL:
      return {
        ...state,
        isAppReady: false,
      };
    default:
      return state;
  }
};

export default mainReducer;
