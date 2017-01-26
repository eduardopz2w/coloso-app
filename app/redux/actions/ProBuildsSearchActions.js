import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../middlewares/ColosoApiMiddleware';

export const fetchBuilds = createAction('PROBUILDS_SEARCH_VIEW/FETCH_BUILDS', (queryParams, pageNumber = 1, pageSize = 25) => ({
  queryParams,
  pageParams: {
    number: pageNumber,
    size: pageSize,
  },
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.PRO_BUILDS,
  },
}));

export const refreshBuilds = createAction('PROBUILDS_SEARCH_VIEW/REFRESH_BUILDS', (queryParams, pageSize = 25) => ({
  queryParams,
  pageParams: {
    number: 1,
    size: pageSize,
  },
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.PRO_BUILDS,
  },
}));
