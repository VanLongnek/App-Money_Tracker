import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../theme/tokens";

type AppScreenProps = PropsWithChildren<{ scroll?: boolean; contentStyle?: ViewStyle }>;

export function AppScreen({ children, scroll = true, contentStyle }: AppScreenProps) {
  if (!scroll) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={[styles.content, styles.flex, contentStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView contentContainerStyle={[styles.content, contentStyle]} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxxl },
  flex: { flex: 1 },
});
