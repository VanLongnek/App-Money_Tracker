import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/color.jsx';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      
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