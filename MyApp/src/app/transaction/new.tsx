import Ionicons from "@react-native-vector-icons/ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../../context/AuthContext";
import { getCategories } from "../../services/categoryService";
import { createTransaction } from "../../services/transactionService";
import { colors, radius, spacing } from "../../theme/tokens";
import type { Category, TransactionType } from "../../types/finance";
import { formatCurrentDate } from "../../utils/date";

export default function NewTransactionScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ type?: TransactionType }>();
  const [type, setType] = useState<TransactionType>(
    params.type === "income" ? "income" : "expense",
  );
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let screenIsActive = true;

    async function loadCategories() {
      try {
        setIsLoadingCategories(true);
        setCategoryError("");

        const firebaseCategories = await getCategories(type);

        if (screenIsActive) {
          setCategories(firebaseCategories);
          setSelectedCategoryId(firebaseCategories[0]?.id || "");
        }
      } catch {
        if (screenIsActive) {
          setCategories([]);
          setSelectedCategoryId("");
          setCategoryError("Không thể tải danh mục từ Firebase.");
        }
      } finally {
        if (screenIsActive) {
          setIsLoadingCategories(false);
        }
      }
    }

    loadCategories();

    return () => {
      screenIsActive = false;
    };
  }, [type]);

  async function handleSave() {
    const numericAmount = Number(amount.replace(/[^0-9]/g, ""));
    const selectedCategory = categories.find(
      (item) => item.id === selectedCategoryId,
    );

    if (!numericAmount) {
      Alert.alert("Thiếu số tiền", "Vui lòng nhập số tiền cho giao dịch.");
      return;
    }

    if (!selectedCategory) {
      Alert.alert(
        "Thiếu danh mục",
        "Vui lòng tạo và chọn một danh mục trên Firebase.",
      );
      return;
    }

    if (!user) {
      Alert.alert("Phiên đã hết hạn", "Vui lòng đăng nhập lại.");
      return;
    }

    try {
      setIsSaving(true);
      await createTransaction(user.uid, {
        amount: numericAmount,
        type,
        categoryId: selectedCategory.id,
        categoryName: selectedCategory.categoryName,
        note,
        icon: selectedCategory.icon,
        color: selectedCategory.color,
      });

      Alert.alert("Đã lưu giao dịch", "Số dư của bạn đã được cập nhật.", [
        { text: "Đồng ý", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert(
        "Không thể lưu giao dịch",
        "Hãy kiểm tra kết nối mạng và Firestore Rules rồi thử lại.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="close" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Thêm giao dịch</Text>
          <View style={styles.iconPlaceholder} />
        </View>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.segment}>
            <TypeButton
              label="Khoản chi"
              selected={type === "expense"}
              onPress={() => setType("expense")}
            />
            <TypeButton
              label="Khoản thu"
              selected={type === "income"}
              onPress={() => setType("income")}
            />
          </View>
          <Text style={styles.amountLabel}>Số tiền</Text>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>₫</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="number-pad"
              placeholder="0"
              placeholderTextColor="#A9AFAB"
              style={styles.amountInput}
              autoFocus
            />
          </View>
          <Text style={styles.fieldLabel}>Danh mục</Text>
          {isLoadingCategories ? (
            <View style={styles.categoryStatus}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.categoryStatusText}>
                Đang tải danh mục...
              </Text>
            </View>
          ) : categoryError ? (
            <View style={styles.categoryStatus}>
              <Ionicons
                name="cloud-offline-outline"
                size={24}
                color={colors.expense}
              />
              <Text style={styles.categoryErrorText}>{categoryError}</Text>
            </View>
          ) : categories.length === 0 ? (
            <View style={styles.categoryStatus}>
              <Ionicons
                name="folder-open-outline"
                size={24}
                color={colors.textMuted}
              />
              <Text style={styles.categoryStatusText}>
                Chưa có danh mục{" "}
                {type === "expense" ? "khoản chi" : "khoản thu"}.
              </Text>
            </View>
          ) : (
            <View style={styles.categories}>
              {categories.map((item) => {
                const selected = item.id === selectedCategoryId;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setSelectedCategoryId(item.id)}
                    style={[
                      styles.category,
                      selected && { backgroundColor: `${item.color}18` },
                    ]}
                  >
                    <View
                      style={[
                        styles.categoryIcon,
                        selected && {
                          backgroundColor: item.color,
                          borderColor: item.color,
                        },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={20}
                        color={selected ? colors.white : item.color}
                      />
                    </View>
                    <Text
                      style={[
                        styles.categoryLabel,
                        selected && { color: item.color, fontWeight: "800" },
                      ]}
                    >
                      {item.categoryName}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
          <Text style={styles.fieldLabel}>Thông tin</Text>
          <View style={styles.field}>
            <Ionicons
              name="create-outline"
              size={20}
              color={colors.textMuted}
            />
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Ghi chú giao dịch"
              placeholderTextColor={colors.textMuted}
              style={styles.fieldInput}
            />
          </View>
          <View style={styles.field}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.textMuted}
            />
            <Text style={styles.fieldValue}>{formatCurrentDate()}</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </View>
          <View style={styles.field}>
            <Ionicons
              name="wallet-outline"
              size={20}
              color={colors.textMuted}
            />
            <Text style={styles.fieldValue}>Ví chính</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Pressable
            disabled={isSaving}
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveButton,
              isSaving && styles.saveButtonDisabled,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.saveText}>
              {isSaving ? "Đang lưu..." : "Lưu giao dịch"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function TypeButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.typeButton, selected && styles.typeSelected]}
    >
      <Text style={[styles.typeText, selected && styles.typeTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  header: {
    height: 58,
    paddingHorizontal: spacing.xl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconPlaceholder: { width: 40 },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  content: { padding: spacing.xl, paddingBottom: spacing.xxxl },
  segment: {
    flexDirection: "row",
    backgroundColor: colors.surfaceMuted,
    padding: spacing.xs,
    borderRadius: radius.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: radius.sm,
  },
  typeSelected: { backgroundColor: colors.surface },
  typeText: { color: colors.textMuted, fontSize: 13, fontWeight: "700" },
  typeTextSelected: { color: colors.primary },
  amountLabel: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 12,
    marginTop: spacing.xxl,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: spacing.xl,
  },
  currency: {
    color: colors.textMuted,
    fontSize: 28,
    fontWeight: "700",
    marginRight: spacing.sm,
  },
  amountInput: {
    minWidth: 100,
    color: colors.text,
    fontSize: 42,
    fontWeight: "800",
    textAlign: "center",
    padding: 0,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.lg,
  },
  category: {
    width: "31%",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
    marginTop: spacing.sm,
  },
  categoryStatus: {
    minHeight: 110,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceMuted,
  },
  categoryStatusText: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: "center",
  },
  categoryErrorText: {
    color: colors.expense,
    fontSize: 12,
    textAlign: "center",
  },
  field: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  fieldInput: { flex: 1, color: colors.text, fontSize: 13 },
  fieldValue: { flex: 1, color: colors.text, fontSize: 13 },
  footer: {
    padding: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  saveButton: {
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonDisabled: { opacity: 0.6 },
  saveText: { color: colors.white, fontSize: 15, fontWeight: "800" },
  pressed: { opacity: 0.75 },
});
