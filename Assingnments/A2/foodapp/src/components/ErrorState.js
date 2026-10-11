import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
import Button from './Button';

export default function ErrorState({ message, onRetry }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Could not load data</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <Button title="Retry" onPress={onRetry} style={styles.btn} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 10 },
  title: { fontSize: 20, fontWeight: '700', color: colors.text },
  message: { color: colors.muted, textAlign: 'center', lineHeight: 20 },
  btn: { minWidth: 140, marginTop: 8 },
});
