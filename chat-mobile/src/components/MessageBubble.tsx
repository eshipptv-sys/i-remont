import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ text, isMine }: { text: string; isMine: boolean }) {
  return (
    <View style={[styles.container, isMine ? styles.mine : styles.theirs]}>
      <Text style={isMine ? styles.mineText : styles.theirsText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    padding: 12,
    marginVertical: 4,
    borderRadius: 16
  },
  mine: {
    marginLeft: '20%',
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4
  },
  theirs: {
    marginRight: '20%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4
  },
  mineText: {
    color: '#111'
  },
  theirsText: {
    color: '#111'
  }
});
