import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/color.jsx';
export default function BudgetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Màn hình Ngân sách</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
    fontSize: 16,
  },
});
