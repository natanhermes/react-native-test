import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  TextInput,
  Alert,
} from 'react-native';

import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/Feather';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Header,
  Body,
  Title,
  LinkSection,
  ForgotPasswordText,
  PrivacyPolicyText,
  LoginWithNumberPhoneButton,
  LoginWithNumberPhoneText,
} from './styles';

interface SignInFormData {
  login: string;
  senha: string;
  nomeApp: string;
  versaoApp: string;
  versaoSO: string;
  idDispositivo: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { signIn, user } = useAuth();

  console.log(user);

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          login: Yup.string().required('Usuário obrigatório'),
          senha: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          login: data.login,
          senha: data.senha,
          nomeApp: 'br.com.eem.teste',
          versaoApp: '10',
          versaoSO: '10',
          idDispositivo: 'teste-mobile',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          console.log(errors);

          Alert.alert(
            'Erro na autenticação',
            'Ocorreu um erro ao fazer login, verifique as credenciais.',
          );
        }
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Header>
              <Icon name="chevron-left" size={30} color="#fff" />
              <Icon name="help-circle" size={30} color="#fff" />
            </Header>
            <Body>
              <View>
                <Title>
                  Informe o usuário e a senha encaminhados pela escola
                </Title>
              </View>
              <Form ref={formRef} onSubmit={handleSignIn}>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  name="login"
                  icon="user"
                  placeholder="Usuário"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={passwordInputRef}
                  name="senha"
                  icon="key"
                  placeholder="Senha"
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />

                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  Entrar
                </Button>
              </Form>

              <LinkSection>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                <PrivacyPolicyText>Política de privacidade</PrivacyPolicyText>
              </LinkSection>
            </Body>

            <LoginWithNumberPhoneButton>
              <Icon name="smartphone" size={30} color="#fff" />
              <LoginWithNumberPhoneText>
                Entrar com celular
              </LoginWithNumberPhoneText>
            </LoginWithNumberPhoneButton>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
