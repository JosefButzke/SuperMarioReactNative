import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export const SuperMario = styled(Animated.View)`
  width: 35px;
  height: 80px;
  border: 1px solid red;
  position: absolute;
  bottom: ${(deviceHeight / 100) * 5}px;
  left: ${(deviceWidth / 100) * 10}px;
`;
