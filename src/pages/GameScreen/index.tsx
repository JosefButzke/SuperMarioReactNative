import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import background from '../../assets/stage.png';
import flag from '../../assets/flag.png';
import Mario from '../../components/Mario/';
import { Background, Container, SuperMario, Block, Flag } from './styles';

const deviceWidthOffset = (Dimensions.get('screen').width / 100) * 10;

const GameScreen = () => {
  const marioRef = useRef(null);
  const [position, setPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [positionFlag, setPositionFlag] = useState(new Animated.Value(0));
  const [fim, setFim] = useState(true);
  const [win, setWin] = useState(false);

  const [bottom, setBottom] = useState(44);

  const blocks = [
    { xmin: -387, xmax: -475 },
    { xmin: -605, xmax: -705 },
  ];
  const floorAbove = [{ xmin: -976, xmax: -1330 }];

  position.addListener((mario) => {
    const find = blocks.find(
      (block) =>
        block.xmin + deviceWidthOffset > mario.x &&
        mario.x > block.xmax + deviceWidthOffset + 35 &&
        mario.y >= 0,
    );

    const findUpFloor = floorAbove.find(
      (floor) =>
        floor.xmin + deviceWidthOffset > mario.x &&
        mario.x > floor.xmax + deviceWidthOffset + 35 &&
        mario.y < -44,
    );

    const outsideFindUpFloor = floorAbove.find(
      (floor) =>
        floor.xmin + deviceWidthOffset > mario.x &&
        mario.x > floor.xmax + deviceWidthOffset,
    );

    if (mario.x <= -1400) {
      setWin(true);
    }

    if (find) {
      setFim(true);
    }

    if (findUpFloor) {
      setBottom(88);
    }

    if (!outsideFindUpFloor && bottom === 88) {
      setBottom(44);
    }
  });

  useEffect(() => {
    if (win) {
      marioRef.current.idle();
      Animated.timing(position.x, {
        useNativeDriver: true,
        toValue: -1400,
        duration: 200,
      }).start();
      Animated.timing(positionFlag, {
        useNativeDriver: true,
        toValue: -150,
        duration: 2000,
      }).start();
    }
  }, [win]);

  useEffect(() => {
    if (!fim) {
      Animated.timing(position.x, {
        toValue: -1794,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      marioRef.current.idle();

      Animated.timing(position.y, {
        useNativeDriver: true,
        toValue: 100,
        duration: 200,
      }).start(() => {
        Animated.parallel([
          Animated.timing(position.x, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(position.y, {
            useNativeDriver: true,
            toValue: 0,
            duration: 200,
          }),
        ]).start();
      });
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
    }, 700);

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
      <Flag
        source={flag}
        isVisible={win}
        style={{ transform: [{ translateY: positionFlag }] }}
      />

      {/* {blocks.map((block) => (
        <Block
          key={block.xmin}
          style={{
            transform: [{ translateX: position.x }],
            left: Math.abs(block.xmin),
            width: Math.abs(block.xmin - block.xmax),
          }}
        />
      ))}

      <Block
        style={{
          transform: [{ translateX: position.x }],
          left: Math.abs(floorAbove[0].xmin),
          width: Math.abs(floorAbove[0].xmin - floorAbove[0].xmax),
          bottom: 88,
        }}
      /> */}

      <SuperMario
        style={{
          transform: [{ translateY: position.y }],
          bottom: bottom,
        }}>
        <Mario ref={marioRef} />
      </SuperMario>
    </Container>
  );
};

export default GameScreen;
