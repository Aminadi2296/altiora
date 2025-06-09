import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAreaStore } from '../store/useAreaStore';
import { useGoalStore } from '../store/useGoalStore';

export default function CreateGoalScreen() {
  const router = useRouter();

  const areas = useAreaStore((state) => state.areas);
  const addGoal = useGoalStore((state) => state.addGoal);

  const [name, setName] = useState('');
  const [area, setArea] = useState(areas[0] || '');
  const [xp, setXp] = useState(2);
  const [isPositive, setIsPositive] = useState(true);

  const saveGoal = () => {
    if (!name.trim()) return;

    const goal = {
      name: name.trim(),
      area: area.name,
      xp: isPositive ? xp : -xp,
    };

    addGoal(goal);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Goal</Text>

      <TextInput
        style={styles.input}
        placeholder="Goal name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Area:</Text>
      <View style={styles.buttonRow}>
        {areas.map((a) => (
          <Pressable
            key={a.name}
            onPress={() => setArea(a)}
            style={[
              styles.optionButton,
              area === a && styles.optionSelected,
            ]}
          >
            <Text>{a.name}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>XP Amount:</Text>
      <View style={styles.buttonRow}>
        {[2, 3, 5].map((value) => (
          <Pressable
            key={value}
            onPress={() => setXp(value)}
            style={[
              styles.optionButton,
              xp === value && styles.optionSelected,
            ]}
          >
            <Text>{value}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>XP Type:</Text>
      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => setIsPositive(true)}
          style={[
            styles.optionButton,
            isPositive && styles.optionSelected,
          ]}
        >
          <Text>+</Text>
        </Pressable>
        <Pressable
          onPress={() => setIsPositive(false)}
          style={[
            styles.optionButton,
            !isPositive && styles.optionSelected,
          ]}
        >
          <Text>-</Text>
        </Pressable>
      </View>

      <Button title="Save Goal" onPress={saveGoal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
  },
  label: { marginTop: 10, marginBottom: 6, fontWeight: '600' },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  optionSelected: {
    backgroundColor: '#c8f7c5',
    borderColor: '#2ecc71',
  },
});
