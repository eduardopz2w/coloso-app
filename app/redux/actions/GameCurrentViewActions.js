import { createAction } from 'redux-actions';
import CenaApi from '../../utils/CenaApi';


export const fetchBuilds = createAction('GAME_CURRENT_VIEW/FETCH_BUILDS', (championId, page, pageSize) => ({
  promise: CenaApi.getBuilds(championId, page, pageSize),
  data: { page, pageSize },
}));
