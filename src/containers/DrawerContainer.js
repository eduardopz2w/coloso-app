import { connect } from 'react-redux';

import Drawer from '../components/Drawer';
import { loadAccount } from '../modules/ManageAccountActions';
import {
  setSummonerName,
  setRegion,
  setSearchType,
  searchGame,
} from '../views/SummonerSearchView/modules/SummonerSearchActions';

function mapStateToProps(state) {
  return {
    riotAccount: state.manageAccount,
    isSearchingGame: state.summonerSearch.get('isSearching'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAccount: () => {
      dispatch(loadAccount());
    },

    searchGame: ({ summonerName, region }) => {
      dispatch(setSummonerName(summonerName));
      dispatch(setRegion(region));
      dispatch(setSearchType('GAME_SEARCH'));
      dispatch(searchGame({ summonerName, region }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
