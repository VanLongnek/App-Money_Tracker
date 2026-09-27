import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { AppHeader } from "../../components/AppHeader";
import { AppScreen } from "../../components/AppScreen";
import { useAuth } from "../../context/AuthContext";
import { getAuthErrorMessage, logOut } from "../../services/authService";
import { colors, radius, spacing } from "../../theme/tokens";

export default function SettingsScreen() {
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const displayName = user?.displayName || "Người dùng";
  const email = user?.email || "";
  const initials = getInitials(displayName);

  async function handleLogOut() {
    try {
      await logOut();
    } catch (error) {
      Alert.alert("Đăng xuất thất bại", getAuthErrorMessage(error));
    }
  }

  return (
    <AppScreen>
      <AppHeader title="Cài đặt" subtitle="Cá nhân hóa trải nghiệm" />
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
      <SettingSection title="Tài chính">
        <SettingRow icon="wallet-outline" label="Đơn vị tiền tệ" value="VND" />
        <SettingRow
          icon="calendar-outline"
          label="Ngày bắt đầu tháng"
          value="Ngày 01"
        />
        <SettingRow icon="pricetags-outline" label="Quản lý danh mục" />
      </SettingSection>
      <SettingSection title="Tùy chọn">
        <SettingRow
          icon="notifications-outline"
          label="Thông báo ngân sách"
          toggleValue={notificationsEnabled}
          onToggle={setNotificationsEnabled}
        />
        <SettingRow
          icon="finger-print-outline"
          label="Đăng nhập sinh trắc học"
          toggleValue={biometricsEnabled}
          onToggle={setBiometricsEnabled}
        />
        <SettingRow icon="moon-outline" label="Giao diện" value="Sáng" />
      </SettingSection>
      <SettingSection title="Dữ liệu và hỗ trợ">
        <SettingRow
          icon="cloud-outline"
          label="Đồng bộ Firebase"
          value="Đã kết nối"
          valueColor={colors.income}
        />
        <SettingRow icon="download-outline" label="Xuất dữ liệu" />
        <SettingRow icon="help-circle-outline" label="Trợ giúp" />
      </SettingSection>
      <Pressable
        onPress={handleLogOut}
        style={({ pressed }) => [styles.logout, pressed && styles.pressed]}
      >
        <Ionicons name="log-out-outline" size={20} color={colors.expense} />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </Pressable>
      <Text style={styles.version}>Ví Nhà · Phiên bản 1.0.0</Text>
    </AppScreen>
  );
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(-2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

function SettingSection({ title, children }) {
  return (
    <View>
      <Text style={styles.sectionLabel}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function SettingRow({ icon, label, value, valueColor, toggleValue, onToggle }) {
  return (
    <Pressable style={styles.row}>
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      {onToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: colors.border, true: colors.primarySoft }}
          thumbColor={toggleValue ? colors.primary : "#A4AAA6"}
        />
      ) : (
        <View style={styles.rowRight}>
          {value ? (
            <Text
              style={[
                styles.rowValue,
                valueColor ? { color: valueColor } : null,
              ]}
            >
              {value}
            </Text>
          ) : null}
          <Ionicons name="chevron-forward" size={17} color={colors.textMuted} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: colors.primaryDark,
    padding: spacing.lg,
    borderRadius: radius.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.primaryDark, fontSize: 16, fontWeight: "800" },
  profileCopy: { flex: 1, marginLeft: spacing.md },
  name: { color: colors.white, fontSize: 16, fontWeight: "700" },
  email: { color: "#BED4C7", fontSize: 11, marginTop: spacing.xs },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginTop: spacing.xxl,
    marginBottom: spacing.sm,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    marginLeft: spacing.md,
  },
  rowRight: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  rowValue: { color: colors.textMuted, fontSize: 11 },
  logout: {
    height: 50,
    borderRadius: radius.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.expenseSoft,
    marginTop: spacing.xxl,
  },
  logoutText: { color: colors.expense, fontSize: 13, fontWeight: "700" },
  pressed: { opacity: 0.65 },
  version: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 10,
    marginTop: spacing.lg,
  },
});
