import React, { useEffect, useState, useCallback } from 'react';
import { Animated, Easing, Dimensions, View } from 'react-native';
import MarioAnimated from '../../components/MarioAnimated';
import background from '../../assets/stage.png';
import { Background, Container, SuperMario } from './styles';
const deviceWidth = Dimensions.get('screen').width;

const GameScreen = () => {
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  const [fim, setFim] = useState(true);

  const blocks = [
    { xmedium: -400 + (deviceWidth / 100) * 10 },
    { xmedium: -580 + (deviceWidth / 100) * 10 },
    { xmedium: -1000 + (deviceWidth / 100) * 10 },
  ];

  //x = 382
  //y = 350

  // useEffect(() => {
  //   console.log(position);
  // }, [position]);

  position.addListener((mario) => {
    const find = blocks.find(
      (block) =>
        block.xmedium <= mario.x + 40 &&
        block.xmedium >= mario.x - 40 &&
        mario.y >= 0,
    );

    if (find) {
      setFim(true);
    }
  });

  useEffect(() => {
    !fim &&
      Animated.timing(position.x, {
        toValue: -4780,
        duration: 30000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
  }, [fim, position.x]);

  const handleJump = useCallback(() => {
    Animated.sequence([
      Animated.timing(position.y, {
        useNativeDriver: true,
        toValue: -150,
        duration: 300,
      }),
      Animated.timing(position.y, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
      }),
    ]).start();
    if (fim) {
      setFim(false);
    }
  }, [position.y, fim]);

  return (
    <Container onPress={handleJump} activeOpacity={1}>
      <Background
        source={background}
        style={{ transform: [{ translateX: position.x }] }}
      />
      <SuperMario
        style={{
          transform: [{ translateY: position.y }],
        }}>
        <MarioAnimated />
      </SuperMario>
    </Container>
  );
};

export default GameScreen;
