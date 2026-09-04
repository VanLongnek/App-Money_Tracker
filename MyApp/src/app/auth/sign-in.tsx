import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../theme/tokens";

export default function SignInScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.brand}><View style={styles.logo}><Ionicons name="wallet" size={29} color={colors.white} /></View><Text style={styles.brandName}>Ví Nhà</Text></View>
        <View style={styles.copy}><Text style={styles.title}>Chào mừng trở lại</Text><Text style={styles.subtitle}>Đăng nhập để tiếp tục quản lý tài chính của bạn.</Text></View>
        <Text style={styles.label}>Email</Text><View style={styles.input}><Ionicons name="mail-outline" size={20} color={colors.textMuted} /><TextInput placeholder="ban@example.com" placeholderTextColor={colors.textMuted} keyboardType="email-address" autoCapitalize="none" style={styles.inputControl} /></View>
        <Text style={styles.label}>Mật khẩu</Text><View style={styles.input}><Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} /><TextInput placeholder="Nhập mật khẩu" placeholderTextColor={colors.textMuted} secureTextEntry={!passwordVisible} style={styles.inputControl} /><Pressable onPress={() => setPasswordVisible((value) => !value)}><Ionicons name={passwordVisible ? "eye-off-outline" : "eye-outline"} size={20} color={colors.textMuted} /></Pressable></View>
        <Pressable><Text style={styles.forgot}>Quên mật khẩu?</Text></Pressable>
        <Pressable onPress={() => router.replace("/(tabs)/dashboard")} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}><Text style={styles.primaryText}>Đăng nhập</Text></Pressable>
        <View style={styles.divider}><View style={styles.line} /><Text style={styles.or}>hoặc</Text><View style={styles.line} /></View>
        <Pressable style={styles.googleButton}><Ionicons name="logo-google" size={19} color={colors.text} /><Text style={styles.googleText}>Tiếp tục với Google</Text></Pressable>
        <Text style={styles.footerText}>Chưa có tài khoản? <Link href="/auth/sign-up" style={styles.link}>Đăng ký ngay</Link></Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background }, container: { flex: 1, justifyContent: "center", paddingHorizontal: spacing.xxl },
  brand: { flexDirection: "row", alignItems: "center", gap: spacing.md }, logo: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }, brandName: { color: colors.primaryDark, fontSize: 22, fontWeight: "800" },
  copy: { marginTop: spacing.xxxl, marginBottom: spacing.xxl }, title: { color: colors.text, fontSize: 28, fontWeight: "800", letterSpacing: -0.6 }, subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: spacing.sm },
  label: { color: colors.text, fontSize: 12, fontWeight: "700", marginBottom: spacing.sm },
  input: { height: 52, flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg }, inputControl: { flex: 1, color: colors.text, fontSize: 14 },
  forgot: { color: colors.primary, fontSize: 12, fontWeight: "700", textAlign: "right", marginTop: -spacing.sm },
  primaryButton: { height: 52, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginTop: spacing.xxl }, primaryText: { color: colors.white, fontSize: 14, fontWeight: "800" },
  divider: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginVertical: spacing.xl }, line: { flex: 1, height: 1, backgroundColor: colors.border }, or: { color: colors.textMuted, fontSize: 11 },
  googleButton: { height: 52, flexDirection: "row", gap: spacing.md, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" }, googleText: { color: colors.text, fontSize: 13, fontWeight: "700" },
  footerText: { color: colors.textMuted, fontSize: 12, textAlign: "center", marginTop: spacing.xxl }, link: { color: colors.primary, fontWeight: "800" }, pressed: { opacity: 0.75 },
});
