import { createAction } from 'redux-actions';
import CenaApi from '../../utils/CenaApi';

export const fetchBuilds = createAction('PROBUILDS_SEARCH_VIEW/FETCH_BUILDS', (filters, page, pageSize) => ({
  promise: CenaApi.getBuilds(filters, page, pageSize),
  data: {
    championId: filters.championId,
    proPlayerId: filters.proPlayerId,
    page,
    pageSize,
  },
}));

export const refreshBuilds = createAction('PROBUILDS_SEARCH_VIEW/REFRESH_BUILDS', (filters, pageSize) => CenaApi.getBuilds(filters, 1, pageSize));
