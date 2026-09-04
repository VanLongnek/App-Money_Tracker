import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../theme/tokens";
import type { IconName, TransactionType } from "../../types/finance";

const categories: { label: string; icon: IconName }[] = [
  { label: "Ăn uống", icon: "restaurant-outline" },
  { label: "Di chuyển", icon: "car-outline" },
  { label: "Mua sắm", icon: "bag-handle-outline" },
  { label: "Hóa đơn", icon: "flash-outline" },
  { label: "Giải trí", icon: "game-controller-outline" },
  { label: "Khác", icon: "ellipsis-horizontal" },
];

export default function NewTransactionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: TransactionType }>();
  const [type, setType] = useState<TransactionType>(params.type === "income" ? "income" : "expense");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("Ăn uống");

  function handleSave() {
    if (!amount.trim()) {
      Alert.alert("Thiếu số tiền", "Vui lòng nhập số tiền cho giao dịch.");
      return;
    }
    Alert.alert("Đã hoàn thiện giao diện", "Giao dịch sẽ được lưu vào Firebase ở bước kết nối dữ liệu.", [{ text: "Đồng ý", onPress: () => router.back() }]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.header}><Pressable onPress={() => router.back()} style={styles.iconButton}><Ionicons name="close" size={24} color={colors.text} /></Pressable><Text style={styles.headerTitle}>Thêm giao dịch</Text><View style={styles.iconPlaceholder} /></View>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.segment}><TypeButton label="Khoản chi" selected={type === "expense"} onPress={() => setType("expense")} /><TypeButton label="Khoản thu" selected={type === "income"} onPress={() => setType("income")} /></View>
          <Text style={styles.amountLabel}>Số tiền</Text>
          <View style={styles.amountRow}><Text style={styles.currency}>₫</Text><TextInput value={amount} onChangeText={setAmount} keyboardType="number-pad" placeholder="0" placeholderTextColor="#A9AFAB" style={styles.amountInput} autoFocus /></View>
          <Text style={styles.fieldLabel}>Danh mục</Text>
          <View style={styles.categories}>{categories.map((item) => { const selected = item.label === category; return <Pressable key={item.label} onPress={() => setCategory(item.label)} style={[styles.category, selected && styles.categorySelected]}><View style={[styles.categoryIcon, selected && styles.categoryIconSelected]}><Ionicons name={item.icon} size={20} color={selected ? colors.white : colors.primary} /></View><Text style={[styles.categoryLabel, selected && styles.categoryLabelSelected]}>{item.label}</Text></Pressable>; })}</View>
          <Text style={styles.fieldLabel}>Thông tin</Text>
          <View style={styles.field}><Ionicons name="create-outline" size={20} color={colors.textMuted} /><TextInput value={note} onChangeText={setNote} placeholder="Ghi chú giao dịch" placeholderTextColor={colors.textMuted} style={styles.fieldInput} /></View>
          <View style={styles.field}><Ionicons name="calendar-outline" size={20} color={colors.textMuted} /><Text style={styles.fieldValue}>Hôm nay, 04/09/2026</Text><Ionicons name="chevron-forward" size={18} color={colors.textMuted} /></View>
          <View style={styles.field}><Ionicons name="wallet-outline" size={20} color={colors.textMuted} /><Text style={styles.fieldValue}>Ví chính</Text><Ionicons name="chevron-forward" size={18} color={colors.textMuted} /></View>
        </ScrollView>
        <View style={styles.footer}><Pressable onPress={handleSave} style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}><Text style={styles.saveText}>Lưu giao dịch</Text></Pressable></View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function TypeButton({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.typeButton, selected && styles.typeSelected]}><Text style={[styles.typeText, selected && styles.typeTextSelected]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background }, flex: { flex: 1 },
  header: { height: 58, paddingHorizontal: spacing.xl, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  iconButton: { width: 40, height: 40, borderRadius: radius.pill, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  iconPlaceholder: { width: 40 }, headerTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  segment: { flexDirection: "row", backgroundColor: colors.surfaceMuted, padding: spacing.xs, borderRadius: radius.md },
  typeButton: { flex: 1, paddingVertical: 11, alignItems: "center", borderRadius: radius.sm }, typeSelected: { backgroundColor: colors.surface },
  typeText: { color: colors.textMuted, fontSize: 13, fontWeight: "700" }, typeTextSelected: { color: colors.primary },
  amountLabel: { textAlign: "center", color: colors.textMuted, fontSize: 12, marginTop: spacing.xxl },
  amountRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: spacing.xl },
  currency: { color: colors.textMuted, fontSize: 28, fontWeight: "700", marginRight: spacing.sm },
  amountInput: { minWidth: 100, color: colors.text, fontSize: 42, fontWeight: "800", textAlign: "center", padding: 0 },
  fieldLabel: { color: colors.text, fontSize: 15, fontWeight: "700", marginTop: spacing.xxl, marginBottom: spacing.md },
  categories: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: spacing.lg },
  category: { width: "31%", alignItems: "center", paddingVertical: spacing.sm, borderRadius: radius.md }, categorySelected: { backgroundColor: colors.primarySoft },
  categoryIcon: { width: 42, height: 42, borderRadius: radius.md, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  categoryIconSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryLabel: { color: colors.textMuted, fontSize: 10, fontWeight: "600", marginTop: spacing.sm }, categoryLabelSelected: { color: colors.primary, fontWeight: "800" },
  field: { minHeight: 52, flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, marginBottom: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  fieldInput: { flex: 1, color: colors.text, fontSize: 13 }, fieldValue: { flex: 1, color: colors.text, fontSize: 13 },
  footer: { padding: spacing.xl, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.background },
  saveButton: { height: 52, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }, saveText: { color: colors.white, fontSize: 15, fontWeight: "800" }, pressed: { opacity: 0.75 },
});
