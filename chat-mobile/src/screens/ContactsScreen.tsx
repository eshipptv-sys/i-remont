import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { api } from '../api/client';
import { useNavigation } from '@react-navigation/native';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.getContacts().then(setContacts);
  }, []);

  const openChat = async (userId: string) => {
    const chat = await api.createChat(userId);
    navigation.navigate('Chat' as never, { chatId: chat.id, title: chat.title } as never);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => openChat(item.id)}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.slice(0, 2).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6'
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: { fontWeight: '700', color: '#111827' },
  name: { fontSize: 16, fontWeight: '600' },
  phone: { color: '#6b7280', marginTop: 2 }
});
