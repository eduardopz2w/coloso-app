import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Immutable from 'immutable';
import _ from 'lodash';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { PageSelector, MasteryPage, ErrorScreen, LoadingIndicator } from '../../../../components';
import { colors, tracker } from '../../../../utils';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerSelector: {
    paddingLeft: 16,
    backgroundColor: colors.titlesBackground,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

class MasteriesView extends Component {
  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);

    this.state = {
      pageSelected: 0,
    };
  }

  componentDidMount() {
    tracker.trackScreenView('MasteriesView');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(nextProps.masteries, this.props.masteries) ||
      !_.isEqual(nextState, this.state);
  }

  renderContent() {
    const masteries = this.props.masteries;

    return (<View style={styles.root}>
      <View style={styles.headerSelector}>
        <PageSelector
          pages={masteries.getIn(['data', 'pages'])}
          onChangeSelected={newSelected => this.setState({ pageSelected: newSelected })}
        />
      </View>
      <MasteryPage page={masteries.getIn(['data', 'pages', this.state.pageSelected])} />
    </View>);
  }

  render() {
    const masteries = this.props.masteries;

    if (masteries.get('isFetching')) {
      return (<View style={{ padding: 16, alignItems: 'center' }}>
        <LoadingIndicator />
      </View>);
    } else if (masteries.get('fetchError')) {
      return (<ErrorScreen
        message={masteries.get('errorMessage')}
        onPressRetryButton={this.props.onPressRetryButton}
      />);
    } else if (masteries.get('fetched')) {
      return this.renderContent();
    }

    return null;
  }
}

MasteriesView.propTypes = {
  masteries: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    fetchError: PropTypes.bool,
    data: ImmutablePropTypes.map,
    errorMessage: PropTypes.string,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default MasteriesView;
