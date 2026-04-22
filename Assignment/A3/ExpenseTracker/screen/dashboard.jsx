import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:3000/transactions');
      console.log('Fetched transactions:', res.data);
      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Reduce calculation
  const summary = transactions.reduce(
    (acc, item) => {
      if (item.type === 'income') {
        acc.income += Number(item.amount);
      } else {
        acc.expense += Number(item.amount);
      }
      acc.balance = acc.income - acc.expense;
      return acc;
    },
    { income: 0, expense: 0, balance: 0 },
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.category}</Text>
      <Text>{item.date}</Text>
      <Text style={{ color: item.type === 'income' ? 'green' : 'red' }}>
        {item.type === 'income' ? '+' : '-'} Rs {item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Summary */}
      <View style={styles.summary}>
        <Text style={styles.balance}>Balance: Rs {summary.balance}</Text>
        <Text>Income: Rs {summary.income}</Text>
        <Text>Expenses: Rs {summary.expense}</Text>
      </View>

      {/* List */}
      <FlatList
        data={transactions}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  summary: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  balance: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});
