import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { TransactionRow } from "../../components/TransactionRow";
import { transactions } from "../../data/mockFinance";
import { colors, radius, spacing } from "../../theme/tokens";
import type { TransactionType } from "../../types/finance";

type Filter = "all" | TransactionType;

export default function TransactionsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => transactions.filter((item) => (filter === "all" || item.type === filter) && item.title.toLowerCase().includes(query.toLowerCase())), [filter, query]);

  return (
    <AppScreen>
      <AppHeader title="Giao dịch" subtitle="Theo dõi mọi khoản thu và chi" actionIcon="calendar-outline" />
      <View style={styles.searchBox}><Ionicons name="search-outline" size={19} color={colors.textMuted} /><TextInput value={query} onChangeText={setQuery} placeholder="Tìm giao dịch" placeholderTextColor={colors.textMuted} style={styles.searchInput} /><Ionicons name="options-outline" size={19} color={colors.text} /></View>
      <View style={styles.filters}>
        <FilterChip label="Tất cả" selected={filter === "all"} onPress={() => setFilter("all")} />
        <FilterChip label="Khoản chi" selected={filter === "expense"} onPress={() => setFilter("expense")} />
        <FilterChip label="Khoản thu" selected={filter === "income"} onPress={() => setFilter("income")} />
      </View>
      <Text style={styles.sectionLabel}>THÁNG 9 · 2026</Text>
      <View style={styles.listCard}>
        {filtered.map((transaction, index) => <View key={transaction.id}><TransactionRow transaction={transaction} />{index < filtered.length - 1 ? <View style={styles.divider} /> : null}</View>)}
        {filtered.length === 0 ? <View style={styles.empty}><Ionicons name="receipt-outline" size={34} color={colors.textMuted} /><Text style={styles.emptyTitle}>Không tìm thấy giao dịch</Text><Text style={styles.emptyCopy}>Thử từ khóa hoặc bộ lọc khác.</Text></View> : null}
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
  chip: { paddingHorizontal: spacing.lg, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textMuted, fontSize: 12, fontWeight: "700" },
  chipTextSelected: { color: colors.white },
  sectionLabel: { color: colors.textMuted, fontSize: 11, fontWeight: "800", letterSpacing: 0.7, marginTop: spacing.xxl, marginBottom: spacing.md },
  listCard: { backgroundColor: colors.surface, borderRadius: radius.lg, paddingHorizontal: spacing.lg, borderWidth: 1, borderColor: colors.border },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 56 },
  empty: { paddingVertical: 52, alignItems: "center" },
  emptyTitle: { color: colors.text, fontSize: 15, fontWeight: "700", marginTop: spacing.md },
  emptyCopy: { color: colors.textMuted, fontSize: 12, marginTop: spacing.xs },
  fab: { position: "absolute", right: spacing.xl, bottom: spacing.xxxl, width: 56, height: 56, borderRadius: radius.pill, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", elevation: 5 },
  pressed: { opacity: 0.75 },
});
