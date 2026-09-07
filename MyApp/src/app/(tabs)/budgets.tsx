import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styled from "styled-components/native";

import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { ProgressBar } from "../../components/ProgressBar";
import { useFinance } from "../../context/FinanceContext";
import { colors, radius, spacing } from "../../theme/tokens";
import type { Budget } from "../../types/finance";
import { formatCurrency } from "../../utils/currency";
import { formatMonthYear } from "../../utils/date";

export default function BudgetsScreen() {
  const router = useRouter();
  const { budgets, isLoadingBudgets, budgetError } = useFinance();
  const totalLimit = sumBy(budgets, "limit");
  const totalSpent = sumBy(budgets, "spent");
  const remaining = Math.max(totalLimit - totalSpent, 0);
  const progress = totalLimit > 0 ? totalSpent / totalLimit : 0;

  function openNewBudget() {
    router.push("/budget/new");
  }

  return (
    <AppScreen>
      <AppHeader
        title="Ngân sách"
        subtitle={formatMonthYear()}
        actionIcon="add"
        onAction={openNewBudget}
      />

      <SummaryCard>
        <Eyebrow>TỔNG NGÂN SÁCH</Eyebrow>
        <SummaryValue>{formatCurrency(totalLimit)}</SummaryValue>
        <SummaryMeta>
          <SummarySpent>Đã chi {formatCurrency(totalSpent)}</SummarySpent>
          <SummaryRemaining>Còn {formatCurrency(remaining)}</SummaryRemaining>
        </SummaryMeta>
        <ProgressBar value={progress} color={colors.white} height={9} />
      </SummaryCard>

      {totalLimit > 0 && totalSpent > totalLimit ? (
        <Notice>
          <Ionicons name="warning-outline" size={19} color={colors.expense} />
          <NoticeText>
            Bạn đã vượt ngân sách {formatCurrency(totalSpent - totalLimit)} trong tháng này.
          </NoticeText>
        </Notice>
      ) : null}

      <SectionTitle>Theo danh mục</SectionTitle>

      {isLoadingBudgets ? <StatusText>Đang tải ngân sách...</StatusText> : null}
      {budgetError ? <ErrorText>{budgetError}</ErrorText> : null}
      {!isLoadingBudgets && !budgetError && budgets.length === 0 ? (
        <EmptyCard>
          <Ionicons name="pie-chart-outline" size={30} color={colors.textMuted} />
          <EmptyTitle>Chưa có ngân sách tháng này</EmptyTitle>
          <EmptyText>Hãy tạo hạn mức cho một danh mục chi để bắt đầu theo dõi.</EmptyText>
        </EmptyCard>
      ) : null}

      {budgets.length > 0 ? (
        <BudgetList>
          {budgets.map((budget, index) => (
            <BudgetItem
              key={budget.id}
              budget={budget}
              hasDivider={index < budgets.length - 1}
            />
          ))}
        </BudgetList>
      ) : null}

      <AddButton onPress={openNewBudget} activeOpacity={0.65}>
        <Ionicons name="add-circle-outline" size={20} color={colors.primary} />
        <AddText>Tạo ngân sách mới</AddText>
      </AddButton>
    </AppScreen>
  );
}

function BudgetItem({ budget, hasDivider }: { budget: Budget; hasDivider: boolean }) {
  const progress = budget.limit > 0 ? budget.spent / budget.limit : 0;
  const isNearLimit = progress >= 0.9;

  return (
    <Item $hasDivider={hasDivider}>
      <ItemTop>
        <IconBox $color={budget.color}>
          <Ionicons name={budget.icon} color={budget.color} size={21} />
        </IconBox>
        <ItemCopy>
          <NameRow>
            <ItemName>{budget.name}</ItemName>
            <Percentage $danger={isNearLimit}>{Math.round(progress * 100)}%</Percentage>
          </NameRow>
          <ItemMeta>{formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}</ItemMeta>
        </ItemCopy>
      </ItemTop>
      <ProgressBar value={progress} color={isNearLimit ? colors.expense : budget.color} />
    </Item>
  );
}

