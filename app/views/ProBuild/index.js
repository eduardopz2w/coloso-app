import ProBuild from './containers/ProBuildContainer';
import ProBuildReducer from './modules/ProBuildReducer';
import { injectReducer } from '../../redux/store';

injectReducer('proBuild', ProBuildReducer);

export default ProBuild;
