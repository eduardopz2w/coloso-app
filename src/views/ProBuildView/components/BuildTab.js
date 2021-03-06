import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import I18n from 'i18n-js';
import { MediaQueryStyleSheet, MediaQuery } from 'react-native-responsive';
import ImmutablePropTypes from 'react-immutable-proptypes';
import numeral from 'numeral';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Immutable from 'immutable';

import { colors, sentenceCase } from 'utils';
import ItemsOrder from './ItemsOrder';
import SkillsOrder from './SkillsOrder';

const itemsArrowSize = 20;

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      flex: 1,
    },

    container: {
      paddingHorizontal: 16,
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
      backgroundColor: colors.accent,
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
      championImage: {
        width: 70,
        height: 70,
      },
      summonerSpell: {
        width: 35,
        height: 35,
        marginLeft: -12,
      },
      skillLabel: {
        width: 40,
        height: 40,
        fontSize: 18,
      },
      championName: {
        fontSize: 19,
      },
      championTitle: {
        fontSize: 16,
      },
    },
  },
);

class BuildTab extends Component {
  constructor(props) {
    super(props);

    this.deviceDimensions = Dimensions.get('window');
    this.renderSkillsPriority = this.renderSkillsPriority.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !Immutable.is(nextProps.proBuild, this.props.proBuild);
  }

  renderSkillsPriority() {
    const skillsNodes = [];
    const skills = [];
    const skillsCount = [
      { label: 'Q', count: 0, pushed: false },
      { label: 'W', count: 0, pushed: false },
      { label: 'E', count: 0, pushed: false },
    ];

    this.props.proBuild.getIn(['data', 'skillsOrder']).forEach((skill) => {
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

  render() {
    const proBuildData = this.props.proBuild.get('data');

    return (<ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{I18n.t('information')}</Text>
      <View style={styles.championDataRow}>
        <Image source={{ uri: `champion_square_${proBuildData.get('championId')}` }} style={styles.championImage} />
        <View>
          <Image source={{ uri: `summoner_spell_${proBuildData.get('spell1Id')}` }} style={styles.summonerSpell} />
          <Image source={{ uri: `summoner_spell_${proBuildData.get('spell2Id')}` }} style={styles.summonerSpell} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.championName}>{proBuildData.getIn(['champion', 'name'])}</Text>
          <Text style={styles.championTitle} numberOfLines={1} >{sentenceCase(proBuildData.getIn(['champion', 'title']))}</Text>
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

        <MediaQuery minDeviceWidth={600}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.summaryIcon} source={{ uri: 'ui_minion' }} />
            <Text style={{ fontWeight: 'bold' }}>{proBuildData.getIn(['stats', 'totalMinionsKilled']) || 0}</Text>
          </View>
        </MediaQuery>

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

      <SkillsOrder skills={this.props.proBuild.getIn(['data', 'skillsOrder'])} />

      <Text style={styles.title}>{I18n.t('buy_order')}</Text>

      <ItemsOrder
        itemsOrder={this.props.proBuild.getIn(['data', 'itemsOrder'])}
        onPressItem={this.props.onPressItem}
      />
    </ScrollView>);
  }
}

BuildTab.propTypes = {
  proBuild: ImmutablePropTypes.mapContains({
    fetched: PropTypes.bool.isRequired,
    fetchError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    data: ImmutablePropTypes.mapContains({}).isRequired,
  }).isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default BuildTab;
