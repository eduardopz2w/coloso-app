import ProBuildsList from './containers/ProBuildsListContainer';
import ProBuildsListReducer from './modules/ProBuildsListReducer';
import FavoriteProBuildsReducer from './modules/FavoriteProBuildsReducer';
import { injectReducer } from '../../redux/store';

injectReducer('proBuildsList', ProBuildsListReducer);
injectReducer('favoriteProBuilds', FavoriteProBuildsReducer);

export default ProBuildsList;
