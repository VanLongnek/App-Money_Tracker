import { colors } from "../theme/tokens";
import type { Budget, Transaction } from "../types/finance";

export const transactions: Transaction[] = [
  { id: "transaction-1", title: "Cơm trưa", category: "Ăn uống", amount: 65000, type: "expense", dateLabel: "Hôm nay, 12:15", icon: "restaurant-outline", color: "#B0632C", backgroundColor: "#F7E9DD" },
  { id: "transaction-2", title: "Lương tháng 9", category: "Thu nhập", amount: 24000000, type: "income", dateLabel: "Hôm nay, 09:00", icon: "wallet-outline", color: colors.income, backgroundColor: colors.incomeSoft },
  { id: "transaction-3", title: "Đổ xăng", category: "Di chuyển", amount: 120000, type: "expense", dateLabel: "Hôm qua, 18:40", icon: "car-outline", color: "#3B6D9A", backgroundColor: "#E2ECF5" },
  { id: "transaction-4", title: "Mua sắm siêu thị", category: "Mua sắm", amount: 482000, type: "expense", dateLabel: "Hôm qua, 16:25", icon: "bag-handle-outline", color: "#7A5795", backgroundColor: "#EEE6F3" },
  { id: "transaction-5", title: "Tiền điện", category: "Hóa đơn", amount: 860000, type: "expense", dateLabel: "01/09, 20:10", icon: "flash-outline", color: colors.warning, backgroundColor: colors.warningSoft },
];

export const budgets: Budget[] = [
  { id: "food", name: "Ăn uống", spent: 2100000, limit: 3000000, icon: "restaurant-outline", color: "#B0632C" },
  { id: "shopping", name: "Mua sắm", spent: 1350000, limit: 2000000, icon: "bag-handle-outline", color: "#7A5795" },
  { id: "transport", name: "Di chuyển", spent: 720000, limit: 1500000, icon: "car-outline", color: "#3B6D9A" },
  { id: "entertainment", name: "Giải trí", spent: 1380000, limit: 1500000, icon: "game-controller-outline", color: "#A96A20" },
];

export const monthlyExpenses = [2.8, 3.6, 3.1, 4.5, 3.9, 5.55];
