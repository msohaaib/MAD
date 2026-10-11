import { StyleSheet, Text, View } from 'react-native';
import { STATUS_COLORS } from '../utils/format';

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#7A6A5E';
  return (
    <View style={[styles.badge, { backgroundColor: `${color}22`, borderColor: color }]}>
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: { fontWeight: '700', fontSize: 12 },
});
