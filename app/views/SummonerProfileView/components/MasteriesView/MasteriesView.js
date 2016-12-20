import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingScreen from '../../../../components/LoadingScreen';
import PageSelector from './PageSelector';
import MasteryPage from './MasteryPage';

const styles = StyleSheet.create({
  root: {},
  headerSelector: {
    paddingLeft: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 16,
  },
});

class MasteriesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageSelected: 0,
    };
  }
  render() {
    const { isFetching, fetched, pages } = this.props.masteries;

    if (isFetching || !fetched) {
      return <LoadingScreen />;
    }

    return (<View style={styles.root}>
      <View style={styles.headerSelector}>
        <PageSelector
          pages={pages}
          onChangeSelected={newSelected => this.setState({ pageSelected: newSelected })}
        />
      </View>
      <MasteryPage page={pages[this.state.pageSelected]} />
    </View>);
  }
}

MasteriesView.propTypes = {
  masteries: PropTypes.shape({
    isFetching: PropTypes.bool,
    fetched: PropTypes.bool,
    pages: PropTypes.array,
  }),
};

export default MasteriesView;
