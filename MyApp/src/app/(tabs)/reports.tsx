import { StyleSheet, Text, View } from "react-native";

import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { ProgressBar } from "../../components/ProgressBar";
import { budgets, monthlyExpenses } from "../../data/mockFinance";
import { colors, radius, spacing } from "../../theme/tokens";
import { formatCompactCurrency, formatCurrency } from "../../utils/currency";

const monthLabels = ["T4", "T5", "T6", "T7", "T8", "T9"];

export default function ReportsScreen() {
  const maxExpense = Math.max(...monthlyExpenses);

  return (
    <AppScreen>
      <AppHeader title="Báo cáo" subtitle="Phân tích tài chính của bạn" actionIcon="calendar-outline" />
      <View style={styles.period}><Text style={styles.periodMuted}>Tháng trước</Text><View style={styles.periodActive}><Text style={styles.periodActiveText}>Tháng này</Text></View><Text style={styles.periodMuted}>6 tháng</Text></View>
      <View style={styles.summaryRow}>
        <View style={styles.metricCard}><Text style={styles.metricLabel}>THU NHẬP</Text><Text style={[styles.metricValue, styles.income]}>{formatCompactCurrency(24000000)}</Text><Text style={styles.positive}>↑ 8,4% kỳ trước</Text></View>
        <View style={styles.metricCard}><Text style={styles.metricLabel}>CHI TIÊU</Text><Text style={styles.metricValue}>{formatCompactCurrency(5550000)}</Text><Text style={styles.negative}>↑ 12,1% kỳ trước</Text></View>
      </View>
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}><View><Text style={styles.cardTitle}>Xu hướng chi tiêu</Text><Text style={styles.chartCaption}>6 tháng gần nhất · triệu đồng</Text></View><Text style={styles.average}>TB 3,9tr</Text></View>
        <View style={styles.chart}>
          {monthlyExpenses.map((expense, index) => <View key={monthLabels[index]} style={styles.barColumn}><Text style={styles.barValue}>{expense}</Text><View style={styles.barTrack}><View style={[styles.bar, { height: `${(expense / maxExpense) * 100}%` }, index === monthlyExpenses.length - 1 && styles.barCurrent]} /></View><Text style={[styles.month, index === monthlyExpenses.length - 1 && styles.monthCurrent]}>{monthLabels[index]}</Text></View>)}
        </View>
      </View>
      <Text style={styles.sectionTitle}>Chi tiêu theo danh mục</Text>
      <View style={styles.categoryCard}>
        {budgets.map((budget, index) => <View key={budget.id} style={[styles.category, index < budgets.length - 1 && styles.categoryDivider]}><View style={styles.categoryHeading}><View style={[styles.dot, { backgroundColor: budget.color }]} /><Text style={styles.categoryName}>{budget.name}</Text><Text style={styles.categoryAmount}>{formatCurrency(budget.spent)}</Text></View><ProgressBar value={budget.spent / 5550000} color={budget.color} height={6} /></View>)}
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  period: { flexDirection: "row", padding: spacing.xs, backgroundColor: colors.surfaceMuted, borderRadius: radius.md, marginBottom: spacing.lg },
  periodMuted: { flex: 1, textAlign: "center", color: colors.textMuted, fontSize: 11, fontWeight: "600", paddingVertical: spacing.sm },
  periodActive: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.sm, justifyContent: "center" },
  periodActiveText: { color: colors.text, textAlign: "center", fontSize: 11, fontWeight: "800" },
  summaryRow: { flexDirection: "row", gap: spacing.md },
  metricCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  metricLabel: { color: colors.textMuted, fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },
  metricValue: { color: colors.text, fontSize: 20, fontWeight: "800", marginTop: spacing.sm },
  income: { color: colors.income },
  positive: { color: colors.income, fontSize: 10, fontWeight: "600", marginTop: spacing.sm },
  negative: { color: colors.expense, fontSize: 10, fontWeight: "600", marginTop: spacing.sm },
  chartCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginTop: spacing.md },
  chartHeader: { flexDirection: "row", justifyContent: "space-between" },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  chartCaption: { color: colors.textMuted, fontSize: 10, marginTop: spacing.xs },
  average: { color: colors.primary, fontSize: 11, fontWeight: "700" },
  chart: { height: 190, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: spacing.xl },
  barColumn: { flex: 1, height: "100%", alignItems: "center" },
  barValue: { color: colors.textMuted, fontSize: 9, marginBottom: spacing.xs },
  barTrack: { flex: 1, width: 20, justifyContent: "flex-end", backgroundColor: colors.surfaceMuted, borderRadius: radius.sm, overflow: "hidden" },
  bar: { width: "100%", backgroundColor: "#9DB7A8", borderRadius: radius.sm },
  barCurrent: { backgroundColor: colors.primary },
  month: { color: colors.textMuted, fontSize: 10, marginTop: spacing.sm },
  monthCurrent: { color: colors.primary, fontWeight: "800" },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "700", marginTop: spacing.xxl, marginBottom: spacing.md },
  categoryCard: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border },
  category: { paddingVertical: spacing.md },
  categoryDivider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  categoryHeading: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm },
  dot: { width: 9, height: 9, borderRadius: radius.pill, marginRight: spacing.sm },
  categoryName: { flex: 1, color: colors.text, fontSize: 13, fontWeight: "600" },
  categoryAmount: { color: colors.text, fontSize: 12, fontWeight: "700" },
});
