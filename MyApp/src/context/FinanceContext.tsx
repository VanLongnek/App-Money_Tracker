import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { subscribeToBudgets } from "../services/budgetService";
import { subscribeToTransactions } from "../services/transactionService";
import type { Budget, Transaction } from "../types/finance";
import { getMonthKey } from "../utils/date";
import { useAuth } from "./AuthContext";

type FinanceContextValue = {
  transactions: Transaction[];
  budgets: Budget[];
  isLoading: boolean;
  isLoadingBudgets: boolean;
  error: string;
  budgetError: string;
};

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);

export function FinanceProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [savedBudgets, setSavedBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBudgets, setIsLoadingBudgets] = useState(true);
  const [error, setError] = useState("");
  const [budgetError, setBudgetError] = useState("");
  const month = getMonthKey();

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setIsLoading(false);
      setError("");
      return;
    }

    setIsLoading(true);
    setError("");

    return subscribeToTransactions(
      user.uid,
      (firebaseTransactions) => {
        setTransactions(firebaseTransactions);
        setIsLoading(false);
      },
      () => {
        setTransactions([]);
        setIsLoading(false);
        setError("Không thể tải giao dịch từ Firebase.");
      },
    );
  }, [user]);

  useEffect(() => {
    if (!user) {
      setSavedBudgets([]);
      setIsLoadingBudgets(false);
      setBudgetError("");
      return;
    }

    setIsLoadingBudgets(true);
    setBudgetError("");

    return subscribeToBudgets(
      user.uid,
      month,
      (firebaseBudgets) => {
        setSavedBudgets(firebaseBudgets);
        setIsLoadingBudgets(false);
      },
      () => {
        setSavedBudgets([]);
        setIsLoadingBudgets(false);
        setBudgetError("Không thể tải ngân sách từ Firebase.");
      },
    );
  }, [month, user]);

  const budgets = useMemo(() => savedBudgets.map((budget) => ({
    ...budget,
    spent: transactions
      .filter((transaction) => (
        transaction.type === "expense"
        && transaction.categoryId === budget.categoryId
        && getMonthKey(transaction.transactionDate) === budget.month
      ))
      .reduce((total, transaction) => total + transaction.amount, 0),
  })), [savedBudgets, transactions]);

  return (
    <FinanceContext.Provider value={{
      transactions,
      budgets,
      isLoading,
      isLoadingBudgets,
      error,
      budgetError,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error("useFinance phải được sử dụng bên trong FinanceProvider");
  }

  return context;
}
