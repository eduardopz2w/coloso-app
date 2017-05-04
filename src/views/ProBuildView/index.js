import ProBuildContainer from './containers/ProBuildContainer';
import ProBuildReducer from './modules/ProBuildReducer';
import GameReducer from './modules/GameReducer';
import { injectReducer } from '../../redux/store';

injectReducer('proBuild', ProBuildReducer);
injectReducer('game', GameReducer);

export default ProBuildContainer;
