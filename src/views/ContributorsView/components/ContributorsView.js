import React, { PureComponent, PropTypes } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import I18n from 'i18n-js';

import Toolbar from './Toolbar';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  contributor: {
    flexDirection: 'row',
    paddingBottom: 16,
  },

  contributorImg: {
    width: 52,
    height: 52,
    borderRadius: 50,
  },

  dataCol: {
    marginLeft: 16,
    justifyContent: 'center',
  },

  name: {
    color: 'rgba(0,0,0,0.75)',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const Contributor = props => <View style={styles.contributor} key={props.imgUri}>
  <Image source={{ uri: props.imgUri }} style={styles.contributorImg} />
  <View style={styles.dataCol}>
    <Text style={styles.name}>{ props.name }</Text>
    <Text>{ props.contributions }</Text>
  </View>
</View>;

Contributor.propTypes = {
  imgUri: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  contributions: PropTypes.string.isRequired,
};


class ContributorsView extends PureComponent {
  render() {
    const contributors = [
      {
        imgUri: 'contributor_pedron',
        name: 'Alberto Pedron',
        contributions: I18n.t('contributions.mainDeveloper'),
      },
      {
        imgUri: 'contributor_higor',
        name: 'Higor Belarmino',
        contributions: I18n.t('contributions.translator', { lang: I18n.t('langs.pt') }),
      },
    ];

    return (<View style={styles.root}>
      <Toolbar onPressBackButton={this.props.goBack} />
      <View style={styles.container}>
        { contributors.map((contributor, idx) => <Contributor
          key={idx}
          imgUri={contributor.imgUri}
          name={contributor.name}
          contributions={contributor.contributions}
        />)}
      </View>
    </View>);
  }
}

ContributorsView.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default ContributorsView;
