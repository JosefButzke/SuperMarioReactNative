import React from 'react';
import Mario from '../Mario';
import { SuperMario } from './styles';

const MarioContainer = () => {
  return (
    <SuperMario
      style={{
        transform: [{ translateY: position.y }],
      }}>
      <Mario />
    </SuperMario>
  );
};

export default MarioContainer;
