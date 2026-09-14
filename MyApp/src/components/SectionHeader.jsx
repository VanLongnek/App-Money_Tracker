import styled from "styled-components/native";

import { colors, spacing } from "../theme/tokens";

const doNothing = () => {};

export function SectionHeader({
  title,
  actionLabel = String(),
  onAction = doNothing,
}) {
  return (
    <Container>
      <Title>{title}</Title>
      {actionLabel && (
        <ActionButton activeOpacity={0.65} onPress={onAction}>
          <ActionText>{actionLabel}</ActionText>
        </ActionButton>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spacing.xxl}px;
  margin-bottom: ${spacing.md}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 18px;
  font-weight: 700;
`;

const ActionButton = styled.TouchableOpacity``;

const ActionText = styled.Text`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: 700;
`;
