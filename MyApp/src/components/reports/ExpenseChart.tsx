import styled from "styled-components/native";

import { colors, radius, spacing } from "../../theme/tokens";
import type { ExpenseChartItem } from "../../utils/report";
import { formatCompactCurrency } from "../../utils/currency";

type ExpenseChartProps = {
  items: ExpenseChartItem[];
};

export function ExpenseChart({ items }: ExpenseChartProps) {
  const maximum = Math.max(...items.map((item) => item.amount), 1);
  const average = items.reduce((total, item) => total + item.amount, 0) / Math.max(items.length, 1);

  return (
    <Card>
      <Header>
        <HeaderCopy>
          <Title>Xu hướng chi tiêu</Title>
          <Caption>{items.length > 1 ? "Theo từng giai đoạn" : "Trong ngày đã chọn"}</Caption>
        </HeaderCopy>
        <Average>TB {formatCompactCurrency(average)}</Average>
      </Header>

      <ChartScroll horizontal showsHorizontalScrollIndicator={false}>
        <Chart $numberOfItems={items.length}>
          {items.map((item, index) => {
            const height = item.amount > 0 ? Math.max((item.amount / maximum) * 100, 4) : 0;
            const isLast = index === items.length - 1;

            return (
              <BarColumn key={item.key}>
                <BarValue>{formatChartValue(item.amount)}</BarValue>
                <BarTrack>
                  <Bar $height={height} $highlighted={isLast} />
                </BarTrack>
                <BarLabel $highlighted={isLast}>{item.label}</BarLabel>
              </BarColumn>
            );
          })}
        </Chart>
      </ChartScroll>
    </Card>
  );
}

function formatChartValue(amount: number) {
  if (amount === 0) return "0";
  if (amount >= 1_000_000) {
    const value = amount / 1_000_000;
    return `${Number.isInteger(value) ? value : value.toFixed(1)}tr`;
  }
  if (amount >= 1_000) return `${Math.round(amount / 1_000)}k`;
  return String(amount);
}

const Card = styled.View`
  margin-top: ${spacing.md}px;
  padding: ${spacing.lg}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderCopy = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 16px;
  font-weight: 700;
`;

const Caption = styled.Text`
  margin-top: ${spacing.xs}px;
  color: ${colors.textMuted};
  font-size: 10px;
`;

const Average = styled.Text`
  color: ${colors.primary};
  font-size: 11px;
  font-weight: 700;
`;

const ChartScroll = styled.ScrollView`
  margin-top: ${spacing.xl}px;
`;

const Chart = styled.View<{ $numberOfItems: number }>`
  width: ${({ $numberOfItems }) => Math.max($numberOfItems * 54, 290)}px;
  height: 190px;
  flex-direction: row;
  align-items: flex-end;
`;

const BarColumn = styled.View`
  flex: 1;
  height: 100%;
  align-items: center;
`;

const BarValue = styled.Text`
  margin-bottom: ${spacing.xs}px;
  color: ${colors.textMuted};
  font-size: 9px;
`;

const BarTrack = styled.View`
  flex: 1;
  width: 20px;
  justify-content: flex-end;
  overflow: hidden;
  border-radius: ${radius.sm}px;
  background-color: ${colors.surfaceMuted};
`;

const Bar = styled.View<{ $height: number; $highlighted: boolean }>`
  width: 100%;
  height: ${({ $height }) => $height}%;
  border-radius: ${radius.sm}px;
  background-color: ${({ $highlighted }) => $highlighted ? colors.primary : "#9DB7A8"};
`;

const BarLabel = styled.Text<{ $highlighted: boolean }>`
  margin-top: ${spacing.sm}px;
  color: ${({ $highlighted }) => $highlighted ? colors.primary : colors.textMuted};
  font-size: 10px;
  font-weight: ${({ $highlighted }) => $highlighted ? 800 : 500};
`;
