import type { Transaction, TransactionType } from "../types/finance";

export type ReportPreset = "previousMonth" | "currentMonth" | "sixMonths" | "custom";

export type DateRange = {
  start: Date;
  end: Date;
};

export type ExpenseChartItem = {
  key: string;
  label: string;
  amount: number;
};

export type CategoryExpense = {
  id: string;
  name: string;
  amount: number;
  color: string;
};

export function getPresetDateRange(preset: Exclude<ReportPreset, "custom">, today = new Date()): DateRange {
  if (preset === "previousMonth") {
    return {
      start: startOfDay(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
      end: endOfDay(new Date(today.getFullYear(), today.getMonth(), 0)),
    };
  }

  if (preset === "sixMonths") {
    return {
      start: startOfDay(new Date(today.getFullYear(), today.getMonth() - 5, 1)),
      end: endOfDay(today),
    };
  }

  return {
    start: startOfDay(new Date(today.getFullYear(), today.getMonth(), 1)),
    end: endOfDay(today),
  };
}

export function filterTransactionsByRange(transactions: Transaction[], range: DateRange) {
  const startTime = startOfDay(range.start).getTime();
  const endTime = endOfDay(range.end).getTime();

  return transactions.filter((transaction) => {
    const transactionTime = transaction.transactionDate.getTime();
    return transactionTime >= startTime && transactionTime <= endTime;
  });
}

export function calculateTransactionTotal(transactions: Transaction[], type: TransactionType) {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function buildExpenseChart(transactions: Transaction[], range: DateRange): ExpenseChartItem[] {
  const expenses = transactions.filter((transaction) => transaction.type === "expense");
  const numberOfDays = differenceInDays(range.start, range.end) + 1;

  if (numberOfDays === 1) {
    return [{
      key: toDateKey(range.start),
      label: "Ngày chọn",
      amount: sumAmounts(expenses),
    }];
  }

  if (numberOfDays <= 45) {
    const numberOfWeeks = Math.ceil(numberOfDays / 7);

    return Array.from({ length: numberOfWeeks }, (_, index) => {
      const weekStart = addDays(range.start, index * 7);
      const weekEnd = endOfDay(addDays(weekStart, 6));
      const amount = expenses
        .filter((transaction) => {
          const time = transaction.transactionDate.getTime();
          return time >= startOfDay(weekStart).getTime() && time <= weekEnd.getTime();
        })
        .reduce((total, transaction) => total + transaction.amount, 0);

      return { key: toDateKey(weekStart), label: `Tuần ${index + 1}`, amount };
    });
  }

  const months = getMonthsBetween(range.start, range.end);

  return months.map((monthDate) => {
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();
    const amount = expenses
      .filter((transaction) => (
        transaction.transactionDate.getMonth() === month
        && transaction.transactionDate.getFullYear() === year
      ))
      .reduce((total, transaction) => total + transaction.amount, 0);

    return {
      key: `${year}-${month + 1}`,
      label: `T${month + 1}`,
      amount,
    };
  });
}

export function buildCategoryExpenses(transactions: Transaction[]): CategoryExpense[] {
  const categories = new Map<string, CategoryExpense>();

  transactions
    .filter((transaction) => transaction.type === "expense")
    .forEach((transaction) => {
      const id = transaction.categoryId || transaction.category;
      const savedCategory = categories.get(id);

      categories.set(id, {
        id,
        name: transaction.category,
        color: transaction.color,
        amount: (savedCategory?.amount || 0) + transaction.amount,
      });
    });

  return Array.from(categories.values()).sort((first, second) => second.amount - first.amount);
}

export function formatDateRange(range: DateRange) {
  const formatter = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  if (toDateKey(range.start) === toDateKey(range.end)) {
    return formatter.format(range.start);
  }

  return `${formatter.format(range.start)} – ${formatter.format(range.end)}`;
}

export function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromDateKey(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function addDays(date: Date, numberOfDays: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + numberOfDays);
}

function differenceInDays(start: Date, end: Date) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.round((startOfDay(end).getTime() - startOfDay(start).getTime()) / millisecondsPerDay);
}

function getMonthsBetween(start: Date, end: Date) {
  const months: Date[] = [];
  const current = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);

  while (current <= last) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }

  return months;
}

function sumAmounts(transactions: Transaction[]) {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}
