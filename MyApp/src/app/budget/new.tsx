import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { useAuth } from "../../context/AuthContext";
import { saveBudget } from "../../services/budgetService";
import { getCategories } from "../../services/categoryService";
import { colors, radius, spacing } from "../../theme/tokens";
import type { Category } from "../../types/finance";
import { formatMonthYear, getMonthKey } from "../../utils/date";

export default function NewBudgetScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    getCategories("expense")
      .then((result) => {
        if (!isActive) return;
        setCategories(result);
        setSelectedCategoryId(result[0]?.id || "");
      })
      .catch(() => {
        if (isActive) setError("Không thể tải danh mục chi từ Firebase.");
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  async function handleSave() {
    const limit = Number(amount.replace(/[^0-9]/g, ""));
    const category = categories.find((item) => item.id === selectedCategoryId);

    if (!limit) {
      Alert.alert("Thiếu hạn mức", "Vui lòng nhập số tiền ngân sách.");
      return;
    }

    if (!category) {
      Alert.alert("Thiếu danh mục", "Vui lòng chọn một danh mục chi.");
      return;
    }

    if (!user) {
      Alert.alert("Phiên đã hết hạn", "Vui lòng đăng nhập lại.");
      return;
    }

    try {
      setIsSaving(true);
      await saveBudget(user.uid, {
        categoryId: category.id,
        categoryName: category.categoryName,
        limit,
        month: getMonthKey(),
        icon: category.icon,
        color: category.color,
      });

      Alert.alert("Đã lưu ngân sách", "Hạn mức của danh mục đã được cập nhật.", [
        { text: "Đồng ý", onPress: () => router.back() },
      ]);
    } catch {
      Alert.alert("Không thể lưu", "Hãy kiểm tra mạng và Firestore Rules rồi thử lại.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Screen edges={["top", "bottom"]}>
      <Header>
        <CloseButton onPress={() => router.back()} activeOpacity={0.65}>
          <Ionicons name="close" size={24} color={colors.text} />
        </CloseButton>
        <HeaderTitle>Tạo ngân sách</HeaderTitle>
        <HeaderSpace />
      </Header>

      <Content keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <MonthLabel>Áp dụng cho</MonthLabel>
        <MonthValue>{formatMonthYear()}</MonthValue>

        <AmountLabel>Hạn mức chi tiêu</AmountLabel>
        <AmountRow>
          <Currency>₫</Currency>
          <AmountInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor="#A9AFAB"
          />
        </AmountRow>

        <FieldLabel>Chọn danh mục chi</FieldLabel>
        {isLoading ? (
          <StatusBox>
            <ActivityIndicator color={colors.primary} />
            <StatusText>Đang tải danh mục...</StatusText>
          </StatusBox>
        ) : error ? (
          <StatusBox>
            <Ionicons name="cloud-offline-outline" size={24} color={colors.expense} />
            <ErrorText>{error}</ErrorText>
          </StatusBox>
        ) : (
          <CategoryGrid>
            {categories.map((category) => {
              const selected = category.id === selectedCategoryId;

              return (
                <CategoryButton
                  key={category.id}
                  selected={selected}
                  selectedColor={category.color}
                  onPress={() => setSelectedCategoryId(category.id)}
                  activeOpacity={0.7}
                >
                  <CategoryIcon selected={selected} selectedColor={category.color}>
                    <Ionicons
                      name={category.icon}
                      size={20}
                      color={selected ? colors.white : category.color}
                    />
                  </CategoryIcon>
                  <CategoryName selected={selected} selectedColor={category.color}>
                    {category.categoryName}
                  </CategoryName>
                </CategoryButton>
              );
            })}
          </CategoryGrid>
        )}
      </Content>

      <Footer>
        <SaveButton disabled={isSaving} onPress={handleSave} activeOpacity={0.75}>
          <SaveText>{isSaving ? "Đang lưu..." : "Lưu ngân sách"}</SaveText>
        </SaveButton>
      </Footer>
    </Screen>
  );
}

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const Header = styled.View`
  height: 58px;
  padding: 0 ${spacing.xl}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${colors.border};
  border-radius: ${radius.pill}px;
  background-color: ${colors.surface};
`;

const HeaderTitle = styled.Text`
  color: ${colors.text};
  font-size: 17px;
  font-weight: 700;
`;

const HeaderSpace = styled.View`
  width: 40px;
`;

const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
})``;

const MonthLabel = styled.Text`
  margin-top: ${spacing.md}px;
  color: ${colors.textMuted};
  font-size: 12px;
  text-align: center;
`;

const MonthValue = styled.Text`
  margin-top: ${spacing.xs}px;
  color: ${colors.text};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const AmountLabel = styled.Text`
  margin-top: ${spacing.xxl}px;
  color: ${colors.textMuted};
  font-size: 12px;
  text-align: center;
`;

const AmountRow = styled.View`
  margin: ${spacing.xl}px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Currency = styled.Text`
  margin-right: ${spacing.sm}px;
  color: ${colors.textMuted};
  font-size: 28px;
  font-weight: 700;
`;

const AmountInput = styled.TextInput`
  min-width: 100px;
  padding: 0;
  color: ${colors.text};
  font-size: 42px;
  font-weight: 800;
  text-align: center;
`;

const FieldLabel = styled.Text`
  margin-top: ${spacing.xl}px;
  margin-bottom: ${spacing.md}px;
  color: ${colors.text};
  font-size: 15px;
  font-weight: 700;
`;

const StatusBox = styled.View`
  min-height: 110px;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm}px;
  border-radius: ${radius.md}px;
  background-color: ${colors.surfaceMuted};
`;

const StatusText = styled.Text`
  color: ${colors.textMuted};
  font-size: 12px;
`;

const ErrorText = styled.Text`
  color: ${colors.expense};
  font-size: 12px;
`;

const CategoryGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: ${spacing.lg}px;
`;

const CategoryButton = styled.TouchableOpacity<{ selected: boolean; selectedColor: string }>`
  width: 31%;
  align-items: center;
  padding: ${spacing.sm}px 0;
  border-radius: ${radius.md}px;
  background-color: ${({ selected, selectedColor }) => selected ? `${selectedColor}18` : "transparent"};
`;

const CategoryIcon = styled.View<{ selected: boolean; selectedColor: string }>`
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ selected, selectedColor }) => selected ? selectedColor : colors.border};
  border-radius: ${radius.md}px;
  background-color: ${({ selected, selectedColor }) => selected ? selectedColor : colors.surface};
`;

const CategoryName = styled.Text<{ selected: boolean; selectedColor: string }>`
  margin-top: ${spacing.sm}px;
  color: ${({ selected, selectedColor }) => selected ? selectedColor : colors.textMuted};
  font-size: 10px;
  font-weight: ${({ selected }) => selected ? 800 : 600};
`;

const Footer = styled.View`
  padding: ${spacing.md}px ${spacing.xl}px ${spacing.xl}px;
  border-top-width: 1px;
  border-top-color: ${colors.border};
`;

const SaveButton = styled.TouchableOpacity`
  height: 52px;
  align-items: center;
  justify-content: center;
  border-radius: ${radius.md}px;
  background-color: ${colors.primary};
`;

const SaveText = styled.Text`
  color: ${colors.white};
  font-size: 15px;
  font-weight: 800;
`;
