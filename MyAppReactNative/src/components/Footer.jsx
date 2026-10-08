import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, ReceiptText, PieChart, Settings } from 'lucide-react-native';
import { colors } from '../theme/color.jsx';

// Import các màn hình
import DashboardScreen from '../screens/DashboardScreen.jsx';
import TransactionsScreen from '../screens/TransactionsScreen.jsx';
import SettingsScreen from '../screens/SettingsScreen.jsx';



// Khởi tạo bộ điều hướng thanh tab dưới đáy (Bottom Tab Navigator) bằng cấu hình tĩnh (Static API)
const RootTabs = createBottomTabNavigator({
  // 1. CẤU HÌNH ĐIỀU HƯỚNG CHUNG
  initialRouteName: 'Home', // Màn hình mặc định hiển thị đầu tiên khi mở app (ở đây là tab 'Home')
  backBehavior: 'history',  // Hành vi khi bấm nút Back (quay lại màn hình tab đã mở trước đó theo lịch sử)
  // 2. CẤU HÌNH GIAO DIỆN CHUNG (Áp dụng cho TẤT CẢ các tab)
  screenOptions: {
    // Tùy biến kiểu dáng cho toàn bộ phần thân màn hình
    sceneStyle: {
      backgroundColor: colors.background, // Màu nền nội dung của màn hình (màu đen '#000000')
    },
    // Tùy biến kiểu dáng cho thanh Bottom Tab Bar dưới đáy
    tabBarStyle: {
      backgroundColor: '#1E1E1E', // Màu nền của thanh tab bar (xám đen đậm)
      borderTopColor: '#333333',   // Màu đường viền mảnh ngăn cách phía trên tab bar
      height: 60,                  // Chiều cao cố định của thanh tab bar (60 pixel)
      paddingBottom: 4,            // Khoảng đệm bên dưới tab bar (để chữ không chạm mép dưới)
      paddingTop: 4,               // Khoảng đệm bên trên tab bar (tạo khoảng cách với icon)
    },
    // Kiểu dáng cho chữ nhãn (Label) bên dưới icon
    tabBarLabelStyle: {
      fontSize: 11, // Cỡ chữ của tên tab (11 pixel)
    },
    // Màu sắc trạng thái của các Tab
    tabBarActiveTintColor: colors.textMuted, // Màu của icon và chữ khi ĐANG ĐƯỢC CHỌN (màu cam '#FFA500')
    tabBarInactiveTintColor: '#888888',     // Màu của icon và chữ khi KHÔNG ĐƯỢC CHỌN (màu xám nhạt)
    // Tùy biến thanh Header (tiêu đề trên cùng của màn hình)
    headerStyle: {
      backgroundColor: '#1E1E1E', // Màu nền của thanh Header trên cùng
    },
    headerTintColor: colors.text, // Màu của chữ tiêu đề và nút back trên Header (màu trắng)
  },
  // 3. DANH SÁCH CÁC MÀN HÌNH TAB CỤ THỂ
  screens: {
    // --- TAB 1: TỔNG QUAN ---
    Home: {
      screen: DashboardScreen, // Component màn hình sẽ render khi vào tab này
      options: {
        title: 'Tổng quan',   // Tiêu đề hiển thị trên Header và nhãn dưới tab bar
        // Hàm render Icon cho tab: nhận vào `color` (màu active/inactive) và `size` chuẩn từ thư viện
        tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
      },
    },
    // --- TAB 2: GIAO DỊCH ---
    Transactions: {
      screen: TransactionsScreen, // Component màn hình danh sách giao dịch
      options: {
        title: 'Giao dịch',       // Tiêu đề hiển thị
        tabBarIcon: ({ color, size }) => <ReceiptText size={size} color={color} />,
      },
    },
    // --- TAB 3: CÀI ĐẶT ---
    Settings: {
      screen: SettingsScreen,     // Component màn hình cài đặt
      options: {
        title: 'Cài đặt',         // Tiêu đề hiển thị
        tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
      },
    },
  },
});


// Tạo đối tượng Navigation từ cấu hình RootTabs
const Navigation = createStaticNavigation(RootTabs);

// Xuất ra component Footer (hoặc FooterNavigation)
export default function Footer() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  reportsScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  reportsTitle: {
    color: colors.text,
    fontSize: 20,
  },
});
