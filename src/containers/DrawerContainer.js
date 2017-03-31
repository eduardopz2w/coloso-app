import { connect } from 'react-redux';

import Drawer from '../components/Drawer';
import { loadAccount } from '../modules/OwnerAccountActions';
import {
  setSummonerName,
  setRegion,
  setSearchType,
  searchGame,
} from '../views/SummonerSearchView/modules/SummonerSearchActions';

function mapStateToProps(state) {
  return {
    ownerAccount: state.ownerAccount,
    isSearchingGame: state.summonerSearch.get('isSearching'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAccount: () => {
      dispatch(loadAccount());
    },

    searchGame: (summonerName, region) => {
      dispatch(setSummonerName(summonerName));
      dispatch(setRegion(region));
      dispatch(setSearchType('GAME_SEARCH'));
      dispatch(searchGame(summonerName, region));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer);
