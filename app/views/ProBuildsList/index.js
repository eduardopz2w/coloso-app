import ProBuildsList from './containers/ProBuildsListContainer';
import ProBuildsListReducer from './modules/ProBuildsListReducer';
import { injectReducer } from '../../redux/store';

injectReducer('proBuildsList', ProBuildsListReducer);

export default ProBuildsList;
