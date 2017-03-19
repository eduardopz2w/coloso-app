import { connect } from 'react-redux';

import GameCurrent from '../components/GameCurrent';
import denormalize from '../../../utils/denormalize';
import { fetchBuilds } from '../../../modules/ProBuildsActions';
import { fetchProPlayers } from '../../../modules/ProPlayersActions';


function mapStateToProps(state) {
  let proBuilds = state.proBuilds;
  let proPlayers = state.proPlayers;
  const ids = state.proBuilds.get('ids');
  const proPlayersIds = proPlayers.get('proPlayersIds');
  const gameData = denormalize(state.gameCurrent.get('gameId'), 'gamesCurrent', state.entities);

  proBuilds = proBuilds.set('builds', ids.map(proBuildId => denormalize(proBuildId, 'proBuilds', state.entities)));
  proPlayers = proPlayers.set('proPlayersList', proPlayersIds.map(proPlayerId => denormalize(proPlayerId, 'proPlayers', state.entities)));

  return { gameData, proBuilds, proPlayers };
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

export default connect(mapStateToProps, mapDispatchToProps)(GameCurrent);
