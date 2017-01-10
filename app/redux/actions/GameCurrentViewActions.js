import { createAction } from 'redux-actions';
import CenaApi from '../../utils/CenaApi';


export const fetchBuilds = createAction('GAME_CURRENT_VIEW/FETCH_BUILDS', (filters, page, pageSize) => ({
  promise: CenaApi.getBuilds(filters, page, pageSize),
  data: { proPlayerId: filters.proPlayerId, page, pageSize },
}));
