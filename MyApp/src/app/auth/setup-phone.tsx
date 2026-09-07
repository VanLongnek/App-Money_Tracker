import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { useAuth } from "../../context/AuthContext";
import {
  confirmEnrollmentOtp,
  getAuthErrorMessage,
  logOut,
  sendEnrollmentOtp,
} from "../../services/authService";
import { colors, radius, spacing } from "../../theme/tokens";

export default function SetupPhoneScreen() {
  const { refreshUser } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSendOtp() {
    const normalizedPhoneNumber = normalizeVietnamesePhoneNumber(phoneNumber);

    if (!normalizedPhoneNumber) {
      Alert.alert("Số điện thoại chưa đúng", "Ví dụ hợp lệ: 0901234567 hoặc +84901234567.");
      return;
    }

    if (!password) {
      Alert.alert("Chưa nhập mật khẩu", "Hãy nhập lại mật khẩu để bảo vệ tài khoản.");
      return;
    }

    try {
      setIsSubmitting(true);
      await sendEnrollmentOtp(normalizedPhoneNumber, password);
      setOtpSent(true);
      Alert.alert("Đã gửi OTP", "Hãy nhập mã gồm 6 chữ số được gửi đến điện thoại.");
    } catch (error) {
      Alert.alert("Không thể gửi OTP", getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmOtp() {
    if (!/^\d{6}$/.test(otp)) {
      Alert.alert("Mã OTP chưa đúng", "Mã OTP phải gồm đúng 6 chữ số.");
      return;
    }

    try {
      setIsSubmitting(true);
      await confirmEnrollmentOtp(otp);
      await refreshUser();
    } catch (error) {
      Alert.alert("Xác minh thất bại", getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen>
      <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <IconCircle>
          <Ionicons name="phone-portrait-outline" size={34} color={colors.primary} />
        </IconCircle>

        <StepText>BƯỚC 3/3</StepText>
        <Title>Bảo mật tài khoản</Title>
        <Description>
          Xác nhận lại mật khẩu, sau đó Firebase sẽ gửi mã OTP tới số điện thoại
          bảo mật của bạn.
        </Description>

        <Label>Số điện thoại</Label>
        <InputBox>
          <Ionicons name="call-outline" size={20} color={colors.textMuted} />
          <Input
            editable={!otpSent}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="0901234567"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
          />
        </InputBox>

        {!otpSent ? (
          <>
            <Label>Xác nhận mật khẩu</Label>
            <InputBox>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} />
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </InputBox>
          </>
        ) : null}

        {otpSent ? (
          <>
            <Label>Mã OTP</Label>
            <InputBox>
              <Ionicons name="keypad-outline" size={20} color={colors.textMuted} />
              <Input
                value={otp}
                onChangeText={(value) => setOtp(value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                maxLength={6}
              />
            </InputBox>
          </>
        ) : null}

        <PrivacyText>
          Khi tiếp tục, số điện thoại sẽ được gửi cho Firebase/Google để xác minh và
          chống lạm dụng.
        </PrivacyText>

        <PrimaryButton
          activeOpacity={0.75}
          disabled={isSubmitting}
          $disabled={isSubmitting}
          onPress={otpSent ? handleConfirmOtp : handleSendOtp}
        >
          <PrimaryButtonText>
            {isSubmitting
              ? "Đang xử lý..."
              : otpSent
                ? "Xác minh và hoàn tất"
                : "Gửi mã OTP"}
          </PrimaryButtonText>
        </PrimaryButton>

        {otpSent ? (
          <SecondaryButton disabled={isSubmitting} onPress={handleSendOtp}>
            <SecondaryButtonText>Gửi lại mã OTP</SecondaryButtonText>
          </SecondaryButton>
        ) : null}

        <SignOutButton onPress={logOut}>
          <SignOutText>Dùng tài khoản khác</SignOutText>
        </SignOutButton>
      </Container>
    </Screen>
  );
}

function normalizeVietnamesePhoneNumber(value: string) {
  const compactValue = value.replace(/[\s()-]/g, "");
  const internationalValue = compactValue.startsWith("0")
    ? `+84${compactValue.slice(1)}`
    : compactValue;

  return /^\+84\d{9,10}$/.test(internationalValue) ? internationalValue : undefined;
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  padding: ${spacing.xxl}px;
`;

const IconCircle = styled.View`
  width: 68px;
  height: 68px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.xxl}px;
  border-radius: ${radius.pill}px;
  background-color: ${colors.primarySoft};
`;

const StepText = styled.Text`
  color: ${colors.primary};
  font-size: 12px;
  font-weight: 800;
`;

const Title = styled.Text`
  margin-top: ${spacing.sm}px;
  color: ${colors.text};
  font-size: 28px;
  font-weight: 800;
`;

const Description = styled.Text`
  margin-top: ${spacing.md}px;
  margin-bottom: ${spacing.xxl}px;
  color: ${colors.textMuted};
  font-size: 14px;
  line-height: 21px;
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
  font-size: 15px;
`;

const PrivacyText = styled.Text`
  margin-bottom: ${spacing.xl}px;
  color: ${colors.textMuted};
  font-size: 11px;
  line-height: 17px;
`;

const PrimaryButton = styled.TouchableOpacity<{ $disabled: boolean }>`
  height: 52px;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.md}px;
  background-color: ${colors.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const PrimaryButtonText = styled.Text`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 800;
`;

const SecondaryButton = styled.TouchableOpacity`
  height: 48px;
  align-items: center;
  justify-content: center;
  margin-top: ${spacing.md}px;
`;

const SecondaryButtonText = styled.Text`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: 700;
`;

const SignOutButton = styled.TouchableOpacity`
  align-self: center;
  padding: ${spacing.xl}px;
`;

const SignOutText = styled.Text`
  color: ${colors.textMuted};
  font-size: 13px;
  font-weight: 600;
`;
