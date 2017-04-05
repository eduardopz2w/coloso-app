import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import LoadingIndicator from '../../../../components/LoadingIndicator';
import PageSelector from '../../../../components/PageSelector';
import RunePage from '../../../../components/RunePage';
import ErrorScreen from '../../../../components/ErrorScreen';
import { tracker } from '../../../../utils/analytics';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerSelector: {
    paddingLeft: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  runesContainer: {
    paddingTop: 8,
    paddingRight: 16,
    paddingLeft: 16,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

class RunesView extends Component {
  constructor(props) {
    super(props);

    this.renderContent = this.renderContent.bind(this);

    this.state = {
      pageSelected: 1,
    };
  }

  componentDidMount() {
    tracker.trackScreenView('RunesView');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !Immutable.is(nextProps.runes, this.props.runes) ||
      !_.isEqual(nextState, this.state);
  }

  renderContent() {
    const runes = this.props.runes;

    return (<View style={styles.root}>
      <View style={styles.headerSelector}>
        <PageSelector
          pages={runes.getIn(['data', 'pages'])}
          onChangeSelected={newSelected => this.setState({ pageSelected: newSelected })}
        />
      </View>
      <View style={styles.runesContainer}>
        <RunePage page={runes.getIn(['data', 'pages', this.state.pageSelected])} />
      </View>
    </View>);
  }

  render() {
    const runes = this.props.runes;

    if (runes.get('isFetching')) {
      return (<View style={{ padding: 16, alignItems: 'center' }}>
        <LoadingIndicator />
      </View>);
    } else if (runes.get('fetchError')) {
      return (<ErrorScreen
        message={runes.get('errorMessage')}
        onPressRetryButton={this.props.onPressRetryButton}
      />);
    } else if (runes.get('fetched')) {
      return this.renderContent();
    }

    return null;
  }
}

RunesView.propTypes = {
  runes: ImmutablePropTypes.mapContains({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    fetchError: PropTypes.bool,
    data: ImmutablePropTypes.mapContains({
      pages: ImmutablePropTypes.list.isRequired,
    }),
    errorMessage: PropTypes.string,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default RunesView;
