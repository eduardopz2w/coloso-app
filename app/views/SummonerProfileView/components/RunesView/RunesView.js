import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingScreen from '../../../../components/LoadingScreen';
import PageSelector from '../../../../components/PageSelector';
import RunePage from '../../../../components/RunePage';
import ErrorScreen from '../../../../components/ErrorScreen';

const styles = StyleSheet.create({
  root: {
  },
  headerSelector: {
    paddingLeft: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});

class RunesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSelected: 0,
    };
  }
  render() {
    const { isFetching, fetchError, pages } = this.props.runes;

    if (isFetching) {
      return <LoadingScreen />;
    }

    if (fetchError) {
      return (<ErrorScreen
        message="Error al cargar las runas"
        onPressRetryButton={this.props.onPressRetryButton}
        retryButton
      />);
    }

    return (<View style={styles.root}>
      <View style={styles.headerSelector}>
        <PageSelector
          pages={pages}
          onChangeSelected={newSelected => this.setState({ pageSelected: newSelected })}
        />
      </View>
      <RunePage page={pages[this.state.pageSelected]} />
    </View>);
  }
}

RunesView.propTypes = {
  runes: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    fetchError: PropTypes.bool,
    pages: PropTypes.array,
  }),
  onPressRetryButton: PropTypes.func.isRequired,
};

export default RunesView;
