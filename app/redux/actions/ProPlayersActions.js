import { createAction } from 'redux-actions';
import ColosoApi from '../../utils/ColosoApi';

export const fetchPlayers = createAction('PRO_PLAYERS_FETCH', ColosoApi.getProPlayers);
