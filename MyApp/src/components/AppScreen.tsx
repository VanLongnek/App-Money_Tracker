import type { ReactNode } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../theme/tokens";

type AppScreenProps = {
  children: ReactNode;
};

export function AppScreen({ children }: AppScreenProps) {
  return (
    <Screen edges={["top"]}>
      <ScrollArea showsVerticalScrollIndicator={false}>
        <Content>{children}</Content>
      </ScrollArea>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const ScrollArea = styled.ScrollView`
  flex: 1;
`;

const Content = styled.View`
  padding: 0 ${spacing.xl}px ${spacing.xxxl}px;
`;
