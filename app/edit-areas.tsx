import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAreaStore } from '../store/useAreaStore';
import styles from '../styles/styles';

export default function EditAreas() {
  const areas = useAreaStore((state) => state.areas);
  const removeArea = useAreaStore((state) => state.removeArea);
  const updateAreaName = useAreaStore((state) => state.updateAreaName);

  const [editingName, setEditingName] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  const confirmDelete = (name: string) => {
    if (Platform.OS === 'web') {
      if (confirm(`Are you sure you want to delete "${name}"?`)) {
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

  const startEditing = (name: string) => {
    setEditingName(name);
    setNewName(name);
  };

  const cancelEditing = () => {
    setEditingName(null);
    setNewName('');
  };

  const saveEditing = () => {
    if (!newName.trim()) {
      Alert.alert('Invalid name', 'Area name cannot be empty.');
      return;
    }
    if (editingName && newName.trim() !== editingName) {
      updateAreaName(editingName, newName.trim());
    }
    cancelEditing();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Development Areas
      </Text>
      <FlatList
        data={areas}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View
            style={[
              styles.areaItem,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            {editingName === item.name ? (
              <>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 4,
                    flex: 1,
                    marginRight: 8,
                  }}
                  value={newName}
                  onChangeText={setNewName}
                  autoFocus
                  placeholder="Enter area name"
                />
                <Pressable onPress={saveEditing}>
                  <Ionicons name="checkmark" size={24} color="green" />
                </Pressable>
                <Pressable onPress={cancelEditing} style={{ marginLeft: 8 }}>
                  <Ionicons name="close" size={24} color="red" />
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.areaName}>{item.name}</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Pressable onPress={() => startEditing(item.name)}>
                    <Ionicons name="pencil" size={20} color="#2980b9" />
                  </Pressable>
                  <Pressable onPress={() => confirmDelete(item.name)}>
                    <Ionicons name="trash" size={20} color="#e74c3c" />
                  </Pressable>
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}
