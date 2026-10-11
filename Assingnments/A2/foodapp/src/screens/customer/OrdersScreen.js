import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
import useApi from '../../hooks/useApi';
import { orderApi } from '../../api/client';
import { money, prettyDate } from '../../utils/format';
import { colors, fonts } from '../../theme';

export default function OrdersScreen({ navigation }) {
  const { data, loading, error, refetch } = useApi(() => orderApi.mine(), []);

  if (loading && !data) return <Screen><LoadingState label="Finding your tickets…" /></Screen>;
  if (error && !data) return <Screen><ErrorState message={error} onRetry={refetch} /></Screen>;

  return (
    <Screen>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.title}>My orders</Text>}
        ListEmptyComponent={<EmptyState title="No orders yet" subtitle="Place one from the cart and it will appear here on every phone." />}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('OrderTracking', { orderId: item._id })}>
            <Card style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.id}>#{item._id.slice(-6).toUpperCase()}</Text>
                <StatusBadge status={item.status} />
              </View>
              <Text style={styles.items}>
                {item.items.map((line) => `${line.quantity}× ${line.name}`).join(', ')}
              </Text>
              <View style={styles.row}>
                <Text style={styles.meta}>{prettyDate(item.createdAt)}</Text>
                <Text style={styles.total}>{money(item.total)}</Text>
              </View>
            </Card>
          </Pressable>
        )}
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
  items: { color: colors.muted, lineHeight: 20 },
  meta: { color: colors.muted, fontSize: 12 },
  total: { fontWeight: '800', color: colors.primary },
});
