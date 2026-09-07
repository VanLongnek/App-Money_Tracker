import styled from "styled-components/native";

import { colors, radius, spacing } from "../../theme/tokens";
import { formatCompactCurrency, formatCurrency } from "../../utils/currency";

type ReportSummaryProps = {
  income: number;
  expense: number;
};

export function ReportSummary({ income, expense }: ReportSummaryProps) {
  const difference = income - expense;

  return (
    <Container>
      <Cards>
        <MetricCard>
          <MetricLabel>THU NHẬP</MetricLabel>
          <IncomeValue>{formatCompactCurrency(income)}</IncomeValue>
          <MetricCaption>Trong kỳ đã chọn</MetricCaption>
        </MetricCard>
        <MetricCard>
          <MetricLabel>CHI TIÊU</MetricLabel>
          <ExpenseValue>{formatCompactCurrency(expense)}</ExpenseValue>
          <MetricCaption>Trong kỳ đã chọn</MetricCaption>
        </MetricCard>
      </Cards>
      <DifferenceRow>
        <DifferenceLabel>Chênh lệch thu – chi</DifferenceLabel>
        <DifferenceValue $positive={difference >= 0}>{formatCurrency(difference)}</DifferenceValue>
      </DifferenceRow>
    </Container>
  );
}

const Container = styled.View`
  gap: ${spacing.md}px;
`;

const Cards = styled.View`
  flex-direction: row;
  gap: ${spacing.md}px;
`;

const MetricCard = styled.View`
  flex: 1;
  padding: ${spacing.lg}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const MetricLabel = styled.Text`
  color: ${colors.textMuted};
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.8px;
`;

const IncomeValue = styled.Text`
  margin-top: ${spacing.sm}px;
  color: ${colors.income};
  font-size: 20px;
  font-weight: 800;
`;

const ExpenseValue = styled(IncomeValue)`
  color: ${colors.expense};
`;

const MetricCaption = styled.Text`
  margin-top: ${spacing.sm}px;
  color: ${colors.textMuted};
  font-size: 10px;
  font-weight: 600;
`;

const DifferenceRow = styled.View`
  padding: ${spacing.md}px ${spacing.lg}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: ${radius.md}px;
  background-color: ${colors.surfaceMuted};
`;

const DifferenceLabel = styled.Text`
  color: ${colors.textMuted};
  font-size: 11px;
  font-weight: 600;
`;

const DifferenceValue = styled.Text<{ $positive: boolean }>`
  color: ${({ $positive }) => $positive ? colors.income : colors.expense};
  font-size: 12px;
  font-weight: 800;
`;
