import React, { PureComponent, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenu from './SideMenu';

class MainDrawer extends PureComponent {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    const styles = {};

    if (state.open) {
      styles.mainOverlay = {
        backgroundColor: 'rgba(0,0,0,0.4)',
      };
    }

    return (<Drawer
      open={state.open}
      styles={styles}
      onOpen={() => Actions.refresh({ key: state.key, open: true })}
      onClose={() => Actions.refresh({ key: state.key, open: false })}
      type="overlay"
      content={<SideMenu />}
      captureGestures
      panOpenMask={0.05}
      panCloseMask={0.5}
      tapToClose
      negotiatePan
    >
      <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
    </Drawer>);
  }
}

MainDrawer.propTypes = {
  navigationState: PropTypes.shape({}),
  onNavigate: PropTypes.func,
};

export default MainDrawer;
