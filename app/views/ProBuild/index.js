import ProBuild from './containers/ProBuildContainer';
import ProBuildReducer from './modules/ProBuildReducer';
import MatchReducer from './modules/MatchReducer';
import { injectReducer } from '../../redux/store';

injectReducer('proBuild', ProBuildReducer);
injectReducer('match', MatchReducer);

export default ProBuild;
