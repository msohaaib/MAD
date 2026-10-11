import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import useApi from '../../hooks/useApi';
import { reservationApi, tableApi } from '../../api/client';
import { validateBookingDate, validatePartySize, validateTime } from '../../utils/validation';
import { colors, fonts } from '../../theme';

export default function BookTableScreen({ navigation }) {
  const { data: tables, loading, error, refetch } = useApi(() => tableApi.list(), []);
  const [tableId, setTableId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:00');
  const [partySize, setPartySize] = useState('2');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const selected = useMemo(
    () => (tables || []).find((table) => table._id === tableId),
    [tables, tableId]
  );

  async function onSubmit() {
    const next = {
      table: tableId ? '' : 'Choose a table',
      date: validateBookingDate(date),
      time: validateTime(time),
      partySize: validatePartySize(partySize, selected?.seats),
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setSaving(true);
    try {
      await reservationApi.create({
        table: tableId,
        date,
        time,
        partySize: Number(partySize),
        notes,
      });
      Alert.alert('Request sent', 'The manager will accept or decline this booking.');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Booking failed', err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading && !tables) return <Screen><LoadingState /></Screen>;
  if (error && !tables) return <Screen><ErrorState message={error} onRetry={refetch} /></Screen>;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>Book a table</Text>
        <Text style={styles.sub}>The server checks seats and clashes before it saves anything.</Text>

        <View style={styles.grid}>
          {(tables || []).map((table) => (
            <Pressable
              key={table._id}
              onPress={() => setTableId(table._id)}
              style={[styles.table, tableId === table._id && styles.tableOn]}
            >
              <Text style={[styles.tableNo, tableId === table._id && styles.onText]}>T{table.number}</Text>
              <Text style={[styles.tableMeta, tableId === table._id && styles.onText]}>
                {table.seats} seats · {table.location}
              </Text>
            </Pressable>
          ))}
        </View>
        {errors.table ? <Text style={styles.error}>{errors.table}</Text> : null}

        <Input label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} error={errors.date} style={styles.field} />
        <Input label="Time (HH:MM)" value={time} onChangeText={setTime} error={errors.time} style={styles.field} />
        <Input
          label="Party size"
          keyboardType="number-pad"
          value={partySize}
          onChangeText={setPartySize}
          error={errors.partySize}
          style={styles.field}
        />
        <Input label="Notes" value={notes} onChangeText={setNotes} placeholder="Birthday, high chair…" style={styles.field} />
        <Button title="Request booking" onPress={onSubmit} loading={saving} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  title: { fontFamily: fonts.serif, fontSize: 32, color: colors.text },
  sub: { color: colors.muted, marginBottom: 16, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 8 },
  table: {
    width: '48%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
  },
  tableOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  tableNo: { fontWeight: '800', color: colors.text, fontSize: 16 },
  tableMeta: { color: colors.muted, marginTop: 4 },
  onText: { color: '#fff' },
  field: { marginBottom: 12 },
  error: { color: colors.danger, marginBottom: 8 },
});
