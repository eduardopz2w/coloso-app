import React, { PureComponent, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenu from './SideMenu';

class MainDrawer extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnPressSearchGame = this.handleOnPressSearchGame.bind(this);
  }

  componentWillMount() {
    this.props.loadAccount();
  }

  handleOnPressSearchGame() {
    if (!this.props.isSearchingGame) {
      const { ownerAccount } = this.props;
      Actions.search_view();
      this.drawer.close();
      this.props.searchGame(ownerAccount.get('summonerName'), ownerAccount.get('region'));
    }
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;

    return (<Drawer
      open={state.open}
      onOpen={() => Actions.refresh({ key: state.key, open: true })}
      onClose={() => Actions.refresh({ key: state.key, open: false })}
      type="overlay"
      content={<SideMenu
        ownerAccount={this.props.ownerAccount}
        onPressSearchGame={this.handleOnPressSearchGame}
      />}
      captureGestures
      panOpenMask={0.02}
      panCloseMask={0.2}
      tapToClose
      negotiatePan
      ref={(drawer) => { this.drawer = drawer; }}
      tweenHandler={ratio => ({
        mainOverlay: {
          backgroundColor: `rgba(0,0,0,0.${ratio * 3})`,
        },
      })}
    >
      <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
    </Drawer>);
  }
}

MainDrawer.propTypes = {
  navigationState: PropTypes.shape({}),
  isSearchingGame: PropTypes.bool,
  onNavigate: PropTypes.func,
  ownerAccount: ImmutablePropTypes.map,
  loadAccount: PropTypes.func,
  searchGame: PropTypes.func,
};

export default MainDrawer;
