import { createAction } from 'redux-actions';
import CenaApi from '../../utils/CenaApi';

export const fetchPlayers = createAction('PRO_PLAYERS_FETCH', CenaApi.getProPlayers);
