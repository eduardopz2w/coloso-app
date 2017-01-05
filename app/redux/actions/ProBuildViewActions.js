import { createAction } from 'redux-actions';
import CenaApi from '../../utils/CenaApi';

export const fetchBuild = createAction('PROBUILD_VIEW/FETCH_BUILD', CenaApi.getBuild);
