import { isEmpty } from '../util/validations';

const LOGIN_INPUTS_NAMES = {
  USERNAME: 'username',
  PASSWORD: 'password',
};

export const LOGIN_INPUTS_OPTIONS = {
  [LOGIN_INPUTS_NAMES.USERNAME]: {
    id: 1,
    type: 'text',
    className: 'login-control',
    name: LOGIN_INPUTS_NAMES.USERNAME,
    placeholder: 'Username',
    validationFunctions: [isEmpty],
    validations: {
      minLength: 6,
      maxLength: 16,
    },
  },
  [LOGIN_INPUTS_NAMES.PASSWORD]: {
    id: 2,
    type: 'password',
    className: 'login-control',
    name: LOGIN_INPUTS_NAMES.PASSWORD,
    placeholder: 'Password',
    validationFunctions: [isEmpty],
    validations: {
      minLength: 6,
      maxLength: 16,
    },
  },
};

export const TOKEN_FIELDS_NAMES = {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
};
