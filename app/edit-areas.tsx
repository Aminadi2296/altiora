import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, FlatList, Platform, Pressable, Text, View } from 'react-native';
import { useAreaStore } from '../store/useAreaStore';
import styles from '../styles/styles'; // Assuming your styles live here

export default function EditAreas() {
  const areas = useAreaStore((state) => state.areas);
  const removeArea = useAreaStore((state) => state.removeArea);

  const confirmDelete = (name: string) => {
    console.log('Delete button pressed for:', name);
    if (Platform.OS === 'web') {
      if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
        removeArea(name);
      }
    } else {
      Alert.alert(
        'Delete Area',
        `Are you sure you want to delete "${name}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => removeArea(name),
          },
        ]
      );
    }
  };

  // Optional: A quick test button for Alert (remove after testing)
  // Uncomment to test alerts manually
  /*
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Development Areas
      </Text>
      <Pressable
        style={{ marginBottom: 20, backgroundColor: '#007AFF', padding: 10, borderRadius: 6 }}
        onPress={() => Alert.alert('Test Alert', 'This is a test alert')}
      >
        <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Test Alert</Text>
      </Pressable>
      <FlatList
        data={areas}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.areaItem}>
            <Text style={styles.areaName}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable onPress={() => console.log('Edit pressed:', item.name)}>
                <Ionicons name="pencil" size={20} color="#2980b9" />
              </Pressable>
              <Pressable onPress={() => confirmDelete(item.name)}>
                <Ionicons name="trash" size={20} color="#e74c3c" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
  */

  // Normal return without test button:
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Development Areas
      </Text>
      <FlatList
        data={areas}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.areaItem}>
            <Text style={styles.areaName}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Pressable onPress={() => console.log('Edit pressed:', item.name)}>
                <Ionicons name="pencil" size={20} color="#2980b9" />
              </Pressable>
              <Pressable onPress={() => confirmDelete(item.name)}>
                <Ionicons name="trash" size={20} color="#e74c3c" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}
