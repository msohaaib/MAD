import { StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { BASE_URL } from '../../api/client';
import { colors, fonts } from '../../theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { clear } = useCart();

  return (
    <Screen>
      <View style={styles.wrap}>
        <Text style={styles.title}>Profile</Text>
        <Card style={styles.card}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.meta}>{user?.email}</Text>
          <Text style={styles.role}>{user?.role}</Text>
        </Card>
        <Card>
          <Text style={styles.label}>API host</Text>
          <Text style={styles.meta}>{BASE_URL}</Text>
        </Card>
        <Button
          title="Log out"
          variant="danger"
          onPress={async () => {
            clear();
            await logout();
          }}
          style={styles.btn}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, gap: 14 },
  title: { fontFamily: fonts.serif, fontSize: 32, color: colors.text },
  card: { gap: 4 },
  name: { fontSize: 22, fontWeight: '800', color: colors.text },
  meta: { color: colors.muted },
  role: { color: colors.gold, fontWeight: '700', textTransform: 'capitalize', marginTop: 6 },
  label: { fontWeight: '700', color: colors.text, marginBottom: 4 },
  btn: { marginTop: 8 },
});
