import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import {
    confirmSignInOtp,
    getAuthErrorMessage,
} from "../../services/authService";
import { colors, radius, spacing } from "../../theme/tokens";

export default function VerifyPhoneOtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleConfirm() {
    if (!/^\d{6}$/.test(otp)) {
      Alert.alert("Mã OTP chưa đúng", "Mã OTP phải gồm đúng 6 chữ số.");
      return;
    }

    try {
      setIsSubmitting(true);
      await confirmSignInOtp(otp);
    } catch (error) {
      Alert.alert("Đăng nhập thất bại", getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen>
      <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <BackButton onPress={() => router.replace("/auth/sign-in")}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </BackButton>

        <IconCircle>
          <Ionicons
            name="shield-checkmark-outline"
            size={34}
            color={colors.primary}
          />
        </IconCircle>
        <Title>Nhập mã OTP</Title>
        <Description>
          Firebase đã gửi mã gồm 6 chữ số đến số điện thoại bảo mật của bạn.
        </Description>

        <Input
          value={otp}
          onChangeText={(value) => setOtp(value.replace(/\D/g, "").slice(0, 6))}
          placeholder="000000"
          placeholderTextColor={colors.textMuted}
          keyboardType="number-pad"
          maxLength={6}
          textAlign="center"
          autoFocus
        />

        <PrimaryButton
          activeOpacity={0.75}
          disabled={isSubmitting}
          $disabled={isSubmitting}
          onPress={handleConfirm}
        >
          <PrimaryButtonText>
            {isSubmitting ? "Đang xác minh..." : "Xác nhận đăng nhập"}
          </PrimaryButtonText>
        </PrimaryButton>
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
  padding: ${spacing.xxl}px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: ${spacing.xxl}px;
  left: ${spacing.xxl}px;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.border};
  border-radius: ${radius.pill}px;
  background-color: ${colors.surface};
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

const Title = styled.Text`
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

const Input = styled.TextInput`
  height: 58px;
  margin-bottom: ${spacing.xl}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.md}px;
  background-color: ${colors.surface};
  color: ${colors.text};
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 10px;
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
