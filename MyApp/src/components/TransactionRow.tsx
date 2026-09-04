import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "../theme/tokens";
import type { Transaction } from "../types/finance";
import { formatCurrency } from "../utils/currency";

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.container}>
      <View style={[styles.icon, { backgroundColor: transaction.backgroundColor }]}>
        <Ionicons name={transaction.icon} size={21} color={transaction.color} />
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{transaction.title}</Text>
        <Text style={styles.meta} numberOfLines={1}>{transaction.category} · {transaction.dateLabel}</Text>
      </View>
      <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
        {isIncome ? "+" : "−"}{formatCurrency(transaction.amount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md },
  icon: { width: 44, height: 44, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  details: { flex: 1, marginHorizontal: spacing.md },
  title: { color: colors.text, fontSize: 15, fontWeight: "700" },
  meta: { color: colors.textMuted, fontSize: 11, marginTop: spacing.xs },
  amount: { fontSize: 13, fontWeight: "800" },
  income: { color: colors.income },
  expense: { color: colors.text },
});
