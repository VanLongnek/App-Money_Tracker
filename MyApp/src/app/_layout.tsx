import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "../theme/tokens";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="transaction/new"
          options={{ animation: "slide_from_bottom", presentation: "modal" }}
        />
        <Stack.Screen name="auth/sign-in" options={{ animation: "fade" }} />
        <Stack.Screen name="auth/sign-up" options={{ animation: "slide_from_right" }} />
      </Stack>
    </>
  );
}
