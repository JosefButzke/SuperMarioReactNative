const marioSprite = {
  name: 'mario',
  size: { width: 35, height: 70 },
  animationTypes: ['IDLE', 'WALK', 'EAT', 'CELEBRATE', 'DISGUST', 'ALL'],
  frames: [
    require('../assets/spritesMario/SuperMario_walk1.png'),
    require('../assets/spritesMario/SuperMario_walk2.png'),
    require('../assets/spritesMario/SuperMario_walk3.png'),
    require('../assets/spritesMario/SuperMario_walk3.png'),
    require('../assets/spritesMario/SuperMario_walk3.png'),
    require('../assets/spritesMario/SuperMario_walk3.png'),
    require('../assets/spritesMario/SuperMario_walk3.png'),
    require('../assets/spritesMario/SuperMario_walk3.png'),
    require('../assets/spritesMario/SuperMario_walk3.png'),
  ],
  animationIndex: function getAnimationIndex(animationType) {
    switch (animationType) {
      case 'IDLE':
        return [0];
      case 'WALK':
        return [0, 1, 2];
      case 'EAT':
        return [4, 5, 4, 0];
      case 'CELEBRATE':
        return [6, 7, 6, 0, 6, 7, 6, 0];
      case 'DISGUST':
        return [0, 8, 8, 8, 8, 0];
      case 'ALL':
        return [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
  },
};

export default marioSprite;
