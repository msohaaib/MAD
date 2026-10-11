import { Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
import useApi from '../../hooks/useApi';
import { reservationApi } from '../../api/client';
import { colors, fonts } from '../../theme';

export default function ManageReservationsScreen() {
  const { data, loading, error, refetch } = useApi(() => reservationApi.all(), []);

  async function update(item, status) {
    try {
      await reservationApi.update(item._id, status);
      await refetch();
    } catch (err) {
      Alert.alert('Update failed', err.message);
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
        ListHeaderComponent={<Text style={styles.title}>The book</Text>}
        ListEmptyComponent={<EmptyState title="No reservations" subtitle="New requests show up here for accept or decline." />}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.name}>{item.user?.name || 'Guest'}</Text>
              <StatusBadge status={item.status} />
            </View>
            <Text style={styles.meta}>
              Table {item.table?.number} · {item.date} {item.time} · {item.partySize} guests
            </Text>
            {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
            {item.status === 'Pending' ? (
              <View style={styles.actions}>
                <Button title="Accept" onPress={() => update(item, 'Accepted')} style={styles.btn} />
                <Button title="Decline" variant="ghost" onPress={() => update(item, 'Declined')} style={styles.btn} />
              </View>
            ) : null}
          </Card>
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
  name: { fontWeight: '800', color: colors.text, fontSize: 16 },
  meta: { color: colors.muted },
  notes: { color: colors.text },
  actions: { flexDirection: 'row', gap: 8 },
  btn: { flex: 1 },
});
