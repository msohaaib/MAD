import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailsScreen = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:3000/product/1');
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    const existing = await AsyncStorage.getItem('cart');
    let cart = existing ? JSON.parse(existing) : [];

    cart.push(product);

    await AsyncStorage.setItem('cart', JSON.stringify(cart));

    alert('Added to cart');
  };

  if (!product) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <TouchableOpacity style={styles.btn} onPress={addToCart}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 300 },
  details: { padding: 15 },
  title: { fontSize: 22, fontWeight: 'bold' },
  price: { fontSize: 18, color: 'green', marginVertical: 10 },
  desc: { fontSize: 16 },
  btn: {
    backgroundColor: 'blue',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
export default ProductDetailsScreen;
