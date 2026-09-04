import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { colors } from "../../theme/tokens";

const icons = {
  dashboard: ["home", "home-outline"],
  transactions: ["swap-horizontal", "swap-horizontal-outline"],
  budgets: ["pie-chart", "pie-chart-outline"],
  reports: ["bar-chart", "bar-chart-outline"],
  settings: ["settings", "settings-outline"],
} as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700", marginTop: 2 },
        tabBarStyle: { height: 68, paddingTop: 8, paddingBottom: 8, backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ color, focused, size }) => {
          const names = icons[route.name as keyof typeof icons] ?? icons.dashboard;
          return <Ionicons name={names[focused ? 0 : 1]} color={color} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Tổng quan" }} />
      <Tabs.Screen name="transactions" options={{ title: "Giao dịch" }} />
      <Tabs.Screen name="budgets" options={{ title: "Ngân sách" }} />
      <Tabs.Screen name="reports" options={{ title: "Báo cáo" }} />
      <Tabs.Screen name="settings" options={{ title: "Cài đặt" }} />
    </Tabs>
  );
}
