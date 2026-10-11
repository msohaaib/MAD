import { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import StatusBadge from '../../components/StatusBadge';
import useApi from '../../hooks/useApi';
import { orderApi } from '../../api/client';
import { money, prettyDate } from '../../utils/format';
import { colors, fonts } from '../../theme';

const STEPS = ['Pending', 'Preparing', 'Ready', 'Served'];

export default function OrderTrackingScreen({ route }) {
  const { data, loading, error, refetch } = useApi(() => orderApi.mine(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      refetch();
    }, 10000);
    return () => clearInterval(timer);
  }, [refetch]);

  const order = useMemo(() => {
    const list = data || [];
    if (route.params?.orderId) {
      return list.find((item) => item._id === route.params.orderId) || list[0];
    }
    return list[0];
  }, [data, route.params?.orderId]);

  if (loading && !data) return <Screen><LoadingState label="Tracking your order…" /></Screen>;
  if (error && !data) return <Screen><ErrorState message={error} onRetry={refetch} /></Screen>;
  if (!order) {
    return (
      <Screen>
        <Text style={styles.empty}>No live order to track. Place one from the cart.</Text>
      </Screen>
    );
  }

  const activeIndex = STEPS.indexOf(order.status);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Order tracking</Text>
        <Text style={styles.sub}>Updates every 10 seconds from the kitchen.</Text>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.id}>#{order._id.slice(-6).toUpperCase()}</Text>
            <StatusBadge status={order.status} />
          </View>
          <Text style={styles.meta}>{prettyDate(order.createdAt)}</Text>
          {STEPS.map((step, index) => {
            const done = order.status === 'Cancelled' ? false : index <= activeIndex;
            return (
              <View key={step} style={styles.step}>
                <View style={[styles.dot, done && styles.dotOn]} />
                <Text style={[styles.stepText, done && styles.stepOn]}>{step}</Text>
              </View>
            );
          })}
        </Card>

        <Card>
          {order.items.map((line) => (
            <View key={`${line.menuItem}-${line.name}`} style={styles.line}>
              <Text style={styles.lineName}>{line.quantity}× {line.name}</Text>
              <Text style={styles.linePrice}>{money(line.price * line.quantity)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Kitchen total</Text>
            <Text style={styles.total}>{money(order.total)}</Text>
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  title: { fontFamily: fonts.serif, fontSize: 32, color: colors.text },
  sub: { color: colors.muted, marginBottom: 16 },
  empty: { padding: 24, color: colors.muted },
  card: { marginBottom: 16, gap: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  id: { fontWeight: '800', color: colors.text },
  meta: { color: colors.muted, fontSize: 12 },
  step: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.border },
  dotOn: { backgroundColor: colors.primary },
  stepText: { color: colors.muted, fontWeight: '600' },
  stepOn: { color: colors.text },
  line: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  lineName: { color: colors.text, flex: 1 },
  linePrice: { color: colors.primary, fontWeight: '700' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border },
  totalLabel: { fontWeight: '700', color: colors.text },
  total: { fontWeight: '800', color: colors.primary, fontSize: 18 },
});
