import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { ProgressBar } from "../../components/ProgressBar";
import { SectionHeader } from "../../components/SectionHeader";
import { TransactionRow } from "../../components/TransactionRow";
import { useAuth } from "../../context/AuthContext";
import { useFinance } from "../../context/FinanceContext";
import { colors, radius, spacing } from "../../theme/tokens";
import { formatCurrency } from "../../utils/currency";
import { formatCurrentDate, getRemainingDaysInMonth } from "../../utils/date";

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { transactions, budgets, isLoading, isLoadingBudgets, error, budgetError } = useFinance();
  const userName = getUserName(user?.displayName, user?.email);
  const currentDate = new Date();
  const currentMonthTransactions = transactions.filter(transaction =>
    transaction.transactionDate.getMonth() === currentDate.getMonth() &&
    transaction.transactionDate.getFullYear() === currentDate.getFullYear()
  );
  const balance = calculateTotal(transactions, "income") - calculateTotal(transactions, "expense");
  const monthlyIncome = calculateTotal(currentMonthTransactions, "income");
  const monthlyExpense = calculateTotal(currentMonthTransactions, "expense");
  const recentTransactions = transactions.slice(0, 4);
  const monthLabel = `Tháng ${currentDate.getMonth() + 1}`;
  const totalBudget = budgets.reduce((total, budget) => total + budget.limit, 0);
  const budgetSpent = budgets.reduce((total, budget) => total + budget.spent, 0);
  const budgetRemaining = Math.max(totalBudget - budgetSpent, 0);
  const budgetProgress = totalBudget > 0 ? budgetSpent / totalBudget : 0;
  const budgetPercentage = Math.round(budgetProgress * 100);

  return (
    <AppScreen>
      <AppHeader title={`${getGreeting()}, ${userName}`} subtitle={formatCurrentDate(currentDate)} actionIcon="notifications-outline" />
      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <View>
            <Text style={styles.balanceLabel}>Số dư hiện tại</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
          </View>
          <View style={styles.monthPill}>
            <Text style={styles.monthText}>{monthLabel}</Text>
            <Ionicons name="chevron-down" size={14} color={colors.white} />
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.cashFlow}>
          <CashFlowItem icon="arrow-down" label="Thu nhập" amount={monthlyIncome} />
          <View style={styles.cashFlowDivider} />
          <CashFlowItem icon="arrow-up" label="Chi tiêu" amount={monthlyExpense} />
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
        {isLoadingBudgets ? <Text style={styles.listStatus}>Đang tải ngân sách...</Text> : null}
        {budgetError ? <Text style={styles.listError}>{budgetError}</Text> : null}
        {!isLoadingBudgets && !budgetError && budgets.length === 0 ? (
          <Pressable onPress={() => router.push("/budget/new")}>
            <Text style={styles.emptyBudgetTitle}>Bạn chưa tạo ngân sách tháng này.</Text>
            <Text style={styles.emptyBudgetAction}>Nhấn để tạo ngân sách đầu tiên</Text>
          </Pressable>
        ) : null}
        {budgets.length > 0 ? (
          <>
            <View style={styles.budgetTop}>
              <View>
                <Text style={styles.budgetValue}>{formatCurrency(budgetSpent)}</Text>
                <Text style={styles.muted}>đã dùng trong {formatCurrency(totalBudget)}</Text>
              </View>
              <Text style={[styles.budgetPercent, budgetProgress >= 0.9 && styles.budgetDanger]}>{budgetPercentage}%</Text>
            </View>
            <ProgressBar value={budgetProgress} color={budgetProgress >= 0.9 ? colors.expense : colors.primary} />
            <Text style={styles.budgetNote}>Bạn còn {formatCurrency(budgetRemaining)} cho {getRemainingDaysInMonth(currentDate)} ngày tới</Text>
          </>
        ) : null}
      </View>
      <SectionHeader title="Giao dịch gần đây" actionLabel="Xem tất cả" onAction={() => router.push("/(tabs)/transactions")} />
      <View style={styles.listCard}>
        {isLoading ? <Text style={styles.listStatus}>Đang tải giao dịch...</Text> : null}
        {error ? <Text style={styles.listError}>{error}</Text> : null}
        {!isLoading && !error && recentTransactions.length === 0 ? (
          <Text style={styles.listStatus}>Bạn chưa có giao dịch nào.</Text>
        ) : null}
        {recentTransactions.map((transaction, index) => (
          <View key={transaction.id}>
            <TransactionRow transaction={transaction} />
            {index < recentTransactions.length - 1 ? <View style={styles.rowDivider} /> : null}
          </View>
        ))}
      </View>
    </AppScreen>
  );
}

function calculateTotal(transactions, type) {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Chào buổi sáng";
  if (hour < 18) return "Chào buổi chiều";
  return "Chào buổi tối";
}

function getUserName(displayName, email) {
  if (displayName?.trim()) {
    const nameParts = displayName.trim().split(/\s+/);
    return nameParts[nameParts.length - 1];
  }
  return email?.split("@")[0] || "bạn";
}

function CashFlowItem({ icon, label, amount }) {
  return (
    <View style={styles.cashFlowItem}>
      <View style={styles.cashFlowIcon}>
        <Ionicons name={icon} size={14} color={colors.white} />
      </View>
      <View>
        <Text style={styles.cashFlowLabel}>{label}</Text>
        <Text style={styles.cashFlowAmount}>{formatCurrency(amount)}</Text>
      </View>
    </View>
  );
}

function QuickAction({ icon, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}>
      <View style={styles.quickIcon}>
        <Ionicons name={icon} size={21} color={colors.primary} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
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
  budgetDanger: { color: colors.expense },
  budgetNote: { color: colors.textMuted, fontSize: 11, marginTop: spacing.md },
  emptyBudgetTitle: { color: colors.text, fontSize: 13, fontWeight: "700", textAlign: "center" },
  emptyBudgetAction: { color: colors.primary, fontSize: 12, fontWeight: "700", textAlign: "center", marginTop: spacing.sm },
  listCard: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border },
  listStatus: { paddingVertical: spacing.xxl, color: colors.textMuted, fontSize: 12, textAlign: "center" },
  listError: { paddingVertical: spacing.xxl, color: colors.expense, fontSize: 12, textAlign: "center" },
  rowDivider: { height: 1, backgroundColor: colors.border, marginLeft: 56 },
});