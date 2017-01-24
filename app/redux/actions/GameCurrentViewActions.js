import { createAction } from 'redux-actions';
import ColosoApi from '../../utils/ColosoApi';


export const fetchBuilds = createAction('GAME_CURRENT_VIEW/FETCH_BUILDS', (filters, page, pageSize) => ({
  promise: ColosoApi.getBuilds(filters, page, pageSize),
  data: { proPlayerId: filters.proPlayerId, page, pageSize },
}));
