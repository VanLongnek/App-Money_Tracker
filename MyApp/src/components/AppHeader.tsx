import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "../theme/tokens";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actionIcon?: ComponentProps<typeof Ionicons>["name"];
  onAction?: () => void;
};

export function AppHeader({ title, subtitle, actionIcon, onAction }: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
      {actionIcon ? (
        <Pressable accessibilityRole="button" onPress={onAction} style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
          <Ionicons name={actionIcon} size={21} color={colors.text} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { minHeight: 72, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: spacing.sm, paddingBottom: spacing.md },
  copy: { flex: 1 },
  subtitle: { color: colors.textMuted, fontSize: 13, marginBottom: 2 },
  title: { color: colors.text, fontSize: 26, lineHeight: 32, fontWeight: "800", letterSpacing: -0.5 },
  action: { width: 42, height: 42, borderRadius: radius.pill, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  pressed: { opacity: 0.65 },
});
