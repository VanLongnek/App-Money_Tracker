import {
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@react-native-firebase/firestore";

import { database } from "../config/firebase";
import type { Budget, IconName } from "../types/finance";

export type NewBudget = {
  categoryId: string;
  categoryName: string;
  limit: number;
  month: string;
  icon: IconName;
  color: string;
};

export async function saveBudget(userId: string, budget: NewBudget) {
  const budgetId = `${budget.month}_${budget.categoryId}`;
  const budgetReference = doc(database, "users", userId, "budgets", budgetId);

  return setDoc(
    budgetReference,
    {
      ...budget,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function subscribeToBudgets(
  userId: string,
  month: string,
  onData: (budgets: Budget[]) => void,
  onError: () => void,
) {
  const budgetsQuery = query(
    collection(database, "users", userId, "budgets"),
    where("month", "==", month),
  );

  return onSnapshot(
    budgetsQuery,
    (snapshot) => {
      const budgets = snapshot.docs.map((document) => {
        const data = document.data();

        return {
          id: document.id,
          categoryId: String(data.categoryId || ""),
          name: String(data.categoryName || "Danh mục"),
          spent: 0,
          limit: Number(data.limit || 0),
          month: String(data.month || month),
          icon: String(data.icon || "pricetag-outline") as IconName,
          color: String(data.color || "#236B4A"),
        } satisfies Budget;
      });

      onData(budgets.sort((first, second) => first.name.localeCompare(second.name, "vi")));
    },
    onError,
  );
}
