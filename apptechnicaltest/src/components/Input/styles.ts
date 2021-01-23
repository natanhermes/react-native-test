import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: #0087a4;
  border-radius: 4px;
  border: 0.5px #fff;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border: 2px #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px #fff;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 4px;
`;
