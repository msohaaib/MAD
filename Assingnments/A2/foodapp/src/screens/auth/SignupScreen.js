import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text } from 'react-native';
import Screen from '../../components/Screen';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validateName, validatePassword } from '../../utils/validation';
import { colors, fonts } from '../../theme';

export default function SignupScreen({ navigation }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    const next = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(next);
    setFormError('');
    if (next.name || next.email || next.password) return;

    setLoading(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password, phone });
    } catch (error) {
      setFormError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.wrap}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.sub}>Join Bistro Nova as a guest. Managers are added from the floor.</Text>

        <Input label="Full name" value={name} onChangeText={setName} error={errors.name} style={styles.field} />
        <Input
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          style={styles.field}
        />
        <Input label="Phone (optional)" value={phone} onChangeText={setPhone} style={styles.field} />
        <Input
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          style={styles.field}
        />

        {formError ? <Text style={styles.formError}>{formError}</Text> : null}

        <Button title="Sign up" onPress={onSubmit} loading={loading} style={styles.cta} />
        <Button title="I already have an account" variant="ghost" onPress={() => navigation.goBack()} />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontFamily: fonts.serif, fontSize: 34, color: colors.text, marginBottom: 8 },
  sub: { color: colors.muted, marginBottom: 24, lineHeight: 22 },
  field: { marginBottom: 14 },
  cta: { marginTop: 8, marginBottom: 10 },
  formError: { color: colors.danger, marginBottom: 10 },
});
