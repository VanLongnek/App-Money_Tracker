import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { ProgressBar } from "../../components/ProgressBar";
import { SectionHeader } from "../../components/SectionHeader";
import { TransactionRow } from "../../components/TransactionRow";
import { transactions } from "../../data/mockFinance";
import { colors, radius, spacing } from "../../theme/tokens";
import { formatCurrency } from "../../utils/currency";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <AppScreen>
      <AppHeader title="Chào buổi sáng, An" subtitle="Thứ Sáu, 04 tháng 09" actionIcon="notifications-outline" />

      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.balanceLabel}>Số dư hiện tại</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(18450000)}</Text>
          </View>
          <View style={styles.monthPill}><Text style={styles.monthText}>Tháng 9</Text><Ionicons name="chevron-down" size={14} color={colors.white} /></View>
        </View>
        <View style={styles.divider} />
        <View style={styles.cashFlow}>
          <CashFlowItem icon="arrow-down" label="Thu nhập" amount={24000000} />
          <View style={styles.cashFlowDivider} />
          <CashFlowItem icon="arrow-up" label="Chi tiêu" amount={5550000} />
        </View>
      </View>

      <View style={styles.actions}>
        <QuickAction icon="remove" label="Thêm chi" onPress={() => router.push("/transaction/new?type=expense")} />
        <QuickAction icon="add" label="Thêm thu" onPress={() => router.push("/transaction/new?type=income")} />
        <QuickAction icon="scan-outline" label="Quét hóa đơn" />
        <QuickAction icon="ellipsis-horizontal" label="Thêm" />
      </View>

      <SectionHeader title="Ngân sách tháng" actionLabel="Xem chi tiết" onAction={() => router.push("/(tabs)/budgets")} />
      <View style={styles.budgetCard}>
        <View style={styles.budgetTop}>
          <View><Text style={styles.budgetValue}>{formatCurrency(5550000)}</Text><Text style={styles.muted}>đã dùng trong {formatCurrency(8000000)}</Text></View>
          <Text style={styles.budgetPercent}>69%</Text>
        </View>
        <ProgressBar value={0.69} />
        <Text style={styles.budgetNote}>Bạn còn {formatCurrency(2450000)} cho 26 ngày tới</Text>
      </View>

      <SectionHeader title="Giao dịch gần đây" actionLabel="Xem tất cả" onAction={() => router.push("/(tabs)/transactions")} />
      <View style={styles.listCard}>
        {transactions.slice(0, 4).map((transaction, index) => (
          <View key={transaction.id}>
            <TransactionRow transaction={transaction} />
            {index < 3 ? <View style={styles.rowDivider} /> : null}
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

function CashFlowItem({ icon, label, amount }: { icon: "arrow-down" | "arrow-up"; label: string; amount: number }) {
  return <View style={styles.cashFlowItem}><View style={styles.cashFlowIcon}><Ionicons name={icon} size={14} color={colors.white} /></View><View><Text style={styles.cashFlowLabel}>{label}</Text><Text style={styles.cashFlowAmount}>{formatCurrency(amount)}</Text></View></View>;
}

function QuickAction({ icon, label, onPress }: { icon: React.ComponentProps<typeof Ionicons>["name"]; label: string; onPress?: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}><View style={styles.quickIcon}><Ionicons name={icon} size={21} color={colors.primary} /></View><Text style={styles.quickLabel}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  balanceCard: { backgroundColor: colors.primaryDark, borderRadius: radius.lg, padding: spacing.xl },
  balanceHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" },
  balanceLabel: { color: "#BED4C7", fontSize: 13 },
  balanceAmount: { color: colors.white, fontSize: 29, fontWeight: "800", marginTop: spacing.xs, letterSpacing: -0.7 },
  monthPill: { flexDirection: "row", alignItems: "center", gap: spacing.xs, backgroundColor: "rgba(255,255,255,0.12)", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radius.pill },
  monthText: { color: colors.white, fontSize: 12, fontWeight: "700" },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.13)", marginVertical: spacing.lg },
  cashFlow: { flexDirection: "row", alignItems: "center" },
  cashFlowItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.sm },
  cashFlowIcon: { width: 28, height: 28, borderRadius: radius.pill, backgroundColor: "rgba(255,255,255,0.14)", alignItems: "center", justifyContent: "center" },
  cashFlowLabel: { color: "#BED4C7", fontSize: 11 },
  cashFlowAmount: { color: colors.white, fontSize: 13, fontWeight: "700", marginTop: 2 },
  cashFlowDivider: { width: 1, height: 34, backgroundColor: "rgba(255,255,255,0.13)", marginHorizontal: spacing.md },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.xl },
  quickAction: { width: "23%", alignItems: "center" },
  quickIcon: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  quickLabel: { color: colors.textMuted, fontSize: 10, fontWeight: "600", marginTop: spacing.sm, textAlign: "center" },
  pressed: { opacity: 0.65 },
  budgetCard: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  budgetTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
  budgetValue: { color: colors.text, fontSize: 17, fontWeight: "800" },
  muted: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  budgetPercent: { color: colors.primary, fontSize: 18, fontWeight: "800" },
  budgetNote: { color: colors.textMuted, fontSize: 11, marginTop: spacing.md },
  listCard: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border },
  rowDivider: { height: 1, backgroundColor: colors.border, marginLeft: 56 },
});
