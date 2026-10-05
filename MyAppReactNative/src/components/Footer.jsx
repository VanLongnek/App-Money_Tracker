import { StyleSheet, Text, View } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LayoutDashboard, ReceiptText, PieChart, Settings } from 'lucide-react-native';
import { colors } from '../theme/color.jsx';

// Import các màn hình
import DashboardScreen from '../screens/DashboardScreen.jsx';
import TransactionsScreen from '../screens/TransactionsScreen.jsx';
import SettingsScreen from '../screens/SettingsScreen.jsx';

function ReportsScreen() {
  return (
    <View style={styles.reportsScreen}>
      <Text style={styles.reportsTitle}>Màn hình Báo cáo</Text>
    </View>
  );
}

const RootTabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  backBehavior: 'history',

  screenOptions: {
    sceneStyle: {
      backgroundColor: colors.background,
    },
    tabBarStyle: {
      backgroundColor: '#1E1E1E',
      borderTopColor: '#333333',
      height: 60,
      paddingBottom: 8,
      paddingTop: 8,
    },
    tabBarActiveTintColor: colors.textMuted,
    tabBarInactiveTintColor: '#888888',
    headerStyle: {
      backgroundColor: '#1E1E1E',
    },
    headerTintColor: colors.text,
  },

  screens: {
    Home: {
      screen: DashboardScreen,
      options: {
        title: 'Tổng quan',
        tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
      },
    },
    Transactions: {
      screen: TransactionsScreen,
      options: {
        title: 'Giao dịch',
        tabBarIcon: ({ color, size }) => <ReceiptText size={size} color={color} />,
      },
    },
    Reports: {
      screen: ReportsScreen,
      options: {
        title: 'Báo cáo',
        tabBarIcon: ({ color, size }) => <PieChart size={size} color={color} />,
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        title: 'Cài đặt',
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
