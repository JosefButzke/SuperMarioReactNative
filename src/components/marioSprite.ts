const marioSprite = {
  name: 'mario',
  size: { width: 35, height: 80 },
  animationTypes: ['IDLE', 'WALK', 'JUMP'],
  frames: [
    require('../assets/spritesMario/SuperMario_idle.png'),
    require('../assets/spritesMario/SuperMario_walk1.png'),
    require('../assets/spritesMario/SuperMario_walk2.png'),
    require('../assets/spritesMario/SuperMario_walk3.png'),
    require('../assets/spritesMario/SuperMario_jump.png'),
  ],
  animationIndex: function getAnimationIndex(animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'WALK':
        return [1, 2, 3];
      case 'JUMP':
        return [4];
    }
  },
};

export default marioSprite;
