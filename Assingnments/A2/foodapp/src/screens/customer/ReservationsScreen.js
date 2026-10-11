import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
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

export default function ReservationsScreen({ navigation }) {
  const { data, loading, error, refetch } = useApi(() => reservationApi.mine(), []);

  if (loading && !data) return <Screen><LoadingState label="Checking the book…" /></Screen>;
  if (error && !data) return <Screen><ErrorState message={error} onRetry={refetch} /></Screen>;

  return (
    <Screen>
      <FlatList
        data={data || []}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>My reservations</Text>
            <Button title="Book a table" onPress={() => navigation.navigate('BookTable')} />
          </View>
        }
        ListEmptyComponent={<EmptyState title="No bookings yet" subtitle="Reserve a table and it will sync to every device." />}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.name}>Table {item.table?.number}</Text>
              <StatusBadge status={item.status} />
            </View>
            <Text style={styles.meta}>{item.date} at {item.time} · {item.partySize} guests</Text>
            <Text style={styles.meta}>{item.table?.location} · {item.table?.seats} seats</Text>
            {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
          </Card>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 16, gap: 12 },
  title: { fontFamily: fonts.serif, fontSize: 32, color: colors.text },
  card: { marginBottom: 12, gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontWeight: '800', color: colors.text, fontSize: 16 },
  meta: { color: colors.muted },
  notes: { color: colors.text, marginTop: 4 },
});
