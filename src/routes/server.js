const ROOT = 'http://localhost:3000/api/';
const ROOT_AUTH = `${ROOT}authentication`;
const ROOT_TODOS = `${ROOT}secure/todos`;

const AUTH = {
  LOGIN: `${ROOT_AUTH}/login`,
  REFRESH_TOKEN: `${ROOT_AUTH}/token/refresh`,
};

const TODOS = {
  COMPLETE_LIST: `${ROOT_TODOS}/completeList`,
  TOGGLE_STATUS_LIST: `${ROOT_TODOS}/toggleStatusList`,
};

const ROUTES = {
  ROOT,
  ROOT_AUTH,
  ROOT_TODOS,
  AUTH,
  TODOS,
};

export default ROUTES;
