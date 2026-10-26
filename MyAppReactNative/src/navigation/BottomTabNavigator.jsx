import { StyleSheet, View } from 'react-native';
import { createStaticNavigation, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, ReceiptText, PieChart, Settings } from 'lucide-react-native';
import { colors } from '../theme/color.jsx';
import Add from '../components/Add.jsx';

// 1. IMPORT CÁC MÀN HÌNH
import Home from '../screens/Home/Home.jsx';
import BudgetScreen from '../screens/Budget/BudgetScreen.jsx';
import TransactionsScreen from '../screens/Transaction/TransactionsScreen.jsx';
import SettingsScreen from '../screens/Profile-Setting/SettingsScreen.jsx';
import ExpenseScreen from '../screens/Transaction/ExpenseScreen.jsx';

// ========================================================
// 2. CẤU HÌNH BỘ ĐIỀU HƯỚNG TĨNH (ROOT TABS)
// ========================================================
const RootTabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  backBehavior: 'history',

  // Cấu hình giao diện chung cho tất cả các tab
  screenOptions: {
    headerShown: false, // Ẩn header mặc định
    sceneStyle: {
      backgroundColor: colors.background, // Nền đen #000000
    },
    tabBarStyle: {
      position: 'absolute',
      bottom: 20,
      left: 16,
      right: 16,
      borderRadius: 24,
      height: 64,
      backgroundColor: '#1E1E1E',
      borderTopWidth: 0,
      elevation: 8,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 8,
      paddingBottom: 6,
      paddingTop: 6,
    },
    tabBarLabelStyle: {
      fontSize: 11,
    },
    tabBarActiveTintColor: colors.textMuted, // Màu cam khi chọn
    tabBarInactiveTintColor: '#888888',     // Màu xám khi không chọn
  },

  screens: {
    // ----------------------------------------------------
    // NHÓM 1: 4 TAB CHÍNH HIỂN THỊ DƯỚI THANH ĐÁY (TAB BAR)
    // ----------------------------------------------------
    Home: {
      screen: Home,
      options: {
        title: 'Tổng Quan',
        tabBarIcon: ({ color, size }) => <House size={size} color={color} />,
      },
    },

    Budget: {
      screen: BudgetScreen,
      options: {
        title: 'Ngân Sách',
        tabBarIcon: ({ color, size }) => <PieChart size={size} color={color} />,
        tabBarItemStyle: { marginRight: 35 }, // Dạt sang trái để nhường chỗ nút Add
      },
    },

    Transactions: {
      screen: TransactionsScreen,
      options: {
        title: 'Giao dịch',
        tabBarIcon: ({ color, size }) => <ReceiptText size={size} color={color} />,
        tabBarItemStyle: { marginLeft: 35 }, // Dạt sang phải để nhường chỗ nút Add
      },
    },

    Settings: {
      screen: SettingsScreen,
      options: {
        title: 'Cài đặt',
        tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
      },
    },

    // ----------------------------------------------------
    // NHÓM 2: CÁC MÀN HÌNH TẠO MỚI (Mở khi ấn nút Add, ẩn khỏi Tab Bar)
    // ----------------------------------------------------
    Expense: {
      screen: ExpenseScreen,
      options: {
        tabBarItemStyle: { display: 'none' }, // Ẩn nút tab
        tabBarStyle: { display: 'none' },     // Ẩn thanh tab bar khi mở màn hình này
      },
    },
  },
});

// ========================================================
// 3. KHỞI TẠO NAVIGATION & ĐIỀU KHIỂN CHUYỂN TRANG
// ========================================================
const Navigation = createStaticNavigation(RootTabs);

// Biến điều khiển chuyển trang (Remote) xuất ra cho Add.jsx sử dụng
export const navigationRef = createNavigationContainerRef();

export default function BottomTabNavigator() {
  return (
    <View style={styles.container}>
      <Navigation ref={navigationRef} />
      {/* Nút Add nổi ở giữa thanh Tab Bar */}
      <Add />
    </View>
  );
}

// ========================================================
// 4. STYLESHEET (Đã dọn sạch code thừa)
// ========================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
