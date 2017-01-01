import React, { Component, PropTypes } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProBuildViewActions from '../../redux/actions/ProBuildViewActions';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import PlayerToolbar from './components/PlayerToolbar';
import BasicToolbar from './components/BasicToolbar';
import colors from '../../utils/colors';
import RuneTab from './RuneTab';
import MasteryTab from './MasteryTab';

const itemsArrowSize = 20;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  basicContainer: {
    padding: 16,
    flex: 1,
  },

  championImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'black',
    zIndex: 1,
  },

  championDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  summonerSpell: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: -8,
    marginRight: 16,
  },

  championName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  summaryRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  winText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.victory,
  },

  lossText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.defeat,
  },

  summaryIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },

  title: {
    backgroundColor: colors.titlesBackground,
    marginVertical: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  item: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 16,
  },

  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  itemsArrow: {
    width: itemsArrowSize,
  },
});

class ProBuildView extends Component {
  constructor(props) {
    super(props);
    this.deviceDimensions = Dimensions.get('window');
    this.getItemStyle = this.getItemStyle.bind(this);
  }

  componentWillMount() {
    this.props.fetchBuild();
  }

  getItemStyle() {
    let width = this.deviceDimensions.width - 32;
    const numCols = 5;

    width -= numCols * itemsArrowSize;
    width /= numCols;

    return {
      width,
      height: width,
    };
  }

  render() {
    const { build } = this.props;
    const itemsAndSeparators = [];
    let itemData;

    if (this.props.fetched) {
      for (let i = 0; i < build.itemsOrder.length; i += 1) {
        itemData = build.itemsOrder[i];

        itemsAndSeparators.push(<Image
          key={`item_${i}`}
          style={[styles.item, this.getItemStyle()]}
          source={{ uri: `item_${itemData.itemId}` }}
        />);

        if (i !== build.itemsOrder.length - 1) {
          itemsAndSeparators.push(<Icon
            key={`arrow_${i}`}
            style={styles.itemsArrow}
            name="keyboard-arrow-right"
            color="rgba(0,0,0,0.5)"
            size={18}
          />);
        }
      }

      return (<View style={styles.root}>
        <PlayerToolbar
          playerName={build.profPlayerData.name}
          playerImageUrl={build.profPlayerData.imageUrl}
          onPressBackButton={() => { Actions.pop(); }}
        />
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
          tabBarBackgroundColor={colors.primary}
          tabBarActiveTextColor={colors.accent}
          tabBarInactiveTextColor="rgba(255,255,255,0.8)"
          tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
          onChangeTab={this.handleOnChangeTab}
        >
          <ScrollView tabLabel="Build" contentContainerStyle={styles.container}>
            <Text style={styles.title}>Informacion</Text>
            <View style={styles.championDataRow}>
              <Image source={{ uri: `champion_square_${build.championId}` }} style={styles.championImage} />
              <View>
                <Image source={{ uri: `summoner_spell_${build.spell1Id}` }} style={styles.summonerSpell} />
                <Image source={{ uri: `summoner_spell_${build.spell2Id}` }} style={styles.summonerSpell} />
              </View>
              <View>
                <Text style={styles.championName}>{build.championData.name}</Text>
                <Text style={styles.championTitle}>{build.championData.title}</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={build.stats.winner ? styles.winText : styles.lossText}>
                {build.stats.winner ? 'Victoria' : 'Derrota'}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.summaryIcon} source={{ uri: 'ui_score' }} />
                <Text>{build.stats.kills}/{build.stats.deaths}/{build.stats.assists}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.summaryIcon} source={{ uri: 'ui_gold' }} />
                <Text>{build.stats.goldEarned}</Text>
              </View>
            </View>

            <Text style={styles.title}>Objetos Comprados</Text>

            <View style={styles.itemsContainer}>
              {itemsAndSeparators}
            </View>
          </ScrollView>
          <RuneTab tabLabel="Runas" runes={this.props.build.runes} />
          <MasteryTab tabLabel="Maestrias" masteries={this.props.build.masteries} />
        </ScrollableTabView>
      </View>);
    } else if (this.props.isFetching) {
      return (<View style={styles.root}>
        <BasicToolbar
          onPressBackButton={() => { Actions.pop(); }}
        />
        <View style={styles.basicContainer}>
          <LoadingScreen />
        </View>
      </View>);
    }

    return (<View style={styles.root}>
      <BasicToolbar
        onPressBackButton={() => { Actions.pop(); }}
      />
      <View style={styles.basicContainer}>
        <ErrorScreen
          message={this.props.errorMessage}
          onPressRetryButton={this.props.fetchBuild}
          retryButton
        />
      </View>
    </View>);
  }
}

ProBuildView.propTypes = {
  build: PropTypes.shape({
    spell1Id: PropTypes.number,
    spell2Id: PropTypes.number,
    championId: PropTypes.number,
    championData: PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
    }),
    matchCreation: PropTypes.number,
    highestAchievedSeasonTier: PropTypes.string,
    masteries: PropTypes.arrayOf(PropTypes.shape({
      masteryId: PropTypes.number,
      rank: PropTypes.number,
    })),
    runes: PropTypes.arrayOf(PropTypes.shape({
      runeId: PropTypes.number,
      rank: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.shape({
        full: PropTypes.string,
      }),
    })),
    stats: PropTypes.shape({
      winner: PropTypes.bool,
      champLevel: PropTypes.number,
      item0: PropTypes.number,
      item1: PropTypes.number,
      item2: PropTypes.number,
      item3: PropTypes.number,
      item4: PropTypes.number,
      item5: PropTypes.number,
      item6: PropTypes.number,
      kills: PropTypes.number,
      deaths: PropTypes.number,
      assists: PropTypes.number,
      goldEarned: PropTypes.number,
      largestMultiKill: PropTypes.number,
    }),
    itemsOrder: PropTypes.arrayOf(PropTypes.shape({
      itemId: PropTypes.number,
    })),
    skillsOrder: PropTypes.arrayOf(PropTypes.number),
    profPlayerData: PropTypes.shape({
      name: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
  }),
  isFetching: PropTypes.bool,
  fetched: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchBuild: PropTypes.func,
};

function mapStateToProps(state) {
  return state.proBuildView.toJS();
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchBuild: () => {
      dispatch(ProBuildViewActions.fetchBuild(props.buildId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildView);
