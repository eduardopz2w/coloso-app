import SummonerSearch from './containers/SummonerSearchContainer';
import SummonerSearchReducer from './modules/SummonerSearchReducer';
import { injectReducer } from '../../redux/store';

injectReducer('summonerSearch', SummonerSearchReducer);

export default SummonerSearch;
