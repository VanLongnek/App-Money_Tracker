import Ionicons from "@react-native-vector-icons/ionicons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import {
  getAuthErrorMessage,
  resetPassword,
  signIn,
} from "../../services/authService";
import { colors, radius, spacing } from "../../theme/tokens";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn() {
    if (!email.trim() || !password) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập email và mật khẩu.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await signIn(email, password);

      if (result === "otp-required") {
        router.replace("/auth/verify-phone-otp");
      }
    } catch (error) {
      Alert.alert("Đăng nhập thất bại", getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      Alert.alert("Nhập email", "Hãy nhập email trước khi lấy lại mật khẩu.");
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert("Đã gửi email", "Hãy kiểm tra hộp thư để đặt lại mật khẩu.");
    } catch (error) {
      Alert.alert("Không thể gửi email", getAuthErrorMessage(error));
    }
  }

  return (
    <Screen>
      <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Brand>
          <Logo>
            <Ionicons name="wallet" size={29} color={colors.white} />
          </Logo>
          <BrandName>Ví Nhà</BrandName>
        </Brand>

        <Introduction>
          <Title>Chào mừng trở lại</Title>
          <Subtitle>Đăng nhập để tiếp tục quản lý tài chính của bạn.</Subtitle>
        </Introduction>

        <Label>Email</Label>
        <InputBox>
          <Ionicons name="mail-outline" size={20} color={colors.textMuted} />
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="ban@example.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </InputBox>

        <Label>Mật khẩu</Label>
        <InputBox>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={colors.textMuted}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Nhập mật khẩu"
            placeholderTextColor={colors.textMuted}
            secureTextEntry={!passwordVisible}
            autoComplete="current-password"
          />
          <EyeButton onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.textMuted}
            />
          </EyeButton>
        </InputBox>

        <ForgotButton onPress={handleForgotPassword}>
          <ForgotText>Quên mật khẩu?</ForgotText>
        </ForgotButton>

        <PrimaryButton
          activeOpacity={0.75}
          disabled={isSubmitting}
          $disabled={isSubmitting}
          onPress={handleSignIn}
        >
          <PrimaryButtonText>
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </PrimaryButtonText>
        </PrimaryButton>

        <Divider>
          <DividerLine />
          <DividerText>hoặc</DividerText>
          <DividerLine />
        </Divider>

        <GoogleButton
          activeOpacity={0.75}
          onPress={() =>
            Alert.alert("Thông báo", "Đăng nhập Google sẽ được thêm sau.")
          }
        >
          <Ionicons name="logo-google" size={19} color={colors.text} />
          <GoogleButtonText>Tiếp tục với Google</GoogleButtonText>
        </GoogleButton>

        <FooterText>
          Chưa có tài khoản?{" "}
          <SignUpLink href="/auth/sign-up">Đăng ký ngay</SignUpLink>
        </FooterText>
      </Container>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  padding: 0 ${spacing.xxl}px;
`;

const Brand = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
`;

const Logo = styled.View`
  width: 52px;
  height: 52px;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.md}px;
  background-color: ${colors.primary};
`;

const BrandName = styled.Text`
  color: ${colors.primaryDark};
  font-size: 22px;
  font-weight: 800;
`;

const Introduction = styled.View`
  margin-top: ${spacing.xxxl}px;
  margin-bottom: ${spacing.xxl}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.6px;
`;

const Subtitle = styled.Text`
  margin-top: ${spacing.sm}px;
  color: ${colors.textMuted};
  font-size: 13px;
  line-height: 19px;
`;

const Label = styled.Text`
  margin-bottom: ${spacing.sm}px;
  color: ${colors.text};
  font-size: 12px;
  font-weight: 700;
`;

const InputBox = styled.View`
  height: 52px;
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  margin-bottom: ${spacing.lg}px;
  padding: 0 ${spacing.lg}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.md}px;
  background-color: ${colors.surface};
`;

const Input = styled.TextInput`
  flex: 1;
  color: ${colors.text};
  font-size: 14px;
`;

const EyeButton = styled.Pressable``;

const ForgotButton = styled.TouchableOpacity`
  margin-top: -${spacing.sm}px;
  align-self: flex-end;
`;

const ForgotText = styled.Text`
  color: ${colors.primary};
  font-size: 12px;
  font-weight: 700;
`;

const PrimaryButton = styled.TouchableOpacity<{ $disabled: boolean }>`
  height: 52px;
  align-items: center;
  justify-content: center;
  margin-top: ${spacing.xxl}px;
  border-radius: ${radius.md}px;
  background-color: ${colors.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const PrimaryButtonText = styled.Text`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 800;
`;

const Divider = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  margin: ${spacing.xl}px 0;
`;

const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${colors.border};
`;

const DividerText = styled.Text`
  color: ${colors.textMuted};
  font-size: 11px;
`;

const GoogleButton = styled.TouchableOpacity`
  height: 52px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${spacing.md}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.md}px;
  background-color: ${colors.surface};
`;

const GoogleButtonText = styled.Text`
  color: ${colors.text};
  font-size: 13px;
  font-weight: 700;
`;

const FooterText = styled.Text`
  margin-top: ${spacing.xxl}px;
  color: ${colors.textMuted};
  font-size: 12px;
  text-align: center;
`;

const SignUpLink = styled(Link)`
  color: ${colors.primary};
  font-weight: 800;
`;
