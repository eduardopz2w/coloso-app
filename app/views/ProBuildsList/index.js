import ProBuildsList from './containers/ProBuildsListContainer';
import FavoriteProBuildsReducer from './modules/FavoriteProBuildsReducer';
import { injectReducer } from '../../redux/store';

injectReducer('favoriteProBuilds', FavoriteProBuildsReducer);

export default ProBuildsList;
