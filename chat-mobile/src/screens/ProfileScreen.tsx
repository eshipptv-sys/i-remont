import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';

export default function ProfileScreen() {
  const { user, refreshProfile, logout } = useAuth();
  const [name, setName] = useState(user?.name ?? '');
  const [status, setStatus] = useState(user?.status ?? '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name ?? '');
    setStatus(user?.status ?? '');
  }, [user]);

  const save = async () => {
    setLoading(true);
    await api.updateProfile({ name, status });
    await refreshProfile();
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Имя</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Статус</Text>
      <TextInput style={styles.input} value={status} onChangeText={setStatus} placeholder="На связи" />
      <Text style={{ color: '#6b7280', marginTop: 12 }}>Телефон: {user?.phone}</Text>
      <View style={{ marginTop: 16, gap: 8 }}>
        <Button title={loading ? 'Сохраняем...' : 'Сохранить'} onPress={save} />
        <Button title="Выйти" color="#ef4444" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 14, color: '#6b7280', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginTop: 4
  }
});
