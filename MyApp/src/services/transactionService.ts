import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

import { database } from "../config/firebase";
import type { IconName, Transaction, TransactionType } from "../types/finance";
import { formatTransactionDate } from "../utils/date";

export type NewTransaction = {
  amount: number;
  type: TransactionType;
  categoryId: string;
  categoryName: string;
  note: string;
  icon: IconName;
  color: string;
};

export async function createTransaction(userId: string, transaction: NewTransaction) {
  const transactions = collection(database, "users", userId, "transactions");

  return addDoc(transactions, {
    ...transaction,
    note: transaction.note.trim(),
    transactionDate: Timestamp.now(),
    createdAt: serverTimestamp(),
  });
}

export function subscribeToTransactions(
  userId: string,
  onData: (transactions: Transaction[]) => void,
  onError: () => void,
) {
  const transactions = query(
    collection(database, "users", userId, "transactions"),
    orderBy("transactionDate", "desc"),
  );

  return onSnapshot(
    transactions,
    (snapshot) => {
      const result = snapshot.docs.map((document) => {
        const data = document.data();
        const transactionDate = getDate(data.transactionDate);
        const color = String(data.color || "#236B4A");

        return {
          id: document.id,
          categoryId: String(data.categoryId || ""),
          title: String(data.note || data.categoryName || "Giao dịch"),
          category: String(data.categoryName || "Danh mục"),
          amount: Number(data.amount || 0),
          type: data.type === "income" ? "income" : "expense",
          dateLabel: formatTransactionDate(transactionDate),
          icon: String(data.icon || "pricetag-outline") as IconName,
          color,
          backgroundColor: `${color}18`,
          transactionDate,
        } satisfies Transaction;
      });

      onData(result);
    },
    onError,
  );
}

function getDate(value: unknown) {
  return value instanceof Timestamp ? value.toDate() : new Date();
}
