import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { colors, radius, spacing } from "../theme/tokens";
import { formatCurrency } from "../utils/currency";

export function TransactionRow({ transaction }) {
  const isIncome = transaction.type === "income";

  return (
    <Container>
      <IconBox $backgroundColor={transaction.backgroundColor}>
        <Ionicons name={transaction.icon} size={21} color={transaction.color} />
      </IconBox>

      <Details>
        <Title numberOfLines={1}>{transaction.title}</Title>
        <Description numberOfLines={1}>
          {transaction.category} · {transaction.dateLabel}
        </Description>
      </Details>

      <Amount $isIncome={isIncome}>
        {isIncome ? "+" : "−"}{formatCurrency(transaction.amount)}
      </Amount>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.md}px 0;
`;

const IconBox = styled.View`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.md}px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

const Details = styled.View`
  flex: 1;
  margin: 0 ${spacing.md}px;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 15px;
  font-weight: 700;
`;

const Description = styled.Text`
  margin-top: ${spacing.xs}px;
  color: ${colors.textMuted};
  font-size: 11px;
`;

const Amount = styled.Text`
  color: ${({ $isIncome }) => ($isIncome ? colors.income : colors.text)};
  font-size: 13px;
  font-weight: 800;
`;
