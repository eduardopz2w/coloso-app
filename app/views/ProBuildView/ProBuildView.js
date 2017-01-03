import React, { Component, PropTypes } from 'react';
import { View, Image, Text, Dimensions, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import Modal from 'react-native-modalbox';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import numeral from 'numeral';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProBuildViewActions from '../../redux/actions/ProBuildViewActions';
import LoadingScreen from '../../components/LoadingScreen';
import ErrorScreen from '../../components/ErrorScreen';
import PlayerToolbar from './components/PlayerToolbar';
import BasicToolbar from './components/BasicToolbar';
import Item from './components/Item';
import colors from '../../utils/colors';
import RuneTab from './RuneTab';
import MasteryTab from './MasteryTab';

const itemsArrowSize = 20;

const styles = MediaQueryStyleSheet.create(
  {
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
      borderWidth: 1,
      borderColor: 'black',
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

    skillsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 16,
    },

    goldText: {
      color: colors.tiers.gold,
      fontWeight: 'bold',
      textShadowColor: '#000',
      textShadowOffset: {
        width: 0.2,
        height: 0.2,
      },
    },

    skillLabel: {
      width: 35,
      height: 35,
      backgroundColor: colors.primary,
      color: 'white',
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: 50,
      fontWeight: 'bold',
      fontSize: 16,
    },

    modal: {
      width: 300,
      height: null,
    },

    scoreText: {
      fontSize: 15,
      fontWeight: 'bold',
    },

    killsText: {
      color: colors.victory,
    },

    deathsText: {
      color: colors.defeat,
    },
  }, {
    '@media (min-device-width: 600)': {
      modal: {
        width: 450,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
      },
    },
  },
);

class ProBuildView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalData: {
        itemName: '',
        itemPlainText: '',
        itemId: 0,
        itemGold: 0,
      },
    };

    this.deviceDimensions = Dimensions.get('window');
    this.getItemStyle = this.getItemStyle.bind(this);
    this.renderSkillOrder = this.renderSkillOrder.bind(this);
    this.handleOnPressItem = this.handleOnPressItem.bind(this);
  }

  componentWillMount() {
    this.props.fetchBuild();
  }

  getItemStyle() {
    let numCols = 5;

    if (this.deviceDimensions.width >= 600) {
      numCols = 8;
    }

    let width = this.deviceDimensions.width - 32;

    width -= numCols * itemsArrowSize;
    width /= numCols;

    return {
      width,
      height: width,
    };
  }

  handleOnPressItem(itemData) {
    this.setState({
      modalData: {
        itemName: itemData.name,
        itemPlainText: itemData.plaintext,
        itemId: itemData.itemId,
        itemGold: numeral(itemData.gold.total).format('0,0'),
      },
    }, () => {
      this.modal.open();
    });
  }

  renderSkillOrder() {
    const skillsNodes = [];
    const skills = [
      { label: 'Q', value: 0 },
      { label: 'W', value: -1 },
      { label: 'E', value: -2 },
      { label: 'R', value: -3 },
    ];

    _.each(this.props.build.skillsOrder, (skillNumber) => {
      if (skillNumber === 1) {
        skills[0].value += 1;
      } else if (skillNumber === 2) {
        skills[1].value += 1;
      } else if (skillNumber === 3) {
        skills[2].value += 1;
      } else {
        skills[3].value += 1;
      }
    });

    _.map(_.orderBy(skills, ['value'], ['desc']), (skill, index) => {
      skillsNodes.push(<Text key={`sk_${index}`} style={styles.skillLabel}>{skill.label}</Text>);
      if (index !== 3) {
        skillsNodes.push(<Icon
          key={`ar_${index}`}
          style={styles.itemsArrow}
          name="keyboard-arrow-right"
          color="rgba(0,0,0,0.5)"
          size={18}
        />);
      }
    });

    return (<View style={styles.skillsContainer}>
      {skillsNodes}
    </View>);
  }

  render() {
    const { build } = this.props;
    const itemsAndSeparators = [];
    let itemData;

    if (this.props.fetched) {
      for (let i = 0; i < build.itemsOrder.length; i += 1) {
        itemData = build.itemsOrder[i];

        itemsAndSeparators.push(<Item
          key={`item_${i}`}
          style={this.getItemStyle()}
          itemData={itemData}
          onPress={this.handleOnPressItem}
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
                <Text style={styles.scoreText}>
                  <Text style={styles.killsText}>{build.stats.kills}</Text>/
                  <Text style={styles.deathsText}>{build.stats.deaths}</Text>/
                  <Text style={styles.assistsText}>{build.stats.assists}</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.summaryIcon} source={{ uri: 'ui_gold' }} />
                <Text style={styles.goldText}>
                  {numeral(build.stats.goldEarned).format('0,0')}
                </Text>
              </View>
            </View>

            <Text style={styles.title}>Prioridad de Habilidades</Text>

            {this.renderSkillOrder()}

            <Text style={styles.title}>Orden de Compra</Text>

            <View style={styles.itemsContainer}>
              {itemsAndSeparators}
            </View>
          </ScrollView>
          <RuneTab tabLabel="Runas" runes={this.props.build.runes} />
          <MasteryTab tabLabel="Maestrias" masteries={this.props.build.masteries} />
        </ScrollableTabView>

        <Modal
          position="bottom"
          style={styles.modal}
          backdrop={false}
          ref={(modal) => { this.modal = modal; }}
        >
          <View style={{ flexDirection: 'row', padding: 16 }}>
            <View style={{ marginRight: 8 }}>
              <Image
                style={styles.item}
                source={{ uri: `item_${this.state.modalData.itemId}` }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold' }}>{this.state.modalData.itemName}</Text>
              <View style={{ flexDirection: 'row', marginVertical: 4 }}>
                <Image style={{ width: 20, height: 20, marginRight: 8 }} source={{ uri: 'ui_gold' }} />
                <Text style={styles.goldText}>{this.state.modalData.itemGold}</Text>
              </View>
              <Text>{this.state.modalData.itemPlainText}</Text>
            </View>
          </View>
        </Modal>
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
      name: PropTypes.string,
      plaintext: PropTypes.string,
      gold: PropTypes.shape({
        total: PropTypes.number,
      }),
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
