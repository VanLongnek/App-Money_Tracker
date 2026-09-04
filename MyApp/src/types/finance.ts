import type { ComponentProps } from "react";
import type { Ionicons } from "@expo/vector-icons";

export type TransactionType = "income" | "expense";
export type IconName = ComponentProps<typeof Ionicons>["name"];

export type Transaction = {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: TransactionType;
  dateLabel: string;
  icon: IconName;
  color: string;
  backgroundColor: string;
};

export type Budget = {
  id: string;
  name: string;
  spent: number;
  limit: number;
  icon: IconName;
  color: string;
};
