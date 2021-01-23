import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;

  padding: 20px 20px ${20 + getBottomSpace()}px 20px;
`;

export const Header = styled.TouchableOpacity`
  width: 100%;

  justify-content: space-between;
  flex-direction: row;
`;

export const Body = styled.View`
  width: 100%;

  justify-content: center;
`;

export const Title = styled.Text`
  width: 70%;
  font-size: 18px;
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  margin-bottom: 20px;
`;

export const LinkSection = styled.TouchableOpacity`
  margin-top: 32px;
  flex-direction: row;

  width: 100%;

  justify-content: space-between;
`;

export const ForgotPasswordText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const PrivacyPolicyText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const LoginWithNumberPhoneButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background: #0087a4;
  border-radius: 4px;
  border: 0.5px #fff;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
export const LoginWithNumberPhoneText = styled.Text`
  color: #fff;
  font-size: 20px;
  margin: 0 auto;
`;
