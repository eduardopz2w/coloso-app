import { connect } from 'react-redux';

import GameCurrentView from '../components/GameCurrentView';
import createDenormalizeSelector from '../../../utils/createDenormalizeSelector';
import keyIn from '../../../utils/keyIn';
import { fetchBuilds } from '../../../modules/ProBuildsActions';
import { fetchProPlayers } from '../../../modules/ProPlayersActions';

const getProBuildsIds = state => state.proBuilds.get('ids');
const getProBuildsEntities = state => state.entities.filter(keyIn('proBuilds', 'proSummoners', 'proPlayers'));
const getProPlayersIds = state => state.proPlayers.get('ids');
const getProPlayersEntities = state => state.entities.filter(keyIn('proPlayers', 'proSummoners'));
const getGameCurrentId = state => state.gameCurrent.get('id');
const getGameCurrentEntities = state => state.entities.filter(keyIn('gamesCurrent'));

const getProBuilds = createDenormalizeSelector('proBuilds', getProBuildsIds, getProBuildsEntities);
const getProPlayers = createDenormalizeSelector('proPlayers', getProPlayersIds, getProPlayersEntities);
const getGameCurrent = createDenormalizeSelector('gamesCurrent', getGameCurrentId, getGameCurrentEntities);

function mapStateToProps(state) {
  return {
    gameData: state.gameCurrent.set('data', getGameCurrent(state)),
    proBuilds: state.proBuilds.set('data', getProBuilds(state)),
    proPlayers: state.proPlayers.set('data', getProPlayers(state)),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProBuilds: (queryParams, page) => {
      dispatch(fetchBuilds(queryParams, page));
    },
    fetchProPlayers: () => {
      dispatch(fetchProPlayers());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCurrentView);
