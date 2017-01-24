import { createAction } from 'redux-actions';
import ColosoApi from '../../utils/ColosoApi';

export const fetchBuild = createAction('PROBUILD_VIEW/FETCH_BUILD', ColosoApi.getBuild);
