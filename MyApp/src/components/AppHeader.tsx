import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import styled from "styled-components/native";

import { colors, radius, spacing } from "../theme/tokens";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actionIcon?: ComponentProps<typeof Ionicons>["name"];
  onAction?: () => void;
};

export function AppHeader({ title, subtitle, actionIcon, onAction }: AppHeaderProps) {
  return (
    <Container>
      <TitleArea>
        {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
        <Title>{title}</Title>
      </TitleArea>
      {actionIcon ? (
        <ActionButton accessibilityRole="button" activeOpacity={0.65} onPress={onAction}>
          <Ionicons name={actionIcon} size={21} color={colors.text} />
        </ActionButton>
      ) : null}
    </Container>
  );
}

const Container = styled.View`
  min-height: 72px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: ${spacing.sm}px;
  padding-bottom: ${spacing.md}px;
`;

const TitleArea = styled.View`
  flex: 1;
`;

const Subtitle = styled.Text`
  margin-bottom: 2px;
  color: ${colors.textMuted};
  font-size: 13px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 26px;
  line-height: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
`;

const ActionButton = styled.TouchableOpacity`
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.border};
  border-radius: ${radius.pill}px;
  background-color: ${colors.surface};
`;
