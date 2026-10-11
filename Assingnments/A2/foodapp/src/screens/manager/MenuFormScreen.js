import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { menuApi } from '../../api/client';
import { validateName, validatePrice } from '../../utils/validation';
import { colors, fonts } from '../../theme';

const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Drinks'];

export default function MenuFormScreen({ route, navigation }) {
  const existing = route.params?.item;
  const [name, setName] = useState(existing?.name || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [price, setPrice] = useState(existing ? String(existing.price) : '');
  const [category, setCategory] = useState(existing?.category || 'Mains');
  const [image, setImage] = useState(existing?.image || '🍽️');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    const next = {
      name: validateName(name),
      price: validatePrice(price),
    };
    setErrors(next);
    if (next.name || next.price) return;

    const payload = {
      name: name.trim(),
      description,
      price: Number(price),
      category,
      image,
      available: existing?.available ?? true,
    };

    setLoading(true);
    try {
      if (existing) {
        await menuApi.update(existing._id, payload);
      } else {
        await menuApi.create(payload);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Could not save dish', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.wrap}>
        <Text style={styles.title}>{existing ? 'Edit dish' : 'Add dish'}</Text>
        <Input label="Name" value={name} onChangeText={setName} error={errors.name} style={styles.field} />
        <Input label="Description" value={description} onChangeText={setDescription} multiline style={styles.field} />
        <Input label="Price" keyboardType="decimal-pad" value={price} onChangeText={setPrice} error={errors.price} style={styles.field} />
        <Input label="Icon / emoji" value={image} onChangeText={setImage} style={styles.field} />
        <Text style={styles.label}>Category</Text>
        <View style={styles.chips}>
          {CATEGORIES.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[styles.chip, category === item && styles.chipOn]}
            >
              <Text style={[styles.chipText, category === item && styles.chipTextOn]}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <Button title={existing ? 'Save changes' : 'Create dish'} onPress={onSubmit} loading={loading} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  title: { fontFamily: fonts.serif, fontSize: 32, color: colors.text, marginBottom: 16 },
  field: { marginBottom: 12 },
  label: { fontWeight: '700', color: colors.text, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontWeight: '700' },
  chipTextOn: { color: '#fff' },
});
