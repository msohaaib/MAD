import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { AppContext } from '../context/AppContext';

export default function TableScreen({ route }) {
  const { tables, setTables } = useContext(AppContext);
  const role = route.params?.role || 'guest';

  const [tableNo, setTableNo] = useState('');
  const [seats, setSeats] = useState('');

  // Add a new table
  const addTable = () => {
    if (!tableNo.trim() || !seats.trim()) {
      Alert.alert('Error', 'Please enter table number and seats');
      return;
    }

    const tableNumberExists = tables.some(t => t.id === Number(tableNo));
    if (tableNumberExists) {
      Alert.alert('Error', 'Table number already exists');
      return;
    }

    const newTable = {
      id: Number(tableNo),
      seats: Number(seats),
      available: true,
    };

    setTables([...tables, newTable]);
    setTableNo('');
    setSeats('');
  };

  // Delete a table
  const deleteTable = id => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this table?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          onPress: () => setTables(tables.filter(t => t.id !== id)),
        },
      ],
    );
  };

  // Toggle availability (free/booked)
  const toggleAvailability = id => {
    setTables(
      tables.map(t => (t.id === id ? { ...t, available: !t.available } : t)),
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemText}>
        Table {item.id} | Seats: {item.seats} |{' '}
        {item.available ? 'Free' : 'Booked'}
      </Text>

      {role === 'admin' && (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button title="Toggle" onPress={() => toggleAvailability(item.id)} />
          <Button title="Delete" onPress={() => deleteTable(item.id)} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tables</Text>

      {tables.length === 0 && <Text>No tables added</Text>}

      <FlatList
        data={tables}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />

      {role === 'admin' && (
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Table Number"
            keyboardType="numeric"
            value={tableNo}
            onChangeText={setTableNo}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Seats"
            keyboardType="numeric"
            value={seats}
            onChangeText={setSeats}
          />
          <Button title="Add Table" onPress={addTable} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },
  input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
  card: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: { fontSize: 16 },
  addContainer: { marginTop: 20 },
});
