import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Button from '../../components/Button';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import Card from '../../components/Card';
import useApi from '../../hooks/useApi';
import { menuApi } from '../../api/client';
import { useCart } from '../../context/CartContext';
import { money } from '../../utils/format';
import { colors, fonts } from '../../theme';

export default function ItemDetailScreen({ route }) {
  const { addItem } = useCart();
  const { data: item, loading, error, refetch } = useApi(() => menuApi.get(route.params.id), [route.params.id]);

  if (loading) return <Screen><LoadingState /></Screen>;
  if (error || !item) return <Screen><ErrorState message={error || 'Item not found'} onRetry={refetch} /></Screen>;

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.emoji}>{item.image}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{money(item.price)}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        {item.allergens?.length ? (
          <Card style={styles.note}>
            <Text style={styles.noteTitle}>Allergens</Text>
            <Text style={styles.noteBody}>{item.allergens.join(', ')}</Text>
          </Card>
        ) : null}
        <Button
          title={item.available ? 'Add to order' : 'Currently unavailable'}
          disabled={!item.available}
          onPress={() => addItem(item)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 24, gap: 10 },
  emoji: { fontSize: 64, textAlign: 'center', marginVertical: 12 },
  category: { color: colors.gold, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.2 },
  name: { fontFamily: fonts.serif, fontSize: 32, color: colors.text },
  price: { fontSize: 22, color: colors.primary, fontWeight: '700' },
  desc: { color: colors.muted, lineHeight: 22, marginBottom: 8 },
  note: { marginBottom: 8 },
  noteTitle: { fontWeight: '700', color: colors.text, marginBottom: 4 },
  noteBody: { color: colors.muted },
});
