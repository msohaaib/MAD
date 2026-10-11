import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
import useApi from '../../hooks/useApi';
import { orderApi } from '../../api/client';
import { NEXT_ORDER_STATUS, money, prettyDate } from '../../utils/format';
import { colors, fonts } from '../../theme';

export default function ManageOrdersScreen() {
  const { data, loading, error, refetch } = useApi(() => orderApi.all(), []);

  async function changeStatus(order, status) {
    try {
      await orderApi.updateStatus(order._id, status);
      await refetch();
    } catch (err) {
      Alert.alert('Status not changed', err.message);
    }
  }

  if (loading && !data) return <Screen><LoadingState /></Screen>;
  if (error && !data) return <Screen><ErrorState message={error} onRetry={refetch} /></Screen>;

  return (
    <Screen>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.title}>Kitchen tickets</Text>}
        ListEmptyComponent={<EmptyState title="No orders" subtitle="Customer tickets will land here as soon as they are placed." />}
        renderItem={({ item }) => {
          const next = NEXT_ORDER_STATUS[item.status];
          return (
            <Card style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.id}>#{item._id.slice(-6).toUpperCase()}</Text>
                <StatusBadge status={item.status} />
              </View>
              <Text style={styles.meta}>{item.user?.name || 'Guest'} · {prettyDate(item.createdAt)}</Text>
              <Text style={styles.items}>
                {item.items.map((line) => `${line.quantity}× ${line.name}`).join(', ')}
              </Text>
              <Text style={styles.total}>{money(item.total)}</Text>
              <View style={styles.actions}>
                {next ? <Button title={`Mark ${next}`} onPress={() => changeStatus(item, next)} /> : null}
                {item.status === 'Pending' ? (
                  <Button title="Cancel" variant="ghost" onPress={() => changeStatus(item, 'Cancelled')} />
                ) : null}
              </View>
            </Card>
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20, paddingBottom: 40 },
  title: { fontFamily: fonts.serif, fontSize: 32, color: colors.text, marginBottom: 16 },
  card: { marginBottom: 12, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  id: { fontWeight: '800', color: colors.text },
  meta: { color: colors.muted },
  items: { color: colors.text, lineHeight: 20 },
  total: { fontWeight: '800', color: colors.primary },
  actions: { gap: 8 },
});
