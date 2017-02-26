import { connect } from 'react-redux';

import GameCurrent from '../components/GameCurrent';
import denormalize from '../../../utils/denormalize';
import { fetchProBuilds } from '../modules/GameCurrentActions';
import { fetchProPlayers } from '../../../modules/ProPlayersActions';


function mapStateToProps(state) {
  let proBuilds = state.gameCurrent.get('proBuilds');
  let proPlayers = state.proPlayers;
  const ids = state.gameCurrent.getIn(['proBuilds', 'ids']);
  const proPlayersIds = proPlayers.get('proPlayersIds');
  const gameData = denormalize(state.gameCurrent.get('gameId'), 'gamesCurrent', state.entities);

  proBuilds = proBuilds.set('proBuildsList', ids.map(proBuildId => denormalize(proBuildId, 'proBuilds', state.entities)));
  proPlayers = proPlayers.set('proPlayersList', proPlayersIds.map(proPlayerId => denormalize(proPlayerId, 'proPlayers', state.entities)));

  return { gameData, proBuilds, proPlayers };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProBuilds: (queryParams, page) => {
      dispatch(fetchProBuilds(queryParams, page));
    },
    fetchProPlayers: () => {
      dispatch(fetchProPlayers());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCurrent);
