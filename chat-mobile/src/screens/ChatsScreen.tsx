import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';

export default function ChatsScreen() {
  const navigation = useNavigation();
  const { token, user } = useAuth();
  const [chats, setChats] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadChats = async () => {
    const data = await api.getChats();
    setChats(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadChats();
    }, [])
  );

  const handleMessage = useCallback(() => {
    loadChats();
  }, []);

  useSocket(token, handleMessage);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadChats();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        renderItem={({ item }) => {
          const lastText = item.lastMessage?.text ?? 'Нет сообщений';
          const time = item.lastMessage?.createdAt
            ? new Date(item.lastMessage.createdAt).toLocaleTimeString()
            : '';
          const other = item.participants?.find((p: any) => p.id !== user?.id) ?? item.participants?.[0];
          return (
            <TouchableOpacity
              style={styles.chatRow}
              onPress={() => navigation.navigate('Chat' as never, { chatId: item.id, title: item.title } as never)}
            >
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{(other?.name || '?').slice(0, 2).toUpperCase()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.chatTitle}>{item.title}</Text>
                <Text style={styles.chatSubtitle} numberOfLines={1}>
                  {lastText}
                </Text>
              </View>
              <Text style={styles.time}>{time}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6'
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: { fontWeight: '700', color: '#111827' },
  chatTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  chatSubtitle: { fontSize: 14, color: '#6b7280', marginTop: 2 },
  time: { color: '#9ca3af', fontSize: 12 }
});
