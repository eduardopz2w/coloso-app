import { createAction } from 'redux-actions';

import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../redux/middlewares/ColosoApiMiddleware';

export const fetchBuilds = createAction('PROBUILDS_LIST/FETCH_BUILDS', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.PRO_BUILDS,
    params,
  },
}));

export const refreshBuilds = createAction('PROBUILDS_LIST/REFRESH_BUILDS', params => ({
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.PRO_BUILDS,
    params,
  },
}));
