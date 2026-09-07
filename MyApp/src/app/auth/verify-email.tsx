import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { useAuth } from "../../context/AuthContext";
import {
  getAuthErrorMessage,
  logOut,
  resendVerificationEmail,
} from "../../services/authService";
import { colors, radius, spacing } from "../../theme/tokens";

export default function VerifyEmailScreen() {
  const { user, refreshUser } = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function handleCheckVerification() {
    try {
      setIsChecking(true);
      const refreshedUser = await refreshUser();

      if (!refreshedUser?.emailVerified) {
        Alert.alert(
          "Email chưa được xác minh",
          "Hãy mở email Firebase vừa gửi, nhấn vào liên kết xác minh rồi quay lại đây.",
        );
      }
    } catch (error) {
      Alert.alert("Không thể kiểm tra", getAuthErrorMessage(error));
    } finally {
      setIsChecking(false);
    }
  }

  async function handleResend() {
    try {
      setIsSending(true);
      await resendVerificationEmail();
      Alert.alert("Đã gửi lại email", "Hãy kiểm tra cả hộp thư đến và thư rác.");
    } catch (error) {
      Alert.alert("Không thể gửi email", getAuthErrorMessage(error));
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Screen>
      <Content>
        <IconCircle>
          <Ionicons name="mail-unread-outline" size={34} color={colors.primary} />
        </IconCircle>

        <StepText>BƯỚC 2/3</StepText>
        <Title>Xác minh email</Title>
        <Description>
          Chúng tôi đã gửi liên kết xác minh đến email bên dưới. Firebase yêu cầu
          email được xác minh trước khi bật OTP điện thoại.
        </Description>
        <Email>{user?.email}</Email>

        <PrimaryButton
          activeOpacity={0.75}
          disabled={isChecking}
          $disabled={isChecking}
          onPress={handleCheckVerification}
        >
          <PrimaryButtonText>
            {isChecking ? "Đang kiểm tra..." : "Tôi đã xác minh email"}
          </PrimaryButtonText>
        </PrimaryButton>

        <SecondaryButton disabled={isSending} onPress={handleResend}>
          <SecondaryButtonText>
            {isSending ? "Đang gửi..." : "Gửi lại email xác minh"}
          </SecondaryButtonText>
        </SecondaryButton>

        <SignOutButton onPress={logOut}>
          <SignOutText>Dùng tài khoản khác</SignOutText>
        </SignOutButton>
      </Content>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Content = styled.View`
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
  color: ${colors.textMuted};
  font-size: 14px;
  line-height: 21px;
`;

const Email = styled.Text`
  margin-top: ${spacing.lg}px;
  margin-bottom: ${spacing.xxxl}px;
  color: ${colors.text};
  font-size: 15px;
  font-weight: 700;
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
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-top: ${spacing.md}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.md}px;
  background-color: ${colors.surface};
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
