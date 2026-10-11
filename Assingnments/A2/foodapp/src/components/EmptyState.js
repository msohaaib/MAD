import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function EmptyState({ title, subtitle }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: 28 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, textAlign: 'center' },
  subtitle: { color: colors.muted, marginTop: 8, textAlign: 'center', lineHeight: 20 },
});
