import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {colors} from './src/theme/color.jsx';
function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7F5" />
      <Text style={styles.title}>Máy ảo hoạt động bình thường</Text>
      <Text style={styles.description}>React Native đã tải được App.jsx</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  description: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default App;
