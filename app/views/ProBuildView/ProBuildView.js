import React, { Component, PropTypes } from 'react';
import { View, Image, Text, Dimensions, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Modal from 'react-native-modalbox';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import numeral from 'numeral';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchBuild } from '../../redux/actions/ProBuildViewActions';
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
    this.getParsedItems = this.getParsedItems.bind(this);
    this.renderSkillsPriority = this.renderSkillsPriority.bind(this);
    this.renderSkillsOrder = this.renderSkillsOrder.bind(this);
    this.handleOnPressItem = this.handleOnPressItem.bind(this);
    this.handleOnPressProfileButton = this.handleOnPressProfileButton.bind(this);
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

  getParsedItems() {
    const countedItems = [];
    const items = this.props.build.get('itemsOrder').toJS();
    let j;

    for (let i = 0; i < items.length + 1; i += 1) {
      let count = 1;

      for (j = i + 1; j < items.length; j += 1) {
        if (items[i].itemId === items[j].itemId) {
          count += 1;
        } else {
          break;
        }
      }

      if (items[i]) {
        countedItems.push({
          ...items[i],
          count,
          final: false,
        });
      }

      i = j - 1;
    }

    for (let i = 6; i >= 0; i -= 1) {
      const finalItemId = this.props.build.getIn(['stats', `item${i}`]);

      if (finalItemId > 0) {
        _.eachRight(countedItems, (countedItem) => {
          if (countedItem.itemId === finalItemId) {
            _.assign(countedItem, { final: true });
            return false;
          }

          return true;
        });
      }
    }

    return countedItems;
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

  handleOnPressProfileButton() {
    const build = this.props.build;

    Actions.summoner_profile_view({
      summonerId: build.getIn(['proSummonerData', 'summonerId']),
      region: build.getIn(['proSummonerData', 'region']),
    });
  }

  renderSkillsPriority() {
    const skillsNodes = [];
    const skills = [
      { label: 'Q', value: 0 },
      { label: 'W', value: -1 },
      { label: 'E', value: -2 },
      { label: 'R', value: -3 },
    ];

    this.props.build.get('skillsOrder').forEach((skillNumber) => {
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

  renderSkillsOrder() {
    const skills = [];
    const skillNodes = [];

    this.props.build.get('skillsOrder').forEach((skillNumber) => {
      if (skillNumber === 1) {
        skills.push('Q');
      } else if (skillNumber === 2) {
        skills.push('W');
      } else if (skillNumber === 3) {
        skills.push('E');
      } else {
        skills.push('R');
      }
    });

    _.each(skills, (skill, index) => {
      skillNodes.push(<View key={`sk_${index}`} style={{ marginHorizontal: 16, alignItems: 'center' }}>
        <Text style={styles.skillLabel}>{skill}</Text>
        <Text style={{ textAlign: 'center' }}>Nivel {index + 1}</Text>
      </View>);

      if (index !== skills.length - 1) {
        skillNodes.push(<Icon
          key={`ar_${index}`}
          style={styles.itemsArrow}
          name="keyboard-arrow-right"
          color="rgba(0,0,0,0.5)"
          size={18}
        />);
      }
    });

    return (<ScrollView
      contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {skillNodes}
    </ScrollView>);
  }

  render() {
    const { build } = this.props;
    const itemsAndSeparators = [];
    let itemData;

    if (this.props.fetched) {
      const items = this.getParsedItems();
      for (let i = 0; i < items.length; i += 1) {
        itemData = items[i];

        itemsAndSeparators.push(<Item
          key={`item_${i}`}
          style={this.getItemStyle()}
          itemData={itemData}
          onPress={this.handleOnPressItem}
        />);

        if (i !== items.length - 1) {
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
          name={build.getIn(['proPlayerData', 'name'])}
          imageUrl={build.getIn(['proPlayerData', 'imageUrl'])}
          role={build.getIn(['proPlayerData', 'role'])}
          realName={build.getIn(['proPlayerData', 'realName'])}
          onPressBackButton={() => { Actions.pop(); }}
          onPressProfileButton={this.handleOnPressProfileButton}
        />
        <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
          tabBarBackgroundColor={colors.primary}
          tabBarActiveTextColor={colors.accent}
          tabBarInactiveTextColor="rgba(255,255,255,0.8)"
          tabBarUnderlineStyle={{ backgroundColor: colors.accent }}
          onChangeTab={this.handleOnChangeTab}
          locked
        >
          <ScrollView tabLabel="Build" contentContainerStyle={styles.container}>
            <Text style={styles.title}>Informacion</Text>
            <View style={styles.championDataRow}>
              <Image source={{ uri: `champion_square_${build.get('championId')}` }} style={styles.championImage} />
              <View>
                <Image source={{ uri: `summoner_spell_${build.get('spell1Id')}` }} style={styles.summonerSpell} />
                <Image source={{ uri: `summoner_spell_${build.get('spell2Id')}` }} style={styles.summonerSpell} />
              </View>
              <View>
                <Text style={styles.championName}>{build.getIn(['championData', 'name'])}</Text>
                <Text style={styles.championTitle}>{build.getIn(['championData', 'title'])}</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={build.getIn(['stats', 'winner']) ? styles.winText : styles.lossText}>
                {build.getIn(['stats', 'winner']) ? 'Victoria' : 'Derrota'}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.summaryIcon} source={{ uri: 'ui_score' }} />
                <Text style={styles.scoreText}>
                  <Text style={styles.killsText}>{build.getIn(['stats', 'kills'])}</Text>/
                  <Text style={styles.deathsText}>{build.getIn(['stats', 'deaths'])}</Text>/
                  <Text style={styles.assistsText}>{build.getIn(['stats', 'assists'])}</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.summaryIcon} source={{ uri: 'ui_gold' }} />
                <Text style={styles.goldText}>
                  {numeral(build.getIn(['stats', 'goldEarned'])).format('0,0')}
                </Text>
              </View>
            </View>

            <Text style={styles.title}>Prioridad de Habilidades</Text>

            {this.renderSkillsPriority()}

            <Text style={styles.title}>Orden de Habilidades</Text>

            {this.renderSkillsOrder()}

            <Text style={styles.title}>Orden de Compra</Text>

            <View style={styles.itemsContainer}>
              {itemsAndSeparators}
            </View>
          </ScrollView>
          <RuneTab tabLabel="Runas" runes={build.get('runes')} />
          <MasteryTab tabLabel="Maestrias" masteries={build.get('masteries')} />
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
  build: ImmutablePropTypes.mapContains({
    spell1Id: PropTypes.number,
    spell2Id: PropTypes.number,
    championId: PropTypes.number,
    championData: ImmutablePropTypes.mapContains({
      name: PropTypes.string,
      title: PropTypes.string,
    }),
    matchCreation: PropTypes.number,
    highestAchievedSeasonTier: PropTypes.string,
    masteries: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      masteryId: PropTypes.number,
      rank: PropTypes.number,
    })),
    runes: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      runeId: PropTypes.number,
      rank: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      image: ImmutablePropTypes.mapContains({
        full: PropTypes.string,
      }),
    })),
    stats: ImmutablePropTypes.mapContains({
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
    itemsOrder: ImmutablePropTypes.listOf(ImmutablePropTypes.mapContains({
      itemId: PropTypes.number,
      name: PropTypes.string,
      plaintext: PropTypes.string,
      gold: ImmutablePropTypes.mapContains({
        total: PropTypes.number,
      }),
    })),
    skillsOrder: ImmutablePropTypes.listOf(PropTypes.number),
    proPlayerData: ImmutablePropTypes.mapContains({
      name: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
    proSummonerData: ImmutablePropTypes.mapContains({
      summonerId: PropTypes.number,
      region: PropTypes.string,
      role: PropTypes.string,
      realName: PropTypes.string,
    }),
  }),
  isFetching: PropTypes.bool,
  fetched: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchBuild: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    build: state.proBuildView.get('build'),
    isFetching: state.proBuildView.get('isFetching'),
    fetched: state.proBuildView.get('fetched'),
    errorMessage: state.proBuildView.get('errorMessage'),
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    fetchBuild: () => {
      dispatch(fetchBuild(props.buildId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProBuildView);
