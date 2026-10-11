import { useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Card from '../../components/Card';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import { menuApi } from '../../api/client';
import useApi from '../../hooks/useApi';
import { useCart } from '../../context/CartContext';
import { money } from '../../utils/format';
import { colors, fonts } from '../../theme';

const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

export default function MenuScreen({ navigation }) {
  const { addItem } = useCart();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const { data, loading, error, refetch } = useApi(() => menuApi.list(), []);

  const items = useMemo(() => {
    const list = data || [];
    return list.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesSearch = item.name.toLowerCase().includes(search.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, category, search]);

  if (loading && !data) return <Screen><LoadingState label="Setting the table…" /></Screen>;
  if (error && !data) return <Screen><ErrorState message={error} onRetry={refetch} /></Screen>;

  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <Text style={styles.eyebrow}>Tonight's kitchen</Text>
            <Text style={styles.title}>Menu</Text>
            <Input placeholder="Search dishes" value={search} onChangeText={setSearch} style={styles.search} />
            <View style={styles.chips}>
              {CATEGORIES.map((name) => (
                <Pressable
                  key={name}
                  onPress={() => setCategory(name)}
                  style={[styles.chip, category === name && styles.chipOn]}
                >
                  <Text style={[styles.chipText, category === name && styles.chipTextOn]}>{name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        }
        ListEmptyComponent={<EmptyState title="No dishes match" subtitle="Try another category or search." />}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('ItemDetail', { id: item._id })}>
            <Card style={styles.card}>
              <Text style={styles.emoji}>{item.image}</Text>
              <View style={styles.body}>
                <View style={styles.row}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{money(item.price)}</Text>
                </View>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
                <View style={styles.row}>
                  <Text style={[styles.avail, !item.available && styles.sold]}>
                    {item.available ? item.category : 'Unavailable'}
                  </Text>
                  <Pressable
                    disabled={!item.available}
                    onPress={() => addItem(item)}
                    style={[styles.add, !item.available && styles.addOff]}
                  >
                    <Text style={styles.addText}>Add</Text>
                  </Pressable>
                </View>
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
  eyebrow: { color: colors.gold, fontWeight: '700', letterSpacing: 1.4, textTransform: 'uppercase' },
  title: { fontFamily: fonts.serif, fontSize: 34, color: colors.text, marginBottom: 12 },
  search: { marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontWeight: '600' },
  chipTextOn: { color: '#fff' },
  card: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  emoji: { fontSize: 34, width: 48, textAlign: 'center', marginTop: 4 },
  body: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  name: { flex: 1, fontWeight: '700', fontSize: 16, color: colors.text },
  price: { color: colors.primary, fontWeight: '700' },
  desc: { color: colors.muted, marginVertical: 6, lineHeight: 20 },
  avail: { color: colors.success, fontWeight: '600' },
  sold: { color: colors.danger },
  add: { backgroundColor: colors.primary, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 6 },
  addOff: { backgroundColor: colors.muted },
  addText: { color: '#fff', fontWeight: '700' },
});
