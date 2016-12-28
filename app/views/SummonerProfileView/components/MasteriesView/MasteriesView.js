import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingScreen from '../../../../components/LoadingScreen';
import PageSelector from '../../../../components/PageSelector';
import MasteryPage from '../../../../components/MasteryPage';
import colors from '../../../../utils/colors';
import ErrorScreen from '../../../../components/ErrorScreen';
import { tracker } from '../../../../utils/analytics';

const styles = StyleSheet.create({
  root: {},
  headerSelector: {
    paddingLeft: 16,
    backgroundColor: colors.titlesBackground,
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
    const { isFetching, fetched, pages } = this.props.masteries;

    if (fetched) {
      return (<View style={styles.root}>
        <View style={styles.headerSelector}>
          <PageSelector
            pages={pages}
            onChangeSelected={newSelected => this.setState({ pageSelected: newSelected })}
          />
        </View>
        <MasteryPage page={pages[this.state.pageSelected]} />
      </View>);
    } else if (isFetching) {
      return <LoadingScreen />;
    }

    return (<ErrorScreen
      message={this.props.masteries.errorMessage}
      onPressRetryButton={this.props.onPressRetryButton}
      retryButton
    />);
  }
}

MasteriesView.propTypes = {
  masteries: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    fetchError: PropTypes.bool,
    pages: PropTypes.array,
    errorMessage: PropTypes.string,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default MasteriesView;
