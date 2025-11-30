import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function VerifyCodeScreen() {
  const route = useRoute<any>();
  const phone = route.params?.phone;
  const [code, setCode] = useState('0000');
  const [loading, setLoading] = useState(false);
  const { confirm } = useAuth();

  const submit = async () => {
    setLoading(true);
    await confirm(phone, code);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите код, отправленный на {phone}</Text>
      <TextInput value={code} onChangeText={setCode} style={styles.input} keyboardType="number-pad" />
      <Button title={loading ? 'Проверяем...' : 'Подтвердить'} onPress={submit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8 }
});
