import Ionicons from "@react-native-vector-icons/ionicons";
import type { ComponentProps } from "react";

export type TransactionType = "income" | "expense";
export type IconName = ComponentProps<typeof Ionicons>["name"];

export type Category = {
  id: string;
  categoryName: string;
  categoryType: TransactionType;
  color: string;
  icon: IconName;
  order: number;
};

export type Transaction = {
  id: string;
  categoryId: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  dateLabel: string;
  icon: IconName;
  color: string;
  backgroundColor: string;
  transactionDate: Date;
};

export type Budget = {
  id: string;
  categoryId: string;
  name: string;
  spent: number;
  limit: number;
  month: string;
  icon: IconName;
  color: string;
};
