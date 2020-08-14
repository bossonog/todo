const ROOT = '/';
const TODOS_ROOT = `${ROOT}todos`;

const AUTH = {
  LOGIN: `${ROOT}login`,
  SIGN_UP: `${ROOT}sign-up`,
};

const TODOS = {
  ROOT: TODOS_ROOT,
  ACTIVE: `${TODOS_ROOT}/active`,
};

const ROUTES = {
  ROOT,
  TODOS_ROOT,
  AUTH,
  TODOS,
};

export default ROUTES;
