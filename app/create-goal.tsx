// app/create-goal.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const areas = ['Health', 'Career', 'Learning', 'Family']; // Reuse or make dynamic later

export default function CreateGoalScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [area, setArea] = useState(areas[0]);
  const [xp, setXp] = useState(2);
  const [isPositive, setIsPositive] = useState(true);

  const saveGoal = () => {
    const goal = {
      name,
      area,
      xp: isPositive ? xp : -xp,
    };

    console.log('Saving goal:', goal);
    // Later: save to global state or storage

    router.back(); // Go back to home
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
            key={a}
            onPress={() => setArea(a)}
            style={[styles.optionButton, area === a && styles.optionSelected]}>
            <Text>{a}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>XP Amount:</Text>
      <View style={styles.buttonRow}>
        {[2, 3, 5].map((value) => (
          <Pressable
            key={value}
            onPress={() => setXp(value)}
            style={[styles.optionButton, xp === value && styles.optionSelected]}>
            <Text>{value}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>XP Type:</Text>
      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => setIsPositive(true)}
          style={[styles.optionButton, isPositive && styles.optionSelected]}>
          <Text>+</Text>
        </Pressable>
        <Pressable
          onPress={() => setIsPositive(false)}
          style={[styles.optionButton, !isPositive && styles.optionSelected]}>
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
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    padding: 10, marginBottom: 16
  },
  label: { marginTop: 10, marginBottom: 6, fontWeight: '600' },
  buttonRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  optionButton: {
    padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 6
  },
  optionSelected: {
    backgroundColor: '#c8f7c5', borderColor: '#2ecc71'
  },
});
