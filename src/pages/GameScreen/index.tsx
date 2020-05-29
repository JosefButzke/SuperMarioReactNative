import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import background from '../../assets/stage.png';
import Mario from '../../components/Mario';
import { Background, Container, SuperMario, Block } from './styles';

const GameScreen = () => {
  const marioRef = useRef(null);
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  const [fim, setFim] = useState(true);

  const blocks = [
    { xmin: -350, xmax: -400 },
    { xmin: -565, xmax: -615 },
  ];
  const floorAbove = [{ xmin: -390, xmax: -1200 }];

  //x = 382
  //y = 350

  position.addListener((mario) => {
    const find = blocks.find(
      (block) => block.xmin > mario.x && mario.x > block.xmax && mario.y >= 0,
    );
    console.log(mario);
    if (find) {
      setFim(true);
    }
  });

  useEffect(() => {
    if (!fim) {
      Animated.timing(position.x, {
        toValue: -4780,
        duration: 90000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      marioRef.current.idle();
    }
  }, [fim, position.x]);

  const handleJump = () => {
    marioRef.current.jump();
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

    setTimeout(() => {
      marioRef.current.walk();
    }, 600);

    if (fim) {
      marioRef.current.walk();
      setFim(false);
    }
  };

  return (
    <Container onPress={handleJump} activeOpacity={1}>
      <Background
        source={background}
        style={{ transform: [{ translateX: position.x }] }}
      />
      <Block
        style={{
          transform: [{ translateX: position.x }],
          left: 385, // { xmin: -355, xmax: -400 },
          width: 90,
        }}
      />
      <Block
        style={{
          transform: [{ translateX: position.x }],
          left: 545,
          width: 70,
        }}
      />

      <SuperMario
        style={{
          transform: [{ translateY: position.y }],
        }}>
        <Mario ref={marioRef} />
      </SuperMario>
    </Container>
  );
};

export default GameScreen;
