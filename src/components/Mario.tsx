import React, { useState, forwardRef, useImperativeHandle } from 'react';
import AnimatedSprite from 'react-native-animated-sprite';
import monsterSprite from './marioSprite';

const Mario = forwardRef((props, ref) => {
  const [state, setState] = useState('IDLE');

  useImperativeHandle(ref, () => ({
    jump() {
      setState('JUMP');
    },
    walk() {
      setState('WALK');
    },
    idle() {
      setState('IDLE');
    },
  }));

  return (
    <AnimatedSprite
      loopAnimation={true}
      sprite={monsterSprite}
      animationFrameIndex={monsterSprite.animationIndex(state)}
      coordinates={{
        top: 0,
        left: 0,
      }}
      size={{
        width: monsterSprite.size.width,
        height: monsterSprite.size.height,
      }}
    />
  );
});

export default Mario;
