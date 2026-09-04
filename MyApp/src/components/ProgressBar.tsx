import { StyleSheet, View } from "react-native";

import { colors, radius } from "../theme/tokens";

export function ProgressBar({ value, color = colors.primary, height = 8 }: { value: number; color?: string; height?: number }) {
  const percentage = Math.min(Math.max(value, 0), 1) * 100;
  return <View style={[styles.track, { height }]}><View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} /></View>;
}

const styles = StyleSheet.create({
  track: { width: "100%", overflow: "hidden", borderRadius: radius.pill, backgroundColor: colors.surfaceMuted },
  fill: { height: "100%", borderRadius: radius.pill },
});
