import { StatusBar, StyleSheet, View } from 'react-native';
import Footer from './src/components/Footer.jsx';
import { colors } from './src/theme/color.jsx';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Cấu hình thanh trạng thái pin, sóng (màu đen tối) */}
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Gọi component Footer (đã chứa toàn bộ logic chuyển tab và hiển thị màn hình) */}
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
