import React, { Component, PropTypes } from 'react';
import { View, Image, Text, Dimensions, ScrollView } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Modal from 'react-native-modalbox';
import { Actions } from 'react-native-router-flux';
import numeral from 'numeral';
import I18n from 'i18n-js';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingIndicator from '../../../components/LoadingIndicator';
import ErrorScreen from '../../../components/ErrorScreen';
import PlayerToolbar from './PlayerToolbar';
import BasicToolbar from './BasicToolbar';
import Item from './Item';
import colors from '../../../utils/colors';
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

class ProBuild extends Component {
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
    this.props.fetchProBuild();
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
    const items = this.props.proBuildData.get('itemsOrder').toJS();
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
      const finalItemId = this.props.proBuildData.getIn(['stats', `item${i}`]);

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
    Actions.summoner_profile_view({
      summonerUrid: this.props.proBuildData.getIn(['proSummoner', 'summonerUrid']),
    });
  }

  renderSkillsPriority() {
    const skillsNodes = [];
    const skills = [];
    const skillsCount = [
      { label: 'Q', count: 0, pushed: false },
      { label: 'W', count: 0, pushed: false },
      { label: 'E', count: 0, pushed: false },
    ];

    this.props.proBuildData.get('skillsOrder').forEach((skill) => {
      if (skill.get('levelUpType') === 'NORMAL') {
        const skillSlot = skill.get('skillSlot');

        if (skillSlot === 1) {
          skillsCount[0].count += 1;

          if (skillsCount[0].count === 5) {
            skills.push('Q');
            skillsCount[0].pushed = true;
          }
        } else if (skillSlot === 2) {
          skillsCount[1].count += 1;

          if (skillsCount[1].count === 5) {
            skills.push('W');
            skillsCount[1].pushed = true;
          }
        } else if (skillSlot === 3) {
          skillsCount[2].count += 1;

          if (skillsCount[2].count === 5) {
            skills.push('E');
            skillsCount[2].pushed = true;
          }
        }
      }
    });

    _.each(_.orderBy(_.filter(skillsCount, { pushed: false }), 'count'), skill => skills.push(skill.label));

    skills.push('R');

    _.each(skills, (skill, index) => {
      skillsNodes.push(<Text key={`sk_${index}`} style={styles.skillLabel}>{skill}</Text>);
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
    const skillsOrderList = this.props.proBuildData.get('skillsOrder');
    const skillNodes = [];

    skillsOrderList.forEach((skill, skIndex) => {
      const levelUpType = skill.get('levelUpType');
      const skillSlot = skill.get('skillSlot');
      let skillLetter;

      if (skillSlot === 1) {
        skillLetter = 'Q';
      } else if (skillSlot === 2) {
        skillLetter = 'W';
      } else if (skillSlot === 3) {
        skillLetter = 'E';
      } else {
        skillLetter = 'R';
      }

      if (levelUpType === 'NORMAL') {
        skillNodes.push(<View key={`sk_${skIndex}`} style={{ marginHorizontal: 16, alignItems: 'center' }}>
          <Text style={styles.skillLabel}>{skillLetter}</Text>
          <Text style={{ textAlign: 'center' }}>{I18n.t('level')} {skIndex + 1}</Text>
        </View>);
      } else {
        skillNodes.push(<View key={`sk_${skIndex}`} style={{ marginHorizontal: 16, alignItems: 'center' }}>
          <Text style={[styles.skillLabel, { backgroundColor: '#F44336' }]}>{skillLetter}</Text>
          <Text style={{ textAlign: 'center' }}>{I18n.t('special')}</Text>
        </View>);
      }


      if (skIndex !== skillsOrderList.size - 1) {
        skillNodes.push(<Icon
          key={`ar_${skIndex}`}
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
    const proBuildData = this.props.proBuildData;
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
          name={proBuildData.getIn(['proSummoner', 'proPlayer', 'name'])}
          imageUrl={proBuildData.getIn(['proSummoner', 'proPlayer', 'imageUrl'])}
          role={proBuildData.getIn(['proSummoner', 'proPlayer', 'role'])}
          realName={proBuildData.getIn(['proSummoner', 'proPlayer', 'realName'])}
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
            <Text style={styles.title}>{I18n.t('information')}</Text>
            <View style={styles.championDataRow}>
              <Image source={{ uri: `champion_square_${proBuildData.get('championId')}` }} style={styles.championImage} />
              <View>
                <Image source={{ uri: `summoner_spell_${proBuildData.get('spell1Id')}` }} style={styles.summonerSpell} />
                <Image source={{ uri: `summoner_spell_${proBuildData.get('spell2Id')}` }} style={styles.summonerSpell} />
              </View>
              <View>
                <Text style={styles.championName}>{proBuildData.getIn(['championData', 'name'])}</Text>
                <Text style={styles.championTitle}>{proBuildData.getIn(['championData', 'title'])}</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <Text style={proBuildData.getIn(['stats', 'winner']) ? styles.winText : styles.lossText}>
                {proBuildData.getIn(['stats', 'winner']) ? I18n.t('victory') : I18n.t('defeat')}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.summaryIcon} source={{ uri: 'ui_score' }} />
                <Text style={styles.scoreText}>
                  <Text style={styles.killsText}>{proBuildData.getIn(['stats', 'kills'])}</Text>/
                  <Text style={styles.deathsText}>{proBuildData.getIn(['stats', 'deaths'])}</Text>/
                  <Text style={styles.assistsText}>{proBuildData.getIn(['stats', 'assists'])}</Text>
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.summaryIcon} source={{ uri: 'ui_gold' }} />
                <Text style={styles.goldText}>
                  {numeral(proBuildData.getIn(['stats', 'goldEarned'])).format('0,0')}
                </Text>
              </View>
            </View>

            <Text style={styles.title}>{I18n.t('skills_priority')}</Text>

            {this.renderSkillsPriority()}

            <Text style={styles.title}>{I18n.t('skills_order')}</Text>

            {this.renderSkillsOrder()}

            <Text style={styles.title}>{I18n.t('buy_order')}</Text>

            <View style={styles.itemsContainer}>
              {itemsAndSeparators}
            </View>
          </ScrollView>
          <RuneTab tabLabel={I18n.t('runes')} runes={proBuildData.get('runes')} />
          <MasteryTab tabLabel={I18n.t('masteries')} masteries={proBuildData.get('masteries')} />
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
        <View style={[styles.basicContainer, { alignItems: 'center' }]}>
          <LoadingIndicator />
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
          onPressRetryButton={this.props.fetchProBuild}
          retryButton
        />
      </View>
    </View>);
  }
}

ProBuild.propTypes = {
  proBuildData: ImmutablePropTypes.map,
  isFetching: PropTypes.bool,
  fetched: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchProBuild: PropTypes.func,
};

export default ProBuild;
