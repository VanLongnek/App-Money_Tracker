import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../theme/tokens";

type SectionHeaderProps = { title: string; actionLabel?: string; onAction?: () => void };

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? <Pressable onPress={onAction}><Text style={styles.action}>{actionLabel}</Text></Pressable> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.xxl, marginBottom: spacing.md },
  title: { color: colors.text, fontSize: 18, fontWeight: "700" },
  action: { color: colors.primary, fontSize: 13, fontWeight: "700" },
});
