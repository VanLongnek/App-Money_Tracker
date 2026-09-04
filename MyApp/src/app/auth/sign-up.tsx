import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../theme/tokens";

export default function SignUpScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()} style={styles.back}><Ionicons name="arrow-back" size={22} color={colors.text} /></Pressable>
        <Text style={styles.title}>Tạo tài khoản</Text><Text style={styles.subtitle}>Bắt đầu xây dựng thói quen tài chính tốt hơn.</Text>
        <FormField icon="person-outline" label="Họ và tên" placeholder="Nguyễn Văn An" />
        <FormField icon="mail-outline" label="Email" placeholder="ban@example.com" />
        <FormField icon="lock-closed-outline" label="Mật khẩu" placeholder="Tối thiểu 8 ký tự" secure />
        <FormField icon="shield-checkmark-outline" label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu" secure />
        <Pressable onPress={() => router.replace("/(tabs)/dashboard")} style={({ pressed }) => [styles.button, pressed && styles.pressed]}><Text style={styles.buttonText}>Tạo tài khoản</Text></Pressable>
        <Text style={styles.footer}>Đã có tài khoản? <Link href="/auth/sign-in" style={styles.link}>Đăng nhập</Link></Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function FormField({ icon, label, placeholder, secure }: { icon: React.ComponentProps<typeof Ionicons>["name"]; label: string; placeholder: string; secure?: boolean }) {
  return <View><Text style={styles.label}>{label}</Text><View style={styles.input}><Ionicons name={icon} size={20} color={colors.textMuted} /><TextInput placeholder={placeholder} placeholderTextColor={colors.textMuted} secureTextEntry={secure} style={styles.inputControl} /></View></View>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background }, content: { padding: spacing.xxl, paddingBottom: 48 },
  back: { width: 42, height: 42, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", marginBottom: spacing.xxxl },
  title: { color: colors.text, fontSize: 29, fontWeight: "800", letterSpacing: -0.6 }, subtitle: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: spacing.sm, marginBottom: spacing.xxxl },
  label: { color: colors.text, fontSize: 12, fontWeight: "700", marginBottom: spacing.sm }, input: { height: 52, flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg }, inputControl: { flex: 1, color: colors.text, fontSize: 14 },
  button: { height: 52, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginTop: spacing.md }, buttonText: { color: colors.white, fontSize: 14, fontWeight: "800" },
  footer: { color: colors.textMuted, fontSize: 12, textAlign: "center", marginTop: spacing.xxl }, link: { color: colors.primary, fontWeight: "800" }, pressed: { opacity: 0.75 },
});
