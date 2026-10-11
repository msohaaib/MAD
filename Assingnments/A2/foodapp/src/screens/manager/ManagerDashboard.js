import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import useApi from '../../hooks/useApi';
import { menuApi, orderApi, reservationApi } from '../../api/client';
import { useAuth } from '../../context/AuthContext';
import { colors, fonts } from '../../theme';

export default function ManagerDashboard() {
  const { user } = useAuth();
  const menu = useApi(() => menuApi.list(), []);
  const orders = useApi(() => orderApi.all(), []);
  const bookings = useApi(() => reservationApi.all(), []);

  const loading = (menu.loading && !menu.data) || (orders.loading && !orders.data) || (bookings.loading && !bookings.data);
  const error = menu.error || orders.error || bookings.error;

  if (loading) return <Screen><LoadingState label="Opening the pass…" /></Screen>;
  if (error && !menu.data) {
    return (
      <Screen>
        <ErrorState
          message={error}
          onRetry={() => {
            menu.refetch();
            orders.refetch();
            bookings.refetch();
          }}
        />
      </Screen>
    );
  }

  const liveOrders = (orders.data || []).filter((order) => ['Pending', 'Preparing', 'Ready'].includes(order.status));
  const pendingBooks = (bookings.data || []).filter((item) => item.status === 'Pending');
  const soldOut = (menu.data || []).filter((item) => !item.available);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.eyebrow}>Service tonight</Text>
        <Text style={styles.title}>Hello, {user?.name?.split(' ')[0]}</Text>
        <Text style={styles.sub}>Changes you make here land on every customer phone after they refresh or poll.</Text>

        <View style={styles.grid}>
          <Card style={styles.stat}>
            <Text style={styles.num}>{liveOrders.length}</Text>
            <Text style={styles.label}>Live orders</Text>
          </Card>
          <Card style={styles.stat}>
            <Text style={styles.num}>{pendingBooks.length}</Text>
            <Text style={styles.label}>Bookings to review</Text>
          </Card>
          <Card style={styles.stat}>
            <Text style={styles.num}>{(menu.data || []).length}</Text>
            <Text style={styles.label}>Menu items</Text>
          </Card>
          <Card style={styles.stat}>
            <Text style={styles.num}>{soldOut.length}</Text>
            <Text style={styles.label}>Marked unavailable</Text>
          </Card>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  eyebrow: { color: colors.gold, fontWeight: '700', letterSpacing: 1.4, textTransform: 'uppercase' },
  title: { fontFamily: fonts.serif, fontSize: 32, color: colors.text, marginTop: 4 },
  sub: { color: colors.muted, marginBottom: 20, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  stat: { width: '48%', alignItems: 'flex-start' },
  num: { fontSize: 32, fontWeight: '800', color: colors.primary },
  label: { color: colors.muted, marginTop: 4 },
});
