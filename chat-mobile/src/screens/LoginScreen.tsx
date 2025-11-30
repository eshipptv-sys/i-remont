import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigation = useNavigation();

  const submit = async () => {
    setLoading(true);
    await login(phone);
    setLoading(false);
    navigation.navigate('VerifyCode' as never, { phone } as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Введите номер телефона</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Например, +10000000001"
        keyboardType="phone-pad"
        style={styles.input}
      />
      <Button title={loading ? 'Отправка...' : 'Продолжить'} onPress={submit} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 12,
    borderRadius: 8
  }
});
