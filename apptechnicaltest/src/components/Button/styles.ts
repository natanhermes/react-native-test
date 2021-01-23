import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #fff;
  border-radius: 5px;

  justify-content: center;
  align-items: center;

  margin-top: 20px;
`;

export const ButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #2385a7;
  font-size: 18px;
`;
