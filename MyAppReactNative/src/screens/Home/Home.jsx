import { StyleSheet, Text, View, ScrollView } from 'react-native'; // 👈 Thêm ScrollView vào đây
import { colors } from '../../theme/color.jsx';
import HeaderBalance from './components/HeaderBalance.jsx';
import SpendFrequency from './components/SpendFrequency.jsx';
import RecentTransactions from './components/RecentTransactions.jsx';



export default function Home() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content} // Đệm đáy 100px để không bị thanh Footer che
    >
      <HeaderBalance />
      <SpendFrequency />
      <RecentTransactions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,

    // Chừa vùng riêng phía dưới cho thanh Bottom.
    marginBottom: 100,
  },

  content: {
    // Khoảng cách giữa nội dung và mép vùng cuộn.
    padding: 16,
  },
});