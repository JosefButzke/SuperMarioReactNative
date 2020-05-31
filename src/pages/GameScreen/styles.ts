import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

export const Container = styled.TouchableOpacity`
  flex: 1;
  background: #f8e0b0;
`;

export const Background = styled(Animated.Image)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2000px;
  height: 430px;
`;

export const SuperMario = styled(Animated.View)`
  width: 35px;
  height: 80px;
  /* border: 1px solid red; */
  position: absolute;
  bottom: ${(deviceHeight / 100) * 5}px;
  left: ${(deviceWidth / 100) * 10}px;
`;

export const Block = styled(Animated.View)`
  height: 10px;
  background: red;
  position: absolute;
  bottom: ${(deviceHeight / 100) * 5}px;
`;

export const Flag = styled(Animated.Image)`
  width: 40px;
  height: 40px;
  position: absolute;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  bottom: 74px;
  left: 30px;
`;
