import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "react-native";
import { Calendar, LocaleConfig, type DateData } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { colors, radius, spacing } from "../../theme/tokens";
import {
  type DateRange,
  formatDateRange,
  fromDateKey,
  getPresetDateRange,
  toDateKey,
} from "../../utils/report";

LocaleConfig.locales.vi = {
  monthNames: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
  monthNamesShort: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
  dayNames: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
  dayNamesShort: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
  today: "Hôm nay",
};
LocaleConfig.defaultLocale = "vi";

type ReportDateFilterProps = {
  visible: boolean;
  initialRange: DateRange;
  expenseDateKeys: string[];
  onClose: () => void;
  onApply: (range: DateRange) => void;
};

type MarkedDay = {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  textColor?: string;
  marked?: boolean;
  dotColor?: string;
};

export function ReportDateFilter({
  visible,
  initialRange,
  expenseDateKeys,
  onClose,
  onApply,
}: ReportDateFilterProps) {
  const [startDate, setStartDate] = useState(toDateKey(initialRange.start));
  const [endDate, setEndDate] = useState<string | null>(toDateKey(initialRange.end));

  useEffect(() => {
    if (!visible) return;
    setStartDate(toDateKey(initialRange.start));
    setEndDate(toDateKey(initialRange.end));
  }, [initialRange, visible]);

  const markedDates = useMemo(
    () => createMarkedDates(startDate, endDate, expenseDateKeys),
    [endDate, expenseDateKeys, startDate],
  );

  function handleDayPress(day: DateData) {
    if (!startDate || endDate || day.dateString < startDate) {
      setStartDate(day.dateString);
      setEndDate(null);
      return;
    }

    setEndDate(day.dateString);
  }

  function handleReset() {
    const currentMonth = getPresetDateRange("currentMonth");
    setStartDate(toDateKey(currentMonth.start));
    setEndDate(toDateKey(currentMonth.end));
  }

  function handleApply() {
    const finalEndDate = endDate || startDate;
    onApply({ start: fromDateKey(startDate), end: fromDateKey(finalEndDate) });
  }

  const selectedRange = {
    start: fromDateKey(startDate),
    end: fromDateKey(endDate || startDate),
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Overlay>
        <Sheet edges={["bottom"]}>
          <Handle />
          <Header>
            <HeaderCopy>
              <Title>Chọn khoảng thời gian</Title>
              <RangeText>{formatDateRange(selectedRange)}</RangeText>
            </HeaderCopy>
            <CloseButton onPress={onClose} activeOpacity={0.65}>
              <Ionicons name="close" size={22} color={colors.text} />
            </CloseButton>
          </Header>

          <Calendar
            current={startDate}
            firstDay={1}
            maxDate={toDateKey(new Date())}
            enableSwipeMonths
            markingType="period"
            markedDates={markedDates}
            onDayPress={handleDayPress}
            theme={{
              calendarBackground: colors.surface,
              textSectionTitleColor: colors.textMuted,
              selectedDayBackgroundColor: colors.primary,
              selectedDayTextColor: colors.white,
              todayTextColor: colors.primary,
              dayTextColor: colors.text,
              textDisabledColor: colors.border,
              arrowColor: colors.primary,
              monthTextColor: colors.text,
              textMonthFontWeight: "700",
              textDayFontSize: 13,
              textDayHeaderFontSize: 11,
            }}
          />

          <Hint>
            <Ionicons name="information-circle-outline" size={17} color={colors.textMuted} />
            <HintText>Chọn ngày bắt đầu, sau đó chọn ngày kết thúc. Dấu chấm đỏ là ngày có khoản chi.</HintText>
          </Hint>

          <Actions>
            <ResetButton onPress={handleReset} activeOpacity={0.65}>
              <ResetText>Đặt lại</ResetText>
            </ResetButton>
            <ApplyButton onPress={handleApply} activeOpacity={0.75}>
              <ApplyText>Xem báo cáo</ApplyText>
            </ApplyButton>
          </Actions>
        </Sheet>
      </Overlay>
    </Modal>
  );
}

function createMarkedDates(startDate: string, endDate: string | null, expenseDateKeys: string[]) {
  const result: Record<string, MarkedDay> = {};

  expenseDateKeys.forEach((date) => {
    result[date] = { marked: true, dotColor: colors.expense };
  });

  const finalEndDate = endDate || startDate;
  const current = fromDateKey(startDate);
  const end = fromDateKey(finalEndDate);

  while (current <= end) {
    const key = toDateKey(current);
    const isStart = key === startDate;
    const isEnd = key === finalEndDate;
    const hasExpense = expenseDateKeys.includes(key);

    result[key] = {
      startingDay: isStart,
      endingDay: isEnd,
      color: isStart || isEnd ? colors.primary : colors.primarySoft,
      textColor: isStart || isEnd ? colors.white : colors.text,
      marked: hasExpense,
      dotColor: hasExpense ? (isStart || isEnd ? colors.white : colors.expense) : undefined,
    };

    current.setDate(current.getDate() + 1);
  }

  return result;
}

const Overlay = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${colors.overlay};
`;

const Sheet = styled(SafeAreaView)`
  padding: ${spacing.sm}px ${spacing.xl}px ${spacing.lg}px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: ${colors.surface};
`;

const Handle = styled.View`
  width: 42px;
  height: 4px;
  align-self: center;
  margin-bottom: ${spacing.lg}px;
  border-radius: ${radius.pill}px;
  background-color: ${colors.border};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${spacing.sm}px;
`;

const HeaderCopy = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${colors.text};
  font-size: 18px;
  font-weight: 800;
`;

const RangeText = styled.Text`
  margin-top: ${spacing.xs}px;
  color: ${colors.primary};
  font-size: 12px;
  font-weight: 700;
`;

const CloseButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.border};
  border-radius: ${radius.pill}px;
`;

const Hint = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${spacing.sm}px;
  margin-top: ${spacing.sm}px;
  padding: ${spacing.md}px;
  border-radius: ${radius.md}px;
  background-color: ${colors.surfaceMuted};
`;

const HintText = styled.Text`
  flex: 1;
  color: ${colors.textMuted};
  font-size: 11px;
  line-height: 16px;
`;

const Actions = styled.View`
  flex-direction: row;
  gap: ${spacing.md}px;
  margin-top: ${spacing.lg}px;
`;

const ResetButton = styled.TouchableOpacity`
  height: 48px;
  padding: 0 ${spacing.xl}px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.border};
  border-radius: ${radius.md}px;
`;

const ResetText = styled.Text`
  color: ${colors.text};
  font-size: 13px;
  font-weight: 700;
`;

const ApplyButton = styled.TouchableOpacity`
  flex: 1;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.md}px;
  background-color: ${colors.primary};
`;

const ApplyText = styled.Text`
  color: ${colors.white};
  font-size: 13px;
  font-weight: 800;
`;
