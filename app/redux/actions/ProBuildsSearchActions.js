import { createAction } from 'redux-actions';
import { COLOSO_CALL, COLOSO_CALL_TYPES } from '../middlewares/ColosoApiMiddleware';


// export const fetchBuilds = createAction('PROBUILDS_SEARCH_VIEW/FETCH_BUILDS', (filters, page, pageSize) => ({
//   promise: ColosoApi.getBuilds(filters, page, pageSize),
//   data: {
//     championId: filters.championId,
//     proPlayerId: filters.proPlayerId,
//     page,
//     pageSize,
//   },
// }));

export const fetchBuilds = createAction('PROBUILDS_SEARCH_VIEW/FETCH_BUILDS', (queryParams, pageNumber, pageSize) => ({
  queryParams,
  pageParams: {
    number: pageNumber || 1,
    size: pageSize || 25,
  },
  [COLOSO_CALL]: {
    type: COLOSO_CALL_TYPES.PRO_BUILDS,
  },
}));

// export const refreshBuilds = createAction('PROBUILDS_SEARCH_VIEW/REFRESH_BUILDS', (filters, pageSize) => ColosoApi.getBuilds(filters, 1, pageSize));