function sumBy(budgets: Budget[], field: "limit" | "spent") {
  return budgets.reduce((total, budget) => total + budget[field], 0);
}

const SummaryCard = styled.View`
  padding: ${spacing.xl}px;
  border-radius: ${radius.lg}px;
  background-color: ${colors.primary};
`;

const Eyebrow = styled.Text`
  color: #cce1d5;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
`;

const SummaryValue = styled.Text`
  margin-top: ${spacing.sm}px;
  color: ${colors.white};
  font-size: 28px;
  font-weight: 800;
`;

const SummaryMeta = styled.View`
  margin-top: ${spacing.xl}px;
  margin-bottom: ${spacing.md}px;
  flex-direction: row;
  justify-content: space-between;
`;

const SummarySpent = styled.Text`
  color: ${colors.white};
  font-size: 11px;
  font-weight: 600;
`;

const SummaryRemaining = styled.Text`
  color: #cce1d5;
  font-size: 11px;
`;

const Notice = styled.View`
  margin-top: ${spacing.lg}px;
  padding: ${spacing.md}px;
  flex-direction: row;
  align-items: center;
  gap: ${spacing.md}px;
  border-radius: ${radius.md}px;
  background-color: ${colors.expenseSoft};
`;

const NoticeText = styled.Text`
  flex: 1;
  color: ${colors.expense};
  font-size: 12px;
  line-height: 17px;
  font-weight: 600;
`;

const SectionTitle = styled.Text`
  margin-top: ${spacing.xxl}px;
  margin-bottom: ${spacing.md}px;
  color: ${colors.text};
  font-size: 18px;
  font-weight: 700;
`;

const StatusText = styled.Text`
  padding: ${spacing.xxl}px;
  color: ${colors.textMuted};
  font-size: 12px;
  text-align: center;
`;

const ErrorText = styled(StatusText)`
  color: ${colors.expense};
`;

const EmptyCard = styled.View`
  padding: ${spacing.xxl}px ${spacing.xl}px;
  align-items: center;
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const EmptyTitle = styled.Text`
  margin-top: ${spacing.md}px;
  color: ${colors.text};
  font-size: 14px;
  font-weight: 700;
`;

const EmptyText = styled.Text`
  margin-top: ${spacing.sm}px;
  color: ${colors.textMuted};
  font-size: 12px;
  line-height: 18px;
  text-align: center;
`;

const BudgetList = styled.View`
  padding: 0 ${spacing.lg}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg}px;
  background-color: ${colors.surface};
`;

const Item = styled.View<{ $hasDivider: boolean }>`
  padding: ${spacing.lg}px 0;
  border-bottom-width: ${({ $hasDivider }) => $hasDivider ? 1 : 0}px;
  border-bottom-color: ${colors.border};
`;

const ItemTop = styled.View`
  margin-bottom: ${spacing.md}px;
  flex-direction: row;
  align-items: center;
`;

const IconBox = styled.View<{ $color: string }>`
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.md}px;
  background-color: ${({ $color }) => `${$color}18`};
`;

const ItemCopy = styled.View`
  flex: 1;
  margin-left: ${spacing.md}px;
`;

const NameRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemName = styled.Text`
  color: ${colors.text};
  font-size: 14px;
  font-weight: 700;
`;

const Percentage = styled.Text<{ $danger: boolean }>`
  color: ${({ $danger }) => $danger ? colors.expense : colors.primary};
  font-size: 12px;
  font-weight: 800;
`;

const ItemMeta = styled.Text`
  margin-top: ${spacing.xs}px;
  color: ${colors.textMuted};
  font-size: 11px;
`;

const AddButton = styled.TouchableOpacity`
  height: 50px;
  margin-top: ${spacing.lg}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  border: 1px dashed ${colors.primary};
  border-radius: ${radius.md}px;
`;

const AddText = styled.Text`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: 700;
`;
