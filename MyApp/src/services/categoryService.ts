import { collection, getDocs, query, where } from "@react-native-firebase/firestore";

import { database } from "../config/firebase";
import type { Category, IconName, TransactionType } from "../types/finance";

export async function getCategories(categoryType: TransactionType): Promise<Category[]> {
  const categoriesQuery = query(
    collection(database, "categories"),
    where("categoryType", "==", categoryType),
  );

  const result = await getDocs(categoriesQuery);

  return result.docs
    .map((document) => {
      const data = document.data();

      return {
        id: document.id,
        categoryName: String(data.categoryName || "Danh mục"),
        categoryType,
        color: String(data.color || "#236B4A"),
        icon: String(data.icon || "pricetag-outline") as IconName,
        order: Number(data.order || 0),
      };
    })
    .sort((firstCategory, secondCategory) => firstCategory.order - secondCategory.order);
}
