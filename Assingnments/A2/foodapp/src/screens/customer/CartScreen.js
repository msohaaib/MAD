import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { useCart } from '../../context/CartContext';
import { money } from '../../utils/format';
import { colors, fonts } from '../../theme';

export default function CartScreen({ navigation }) {
  const { items, notes, setNotes, setQty, removeItem, subtotal, placeOrder } = useCart();
  const [loading, setLoading] = useState(false);

  async function onPlace() {
    if (items.length === 0) {
      Alert.alert('Empty cart', 'Add a dish from the menu first.');
      return;
    }
    setLoading(true);
    try {
      const order = await placeOrder();
      navigation.navigate('OrderTracking', { orderId: order._id });
    } catch (error) {
      Alert.alert('Could not place order', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Your order</Text>
        {items.length === 0 ? (
          <EmptyState title="Nothing in the cart yet" subtitle="Browse the menu and add a dish." />
        ) : (
          items.map((item) => (
            <Card key={item.menuItem} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.image}  {item.name}</Text>
                <Text style={styles.price}>{money(item.price * item.quantity)}</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.qty}>
                  <Button title="-" variant="ghost" onPress={() => setQty(item.menuItem, item.quantity - 1)} style={styles.qtyBtn} />
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <Button title="+" variant="ghost" onPress={() => setQty(item.menuItem, item.quantity + 1)} style={styles.qtyBtn} />
                </View>
                <Button title="Remove" variant="ghost" onPress={() => removeItem(item.menuItem)} />
              </View>
            </Card>
          ))
        )}

        <Input
          label="Kitchen notes"
          value={notes}
          onChangeText={setNotes}
          placeholder="No onions, extra lemon…"
          style={styles.notes}
        />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Estimated total</Text>
          <Text style={styles.total}>{money(subtotal)}</Text>
        </View>
        <Text style={styles.fine}>The kitchen prices the order from the database, not from this screen.</Text>
        <Button title="Place order" onPress={onPlace} loading={loading} disabled={items.length === 0} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  title: { fontFamily: fonts.serif, fontSize: 32, color: colors.text, marginBottom: 16 },
  card: { marginBottom: 12, gap: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { flex: 1, fontWeight: '700', color: colors.text, marginRight: 8 },
  price: { color: colors.primary, fontWeight: '700' },
  qty: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: { minHeight: 36, paddingHorizontal: 12 },
  qtyText: { fontWeight: '700', minWidth: 18, textAlign: 'center' },
  notes: { marginTop: 8, marginBottom: 16 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  totalLabel: { color: colors.muted, fontWeight: '600' },
  total: { fontSize: 22, fontWeight: '800', color: colors.text },
  fine: { color: colors.muted, marginBottom: 16, fontSize: 12 },
});
