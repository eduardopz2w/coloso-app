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
  container: {
    padding: 16,
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
    const { isFetching, fetched, pages } = this.props.runes;

    if (fetched) {
      return (<View style={styles.root}>
        <View style={styles.headerSelector}>
          <PageSelector
            pages={pages}
            onChangeSelected={newSelected => this.setState({ pageSelected: newSelected })}
          />
        </View>
        <View style={styles.container}>
          <RunePage page={pages[this.state.pageSelected]} />
        </View>
      </View>);
    } else if (isFetching) {
      return <LoadingScreen />;
    }

    return (<ErrorScreen
      message="Error al cargar las runas"
      onPressRetryButton={this.props.onPressRetryButton}
      retryButton
    />);
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
