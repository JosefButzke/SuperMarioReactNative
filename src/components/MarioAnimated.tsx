import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

import AnimatedSprite from 'react-native-animated-sprite';
import monsterSprite from './marioSprite';

export default class MarioAnimatedMarioAnimated extends Component {
  constructor() {
    super();
    this.state = {
      animationType: 'WALK',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <AnimatedSprite
          loopAnimation={true}
          sprite={monsterSprite}
          animationFrameIndex={monsterSprite.animationIndex('WALK')}
          coordinates={{
            top: 0,
            left: 0,
          }}
          size={{
            width: monsterSprite.size.width,
            height: monsterSprite.size.height,
          }}
          draggable={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
