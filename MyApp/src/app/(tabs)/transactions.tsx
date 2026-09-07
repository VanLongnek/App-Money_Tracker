import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { TransactionRow } from "../../components/TransactionRow";
import { useFinance } from "../../context/FinanceContext";
import { colors, radius, spacing } from "../../theme/tokens";
import type { TransactionType } from "../../types/finance";
import { filterTransactionsByRange, formatDateRange, fromDateKey } from "../../utils/report";

type Filter = "all" | TransactionType;

export default function TransactionsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    categoryId?: string;
    categoryName?: string;
    startDate?: string;
    endDate?: string;
  }>();
  const { transactions, isLoading, error } = useFinance();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const hasReportFilter = Boolean(params.categoryId && params.startDate && params.endDate);
  const filtered = useMemo(() => {
    const dateFilteredTransactions = params.startDate && params.endDate
      ? filterTransactionsByRange(transactions, {
        start: fromDateKey(params.startDate),
        end: fromDateKey(params.endDate),
      })
      : transactions;

    return dateFilteredTransactions.filter((item) => (
      (filter === "all" || item.type === filter)
      && (!params.categoryId || item.categoryId === params.categoryId)
      && item.title.toLowerCase().includes(query.toLowerCase())
    ));
  }, [filter, params.categoryId, params.endDate, params.startDate, query, transactions]);
  const currentPeriod = new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    year: "numeric",
  }).format(new Date()).toUpperCase();

  return (
    <AppScreen>
      <AppHeader title="Giao dịch" subtitle="Theo dõi mọi khoản thu và chi" actionIcon="calendar-outline" />
      <View style={styles.searchBox}><Ionicons name="search-outline" size={19} color={colors.textMuted} /><TextInput value={query} onChangeText={setQuery} placeholder="Tìm giao dịch" placeholderTextColor={colors.textMuted} style={styles.searchInput} /><Ionicons name="options-outline" size={19} color={colors.text} /></View>
      <View style={styles.filters}>
        <FilterChip label="Tất cả" selected={filter === "all"} onPress={() => setFilter("all")} />
        <FilterChip label="Khoản chi" selected={filter === "expense"} onPress={() => setFilter("expense")} />
        <FilterChip label="Khoản thu" selected={filter === "income"} onPress={() => setFilter("income")} />
      </View>
      {hasReportFilter ? (
        <View style={styles.reportFilter}>
          <Ionicons name="funnel-outline" size={16} color={colors.primary} />
          <View style={styles.reportFilterCopy}>
            <Text style={styles.reportFilterTitle}>Danh mục: {params.categoryName}</Text>
            <Text style={styles.reportFilterDate}>{formatDateRange({ start: fromDateKey(params.startDate!), end: fromDateKey(params.endDate!) })}</Text>
          </View>
          <Pressable onPress={() => router.replace("/(tabs)/transactions")} hitSlop={10}>
            <Ionicons name="close-circle" size={20} color={colors.textMuted} />
          </Pressable>
        </View>
      ) : null}
      <Text style={styles.sectionLabel}>{currentPeriod}</Text>
      <View style={styles.listCard}>
        {isLoading ? <Text style={styles.status}>Đang tải giao dịch...</Text> : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {filtered.map((transaction, index) => <View key={transaction.id}><TransactionRow transaction={transaction} />{index < filtered.length - 1 ? <View style={styles.divider} /> : null}</View>)}
        {!isLoading && !error && filtered.length === 0 ? <View style={styles.empty}><Ionicons name="receipt-outline" size={34} color={colors.textMuted} /><Text style={styles.emptyTitle}>Không tìm thấy giao dịch</Text><Text style={styles.emptyCopy}>Thử từ khóa hoặc bộ lọc khác.</Text></View> : null}
      </View>
      <Pressable onPress={() => router.push("/transaction/new")} style={({ pressed }) => [styles.fab, pressed && styles.pressed]}><Ionicons name="add" size={28} color={colors.white} /></Pressable>
    </AppScreen>
  );
}

function FilterChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}><Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  searchBox: { height: 48, flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, paddingHorizontal: spacing.md },
  searchInput: { flex: 1, color: colors.text, fontSize: 14 },
  filters: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.md },
  reportFilter: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md, padding: spacing.md, borderRadius: radius.md, backgroundColor: colors.primarySoft },
  reportFilterCopy: { flex: 1 },
  reportFilterTitle: { color: colors.primaryDark, fontSize: 12, fontWeight: "700" },
  reportFilterDate: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  chip: { paddingHorizontal: spacing.lg, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textMuted, fontSize: 12, fontWeight: "700" },
  chipTextSelected: { color: colors.white },
  sectionLabel: { color: colors.textMuted, fontSize: 11, fontWeight: "800", letterSpacing: 0.7, marginTop: spacing.xxl, marginBottom: spacing.md },
  listCard: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 56 },
  status: { paddingVertical: spacing.xxl, color: colors.textMuted, fontSize: 12, textAlign: "center" },
  error: { paddingVertical: spacing.xxl, color: colors.expense, fontSize: 12, textAlign: "center" },
  empty: { paddingVertical: 52, alignItems: "center" },
  emptyTitle: { color: colors.text, fontSize: 15, fontWeight: "700", marginTop: spacing.md },
  emptyCopy: { color: colors.textMuted, fontSize: 12, marginTop: spacing.xs },
  fab: { position: "absolute", right: spacing.xl, bottom: spacing.xxxl, width: 56, height: 56, borderRadius: radius.pill, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", elevation: 5 },
  pressed: { opacity: 0.75 },
});
