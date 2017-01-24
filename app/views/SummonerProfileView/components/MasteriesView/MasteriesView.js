import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PageSelector from '../../../../components/PageSelector';
import MasteryPage from '../../../../components/MasteryPage';
import colors from '../../../../utils/colors';
import ErrorScreen from '../../../../components/ErrorScreen';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { tracker } from '../../../../utils/analytics';

const styles = StyleSheet.create({
  root: {},
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

    this.state = {
      pageSelected: 0,
    };
  }

  componentDidMount() {
    tracker.trackScreenView('MasteriesView');
  }

  render() {
    const { masteries } = this.props;
    console.log(masteries.toJS());
    if (masteries.get('fetched')) {
      return (<View style={styles.root}>
        <View style={styles.headerSelector}>
          <PageSelector
            pages={masteries.getIn(['data', 'attributes', 'pages'])}
            onChangeSelected={newSelected => this.setState({ pageSelected: newSelected })}
          />
        </View>
        <MasteryPage page={masteries.getIn(['data', 'attributes', 'pages', this.state.pageSelected])} />
      </View>);
    } else if (masteries.get('isFetching')) {
      return (<View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
        <LoadingIndicator />
      </View>);
    }

    return (<View style={styles.container}>
      <ErrorScreen
        message={masteries.get('errorMessage')}
        onPressRetryButton={this.props.onPressRetryButton}
        retryButton
      />
    </View>);
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
