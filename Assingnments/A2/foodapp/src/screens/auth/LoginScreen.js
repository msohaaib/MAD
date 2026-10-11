import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validation';
import { colors, fonts } from '../../theme';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    const next = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(next);
    setFormError('');
    if (next.email || next.password) return;

    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrap}>
        <Text style={styles.eyebrow}>Bistro Nova</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.sub}>Sign in to order, book a table, or run the floor.</Text>

        <Input
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          style={styles.field}
        />
        <Input
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          style={styles.field}
        />

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <Button title="Sign in" onPress={onSubmit} loading={loading} style={styles.cta} />
        <Button title="Create an account" variant="ghost" onPress={() => navigation.navigate('Signup')} />

        <View style={styles.hintBox}>
          <Text style={styles.hintTitle}>Seeded logins</Text>
          <Text style={styles.hint}>Customer: customer@bistronova.com / Customer123</Text>
          <Text style={styles.hint}>Manager: manager@bistronova.com / Manager123</Text>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, justifyContent: 'center' },
  eyebrow: {
    color: colors.gold,
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
  },
  title: { fontFamily: fonts.serif, fontSize: 36, color: colors.text, marginBottom: 8 },
  sub: { color: colors.muted, marginBottom: 28, lineHeight: 22 },
  field: { marginBottom: 14 },
  cta: { marginTop: 8, marginBottom: 10 },
  formError: { color: colors.danger, marginBottom: 10 },
  hintBox: {
    marginTop: 28,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#efe4d2',
  },
  hintTitle: { fontWeight: '700', color: colors.text, marginBottom: 6 },
  hint: { color: colors.muted, fontSize: 13, lineHeight: 20 },
});
