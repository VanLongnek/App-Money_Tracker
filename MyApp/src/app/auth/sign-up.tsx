import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { getAuthErrorMessage, signUp } from "../../services/authService";
import { colors, radius, spacing } from "../../theme/tokens";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignUp() {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ các trường.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Mật khẩu chưa đủ dài", "Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Mật khẩu không khớp", "Hãy kiểm tra lại mật khẩu xác nhận.");
      return;
    }

    try {
      setIsSubmitting(true);
      await signUp(name, email, password);
    } catch (error) {
      Alert.alert("Đăng ký thất bại", getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen>
      <ScrollArea keyboardShouldPersistTaps="handled">
        <Content>
          <BackButton activeOpacity={0.65} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={colors.text} />
          </BackButton>

          <Title>Tạo tài khoản</Title>
          <Subtitle>Bắt đầu xây dựng thói quen tài chính tốt hơn.</Subtitle>

          <FormField
            icon="person-outline"
            label="Họ và tên"
            placeholder="Nguyễn Văn An"
            value={name}
            onChangeText={setName}
            autoComplete="name"
          />
          <FormField
            icon="mail-outline"
            label="Email"
            placeholder="ban@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          <FormField
            icon="lock-closed-outline"
            label="Mật khẩu"
            placeholder="Tối thiểu 8 ký tự"
            value={password}
            onChangeText={setPassword}
            secure
            autoComplete="new-password"
          />
          <FormField
            icon="shield-checkmark-outline"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secure
            autoComplete="new-password"
          />

          <CreateButton
            activeOpacity={0.75}
            disabled={isSubmitting}
            $disabled={isSubmitting}
            onPress={handleSignUp}
          >
            <CreateButtonText>
              {isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            </CreateButtonText>
          </CreateButton>

          <FooterText>
            Đã có tài khoản? <SignInLink href="/auth/sign-in">Đăng nhập</SignInLink>
          </FooterText>
        </Content>
      </ScrollArea>
    </Screen>
  );
}

type FormFieldProps = {
  icon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secure?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?: "name" | "email" | "new-password";
};

function FormField({
  icon,
  label,
  placeholder,
  value,
  onChangeText,
  secure = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoComplete,
}: FormFieldProps) {
  return (
    <Field>
      <Label>{label}</Label>
      <InputBox>
        <Ionicons name={icon} size={20} color={colors.textMuted} />
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
        />
      </InputBox>
    </Field>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const ScrollArea = styled.ScrollView`
  flex: 1;
`;

const Content = styled.View`
  padding: ${spacing.xxl}px;
  padding-bottom: 48px;
`;

const BackButton = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing.xxxl}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.pill}px;
  background-color: ${colors.surface};
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 29px;
  font-weight: 800;
  letter-spacing: -0.6px;
`;

const Subtitle = styled.Text`
  margin-top: ${spacing.sm}px;
  margin-bottom: ${spacing.xxxl}px;
  color: ${colors.textMuted};
  font-size: 13px;
  line-height: 19px;
`;

const Field = styled.View``;

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

const CreateButton = styled.TouchableOpacity<{ $disabled: boolean }>`
  height: 52px;
  align-items: center;
  justify-content: center;
  margin-top: ${spacing.md}px;
  border-radius: ${radius.md}px;
  background-color: ${colors.primary};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const CreateButtonText = styled.Text`
  color: ${colors.white};
  font-size: 14px;
  font-weight: 800;
`;

const FooterText = styled.Text`
  margin-top: ${spacing.xxl}px;
  color: ${colors.textMuted};
  font-size: 12px;
  text-align: center;
`;

const SignInLink = styled(Link)`
  color: ${colors.primary};
  font-weight: 800;
`;
