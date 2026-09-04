import { collection, getDocs } from "firebase/firestore";
import { database } from "../config/firebase";

export async function getCategories() {
  const result = await getDocs(
    collection(database, "categories")
  );

  return result.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
}