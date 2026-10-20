import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/color.jsx';
import HeaderBalance from './components/HeaderBalance.jsx';
import SpendFrequency from './components/SpendFrequency.jsx';

export default function Home() {
  return (
    <View style={styles.container}>
      <HeaderBalance />
      <SpendFrequency />

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