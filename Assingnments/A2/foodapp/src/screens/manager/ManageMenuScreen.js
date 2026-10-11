import { Alert, FlatList, Pressable, RefreshControl, StyleSheet, Switch, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import useApi from '../../hooks/useApi';
import { menuApi } from '../../api/client';
import { money } from '../../utils/format';
import { colors, fonts } from '../../theme';

export default function ManageMenuScreen({ navigation }) {
  const { data, loading, error, refetch } = useApi(() => menuApi.list(), []);

  async function toggleAvailable(item) {
    try {
      await menuApi.update(item._id, { ...item, available: !item.available });
      await refetch();
    } catch (err) {
      Alert.alert('Update failed', err.message);
    }
  }

  async function removeItem(item) {
    Alert.alert('Delete dish', `Remove ${item.name} from the menu?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await menuApi.remove(item._id);
            await refetch();
          } catch (err) {
            Alert.alert('Delete failed', err.message);
          }
        },
      },
    ]);
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
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Menu board</Text>
            <Button title="Add dish" onPress={() => navigation.navigate('MenuForm')} />
          </View>
        }
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.name}>{item.image}  {item.name}</Text>
              <Text style={styles.price}>{money(item.price)}</Text>
            </View>
            <Text style={styles.meta}>{item.category}</Text>
            <View style={styles.row}>
              <View style={styles.avail}>
                <Text style={styles.meta}>{item.available ? 'Available' : 'Sold out'}</Text>
                <Switch value={item.available} onValueChange={() => toggleAvailable(item)} />
              </View>
              <View style={styles.actions}>
                <Pressable onPress={() => navigation.navigate('MenuForm', { item })}>
                  <Text style={styles.link}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => removeItem(item)}>
                  <Text style={styles.danger}>Delete</Text>
                </Pressable>
              </View>
            </View>
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
  card: { marginBottom: 12, gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { flex: 1, fontWeight: '800', color: colors.text },
  price: { color: colors.primary, fontWeight: '800' },
  meta: { color: colors.muted },
  avail: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actions: { flexDirection: 'row', gap: 14 },
  link: { color: colors.info, fontWeight: '700' },
  danger: { color: colors.danger, fontWeight: '700' },
});
