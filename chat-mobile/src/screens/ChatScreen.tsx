import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MessageBubble from '../components/MessageBubble';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';

export default function ChatScreen() {
  const route = useRoute<any>();
  const chatId = route.params?.chatId;
  const { token, user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  const loadMessages = async () => {
    const data = await api.getMessages(chatId);
    setMessages(data);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  useEffect(() => {
    loadMessages();
  }, [chatId]);

  const handleSocket = useCallback((payload: any) => {
    if (payload.message && payload.message.chatId === chatId) {
      setMessages((prev) => [...prev, payload.message]);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  }, [chatId]);

  const socketRef = useSocket(token, handleSocket);

  useEffect(() => {
    if (socketRef.current && chatId) {
      socketRef.current.emit('join_chat', chatId);
    }
  }, [chatId, socketRef]);

  const send = async () => {
    if (!text.trim()) return;
    const optimistic = { id: Date.now().toString(), text, senderId: user?.id, chatId, status: 'sent' };
    setMessages((prev) => [...prev, optimistic]);
    setText('');
    await api.sendMessage(chatId, text);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ref={listRef}
        style={styles.list}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble text={item.text} isMine={item.senderId === user?.id} />}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Сообщение"
          value={text}
          onChangeText={setText}
          multiline
        />
        <Button title="Отпр" onPress={send} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#f7f7f7', padding: 12 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 120
  }
});
