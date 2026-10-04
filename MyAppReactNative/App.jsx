import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {colors} from './src/theme/color.jsx';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from './src/screens/DashboardScreen.jsx';
import SettingsScreen from './src/screens/SettingsScreen.jsx';


// Khai báo các màn hình và cách hiển thị chúng.
const RootStack = createNativeStackNavigator({
  initialRouteName: 'Dashboard',

  screenOptions: {
    contentStyle: {
      backgroundColor: colors.background,
    },
    headerStyle: {
      backgroundColor: colors.surface,
    },
    headerTintColor: colors.text,
  },

  screens: {
    Dashboard: {
      screen: DashboardScreen,
      options: {title: 'Tổng quan'},
    },
    Settings: {
      screen: SettingsScreen,
      options: {title: 'Cài đặt'},
    },
  },
});

// Tạo component điều hướng từ cấu hình trên.
const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
