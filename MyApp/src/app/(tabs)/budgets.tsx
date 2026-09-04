import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { ProgressBar } from "../../components/ProgressBar";
import { budgets } from "../../data/mockFinance";
import { colors, radius, spacing } from "../../theme/tokens";
import { formatCurrency } from "../../utils/currency";

export default function BudgetsScreen() {
  return (
    <AppScreen>
      <AppHeader title="Ngân sách" subtitle="Tháng 9 năm 2026" actionIcon="add" />
      <View style={styles.summaryCard}>
        <Text style={styles.eyebrow}>TỔNG NGÂN SÁCH</Text>
        <Text style={styles.summaryValue}>{formatCurrency(8000000)}</Text>
        <View style={styles.summaryMeta}><Text style={styles.summarySpent}>Đã chi {formatCurrency(5550000)}</Text><Text style={styles.summaryRemaining}>Còn {formatCurrency(2450000)}</Text></View>
        <ProgressBar value={0.69} color={colors.white} height={9} />
      </View>
      <View style={styles.notice}><Ionicons name="sparkles-outline" size={19} color={colors.warning} /><Text style={styles.noticeText}>Chi tiêu tháng này đang cao hơn 12% so với tháng trước.</Text></View>
      <Text style={styles.sectionTitle}>Theo danh mục</Text>
      <View style={styles.budgetList}>
        {budgets.map((budget, index) => {
          const progress = budget.spent / budget.limit;
          const isNearLimit = progress >= 0.9;
          return <View key={budget.id} style={[styles.budgetItem, index < budgets.length - 1 && styles.itemDivider]}>
            <View style={styles.itemTop}><View style={[styles.icon, { backgroundColor: `${budget.color}18` }]}><Ionicons name={budget.icon} color={budget.color} size={21} /></View><View style={styles.itemCopy}><View style={styles.nameRow}><Text style={styles.itemName}>{budget.name}</Text><Text style={[styles.percentage, isNearLimit && styles.danger]}>{Math.round(progress * 100)}%</Text></View><Text style={styles.itemMeta}>{formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}</Text></View></View>
            <ProgressBar value={progress} color={isNearLimit ? colors.expense : budget.color} />
          </View>;
        })}
      </View>
      <Pressable style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}><Ionicons name="add-circle-outline" size={20} color={colors.primary} /><Text style={styles.addText}>Tạo ngân sách mới</Text></Pressable>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  summaryCard: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.xl },
  eyebrow: { color: "#CCE1D5", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  summaryValue: { color: colors.white, fontSize: 28, fontWeight: "800", marginTop: spacing.sm },
  summaryMeta: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.xl, marginBottom: spacing.md },
  summarySpent: { color: colors.white, fontSize: 11, fontWeight: "600" },
  summaryRemaining: { color: "#CCE1D5", fontSize: 11 },
  notice: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.lg, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.warningSoft },
  noticeText: { flex: 1, color: colors.warning, fontSize: 12, lineHeight: 17, fontWeight: "600" },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "700", marginTop: spacing.xxl, marginBottom: spacing.md },
  budgetList: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border },
  budgetItem: { paddingVertical: spacing.lg },
  itemDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  itemTop: { flexDirection: "row", alignItems: "center", marginBottom: spacing.md },
  icon: { width: 42, height: 42, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  itemCopy: { flex: 1, marginLeft: spacing.md },
  nameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  itemName: { color: colors.text, fontSize: 14, fontWeight: "700" },
  percentage: { color: colors.primary, fontSize: 12, fontWeight: "800" },
  danger: { color: colors.expense },
  itemMeta: { color: colors.textMuted, fontSize: 11, marginTop: spacing.xs },
  addButton: { height: 50, marginTop: spacing.lg, borderRadius: radius.md, borderWidth: 1, borderStyle: "dashed", borderColor: colors.primary, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm },
  addText: { color: colors.primary, fontSize: 13, fontWeight: "700" },
  pressed: { opacity: 0.65 },
});
