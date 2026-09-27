import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import styled from "styled-components/native";

import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { CategoryBreakdown } from "../../components/reports/CategoryBreakdown";
import { ExpenseChart } from "../../components/reports/ExpenseChart";
import { ReportDateFilter } from "../../components/reports/ReportDateFilter";
import { ReportSummary } from "../../components/reports/ReportSummary";
import { useFinance } from "../../context/FinanceContext";
import { colors, radius, spacing } from "../../theme/tokens";
import {
  buildCategoryExpenses,
  buildExpenseChart,
  calculateTransactionTotal,
  filterTransactionsByRange,
  formatDateRange,
  getPresetDateRange,
  toDateKey,
} from "../../utils/report";

export default function ReportsScreen() {
  const router = useRouter();
  const { transactions, isLoading, error } = useFinance();
  const [preset, setPreset] = useState("currentMonth");
  const [dateRange, setDateRange] = useState(() =>
    getPresetDateRange("currentMonth"),
  );
  const [calendarVisible, setCalendarVisible] = useState(false);

  const filteredTransactions = useMemo(
    () => filterTransactionsByRange(transactions, dateRange),
    [dateRange, transactions],
  );
  const income = calculateTransactionTotal(filteredTransactions, "income");
  const expense = calculateTransactionTotal(filteredTransactions, "expense");
  const chartItems = buildExpenseChart(filteredTransactions, dateRange);
  const categoryExpenses = buildCategoryExpenses(filteredTransactions);
  const expenseDateKeys = useMemo(
    () =>
      Array.from(
        new Set(
          transactions
            .filter((transaction) => transaction.type === "expense")
            .map((transaction) => toDateKey(transaction.transactionDate)),
        ),
      ),
    [transactions],
  );

  function selectPreset(selectedPreset) {
    setPreset(selectedPreset);
    setDateRange(getPresetDateRange(selectedPreset));
  }

  function applyCustomRange(range) {
    setPreset("custom");
    setDateRange(range);
    setCalendarVisible(false);
  }

  function openCategoryTransactions(category) {
    router.push({
      pathname: "/(tabs)/transactions",
      params: {
        categoryId: category.id,
        categoryName: category.name,
        startDate: toDateKey(dateRange.start),
        endDate: toDateKey(dateRange.end),
      },
    });
  }

  return (
    <AppScreen>
      <AppHeader
        title="Báo cáo"
        subtitle="Phân tích tài chính của bạn"
        actionIcon="calendar-outline"
        onAction={() => setCalendarVisible(true)}
      />

      <PeriodTabs>
        <PeriodButton
          label="Tháng trước"
          selected={preset === "previousMonth"}
          onPress={() => selectPreset("previousMonth")}
        />
        <PeriodButton
          label="Tháng này"
          selected={preset === "currentMonth"}
          onPress={() => selectPreset("currentMonth")}
        />
        <PeriodButton
          label="6 tháng"
          selected={preset === "sixMonths"}
          onPress={() => selectPreset("sixMonths")}
        />
      </PeriodTabs>

      <SelectedRange
        onPress={() => setCalendarVisible(true)}
        activeOpacity={0.65}
      >
        <Ionicons
          name="calendar-clear-outline"
          size={17}
          color={colors.primary}
        />
        <SelectedRangeText>{formatDateRange(dateRange)}</SelectedRangeText>
        {preset === "custom" ? <CustomBadge>Tùy chọn</CustomBadge> : null}
        <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
      </SelectedRange>

      {isLoading ? <StatusText>Đang tải dữ liệu báo cáo...</StatusText> : null}
      {error ? <ErrorText>{error}</ErrorText> : null}

      {!isLoading && !error ? (
        <>
          <ReportSummary income={income} expense={expense} />
          <ExpenseChart items={chartItems} />
          <CategoryBreakdown
            categories={categoryExpenses}
            totalExpense={expense}
            onCategoryPress={openCategoryTransactions}
          />
        </>
      ) : null}

      <ReportDateFilter
        visible={calendarVisible}
        initialRange={dateRange}
        expenseDateKeys={expenseDateKeys}
        onClose={() => setCalendarVisible(false)}
        onApply={applyCustomRange}
      />
    </AppScreen>
  );
}

function PeriodButton({ label, selected, onPress }) {
  return (
    <PeriodOption $selected={selected} onPress={onPress} activeOpacity={0.7}>
      <PeriodText $selected={selected}>{label}</PeriodText>
    </PeriodOption>
  );
}

const PeriodTabs = styled.View`
  flex-direction: row;
  padding: ${spacing.xs}px;
  margin-bottom: ${spacing.sm}px;
  border-radius: ${radius.md}px;
  background-color: ${colors.surfaceMuted};
`;

const PeriodOption = styled.TouchableOpacity<{ $selected: boolean }>`
  flex: 1;
  padding: ${spacing.sm}px 0;
  justify-content: center;
  border-radius: ${radius.sm}px;
  background-color: ${({ $selected }) =>
    $selected ? colors.surface : "transparent"};
`;

const PeriodText = styled.Text<{ $selected: boolean }>`
  color: ${({ $selected }) => ($selected ? colors.text : colors.textMuted)};
  font-size: 11px;
  font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
  text-align: center;
`;

const SelectedRange = styled.TouchableOpacity`
  min-height: 42px;
  flex-direction: row;
  align-items: center;
  gap: ${spacing.sm}px;
  margin-bottom: ${spacing.md}px;
  padding: ${spacing.sm}px ${spacing.md}px;
  border: 1px solid ${colors.border};
  border-radius: ${radius.md}px;
  background-color: ${colors.surface};
`;

const SelectedRangeText = styled.Text`
  flex: 1;
  color: ${colors.text};
  font-size: 11px;
  font-weight: 700;
`;

const CustomBadge = styled.Text`
  padding: 3px ${spacing.sm}px;
  overflow: hidden;
  border-radius: ${radius.pill}px;
  color: ${colors.primary};
  background-color: ${colors.primarySoft};
  font-size: 9px;
  font-weight: 700;
`;

const StatusText = styled.Text`
  padding: ${spacing.xxxl}px 0;
  color: ${colors.textMuted};
  font-size: 12px;
  text-align: center;
`;

const ErrorText = styled(StatusText)`
  color: ${colors.expense};
`;
