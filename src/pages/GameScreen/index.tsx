import React, { useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import mario from '../../assets/mario.png';
import background from '../../assets/stage.png';
import { Background, Container, SuperMario } from './styles';

const GameScreen = () => {
  const x = new Animated.Value(0);
  const y = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(x, {
      toValue: -4780,
      duration: 30000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [x]);

  const handleJump = () => {
    Animated.sequence([
      Animated.spring(y, {
        useNativeDriver: true,
        toValue: -150,
        overshootClamping: true,
      }),
      Animated.timing(y, {
        useNativeDriver: true,
        toValue: 0,
      }),
    ]).start();
  };

  return (
    <Container onPress={handleJump} activeOpacity={1}>
      <Background source={background} style={{ transform: [{ translateX: x }] }} />
      <SuperMario source={mario} style={{ transform: [{ translateY: y }] }} />
    </Container>
  );
};

export default GameScreen;
