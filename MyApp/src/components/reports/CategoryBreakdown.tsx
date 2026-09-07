import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import { ProgressBar } from "../ProgressBar";
import { colors, radius, spacing } from "../../theme/tokens";
import { formatCurrency } from "../../utils/currency";
import type { CategoryExpense } from "../../utils/report";

type CategoryBreakdownProps = {
  categories: CategoryExpense[];
  totalExpense: number;
  onCategoryPress: (category: CategoryExpense) => void;
};

export function CategoryBreakdown({
  categories,
  totalExpense,
  onCategoryPress,
}: CategoryBreakdownProps) {
  return (
    <Container>
      <SectionTitle>Chi tiêu theo danh mục</SectionTitle>
      <Card>
        {categories.length === 0 ? (
          <EmptyState>
            <Ionicons name="receipt-outline" size={28} color={colors.textMuted} />
            <EmptyText>Không có khoản chi trong thời gian này.</EmptyText>
          </EmptyState>
        ) : null}

        {categories.map((category, index) => {
          const percentage = totalExpense > 0 ? category.amount / totalExpense : 0;

          return (
            <CategoryButton
              key={category.id}
              $hasDivider={index < categories.length - 1}
              onPress={() => onCategoryPress(category)}
              activeOpacity={0.65}
            >
              <CategoryHeading>
                <Dot $color={category.color} />
                <CategoryName>{category.name}</CategoryName>
                <CategoryAmount>{formatCurrency(category.amount)}</CategoryAmount>
                <Ionicons name="chevron-forward" size={15} color={colors.textMuted} />
              </CategoryHeading>
              <ProgressBar value={percentage} color={category.color} height={6} />
              <Percentage>{Math.round(percentage * 100)}% tổng chi</Percentage>
            </CategoryButton>
          );
        })}
      </Card>
    </Container>
  );
}

const Container = styled.View``;

const SectionTitle = styled.Text`
  margin-top: ${spacing.xxl}px;
  margin-bottom: ${spacing.md}px;
  color: ${colors.text};
  font-size: 18px;
  font-weight: 700;
`;

const Card = styled.View`
  padding: 0 ${spacing.lg}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const EmptyState = styled.View`
  padding: ${spacing.xxl}px 0;
  align-items: center;
  gap: ${spacing.sm}px;
`;

const EmptyText = styled.Text`
  color: ${colors.textMuted};
  font-size: 12px;
`;

const CategoryButton = styled.TouchableOpacity<{ $hasDivider: boolean }>`
  padding: ${spacing.md}px 0;
  border-bottom-width: ${({ $hasDivider }) => $hasDivider ? 1 : 0}px;
  border-bottom-color: ${colors.border};
`;

const CategoryHeading = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.sm}px;
`;

const Dot = styled.View<{ $color: string }>`
  width: 9px;
  height: 9px;
  margin-right: ${spacing.sm}px;
  border-radius: ${radius.pill}px;
  background-color: ${({ $color }) => $color};
`;

const CategoryName = styled.Text`
  flex: 1;
  color: ${colors.text};
  font-size: 13px;
  font-weight: 600;
`;

const CategoryAmount = styled.Text`
  margin-right: ${spacing.xs}px;
  color: ${colors.text};
  font-size: 12px;
  font-weight: 700;
`;

const Percentage = styled.Text`
  margin-top: ${spacing.xs}px;
  color: ${colors.textMuted};
  font-size: 9px;
  text-align: right;
`;
