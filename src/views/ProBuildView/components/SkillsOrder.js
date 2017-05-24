import React, { Component, PropTypes } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';
import { MediaQueryStyleSheet } from 'react-native-responsive';

import { colors } from 'utils';
import { mediaBreakpointUp } from 'utils/mediaBreakpoints';

const styles = MediaQueryStyleSheet.create(
  {
    root: {
      flexDirection: 'row',
      paddingLeft: 6,
    },

    skillsCol: {
      width: 25,
      marginRight: 6,
    },

    skillLabel: {
      width: 26,
      height: 26,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accent,
      marginBottom: 4,
    },

    skillLabelText: {
      color: 'white',
    },

    timelinesCol: {
      flex: 1,
    },

    timelineRow: {
      flexDirection: 'row',
      marginBottom: 4,
    },

    timelinesScrollContent: {
      flexDirection: 'column',
      paddingBottom: 6,
    },

    timelineEntry: {
      width: 26,
      height: 26,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    specialEntry: {
      backgroundColor: colors.accent,
    },

    levelText: {
      color: 'white',
    },

    emptyEntry: {
      backgroundColor: 'transparent',
    },
  }, {
    [mediaBreakpointUp('tablet')]: {
      timelineEntry: {
        width: 32,
        height: 32,
      },

      skillsCol: {
        marginRight: 12,
      },

      skillLabel: {
        width: 32,
        height: 32,
      },
    },
  },
);


function renderTimeline(timeline) {
  return (<View style={styles.timelineRow}>
    {timeline.toArray().map((timelineEntry, idx) => {
      if (timelineEntry === null) {
        return <View key={idx} style={[styles.timelineEntry, styles.emptyEntry]} />;
      }

      const isSpecial = timelineEntry.get('levelUpType') !== 'NORMAL';
      const levelText = isSpecial ? '' : timelineEntry.get('championLevel');

      return (<View key={idx} style={[styles.timelineEntry, isSpecial && styles.specialEntry]}>
        <Text style={styles.levelText}>{levelText}</Text>
      </View>);
    })}
  </View>);
}

function renderSkill(name) {
  return (<View style={styles.skillLabel}>
    <Text style={styles.skillLabelText}>{name}</Text>
  </View>);
}

class SkillsOrder extends Component {
  constructor(props) {
    super(props);

    this.getSkillsTimelines = this.getSkillsTimelines.bind(this);
  }

  getSkillsTimelines() {
    const timelines = {
      1: [],
      2: [],
      3: [],
      4: [],
    };

    let actualLevel = 1;

    this.props.skills.forEach((skill) => {
      const levelUpType = skill.get('levelUpType');
      const skillSlot = skill.get('skillSlot');

      _.each(timelines, (timeline, key) => {
        if (parseInt(key, 10) !== skillSlot) {
          timeline.push(null);
        }
      });

      timelines[skillSlot].push({
        skillId: skillSlot,
        levelUpType,
        championLevel: actualLevel,
      });

      if (levelUpType === 'NORMAL') {
        actualLevel += 1;
      }
    });

    return Immutable.fromJS(timelines);
  }

  render() {
    const timelines = this.getSkillsTimelines();

    return (<View style={styles.root}>
      <View style={styles.skillsCol}>
        {renderSkill('Q')}
        {renderSkill('W')}
        {renderSkill('E')}
        {renderSkill('R')}
      </View>
      <View style={styles.timelinesCol}>
        <ScrollView
          style={styles.timelinesScroll}
          contentContainerStyle={styles.timelinesScrollContent}
          horizontal
        >
          {renderTimeline(timelines.get('1'))}
          {renderTimeline(timelines.get('2'))}
          {renderTimeline(timelines.get('3'))}
          {renderTimeline(timelines.get('4'))}
        </ScrollView>
      </View>
    </View>);
  }
}

SkillsOrder.propTypes = {
  skills: ImmutablePropTypes.listOf(
    ImmutablePropTypes.mapContains({
      levelUpType: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default SkillsOrder;
