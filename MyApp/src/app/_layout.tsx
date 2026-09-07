import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import { AuthProvider, useAuth } from "../context/AuthContext";
import { FinanceProvider } from "../context/FinanceContext";
import { colors } from "../theme/tokens";

export default function RootLayout() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </FinanceProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoadingScreen>
        <ActivityIndicator size="large" color={colors.primary} />
      </LoadingScreen>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Protected guard={Boolean(user)}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="transaction/new"
          options={{ animation: "slide_from_bottom", presentation: "modal" }}
        />
        <Stack.Screen
          name="budget/new"
          options={{ animation: "slide_from_bottom", presentation: "modal" }}
        />
      </Stack.Protected>

      <Stack.Protected guard={!user}>
        <Stack.Screen name="auth/sign-in" options={{ animation: "fade" }} />
        <Stack.Screen name="auth/sign-up" options={{ animation: "slide_from_right" }} />
      </Stack.Protected>
    </Stack>
  );
}

const LoadingScreen = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background};
`;
