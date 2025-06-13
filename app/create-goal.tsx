import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import HeaderBack from '../components/HeaderBack'; // <-- import here
import { useAreaStore } from '../store/useAreaStore';
import { useGoalStore } from '../store/useGoalStore';

export default function CreateGoalScreen() {
  const router = useRouter();
  const { mode, name, area, xp } = useLocalSearchParams();

  const areas = useAreaStore((state) => state.areas);
  const addGoal = useGoalStore((state) => state.addGoal);
  const updateGoal = useGoalStore((state) => state.updateGoal);
  const removeGoal = useGoalStore((state) => state.removeGoal);

  const initialName = name?.toString() || '';
  const initialArea = areas.find((a) => a.name === area) || areas[0];
  const initialXp = xp ? Math.abs(parseInt(xp.toString(), 10)) : 2;
  const initialIsPositive = xp ? parseInt(xp.toString(), 10) >= 0 : true;

  const [goalName, setGoalName] = useState(initialName);
  const [goalArea, setGoalArea] = useState(initialArea);
  const [goalXp, setGoalXp] = useState(initialXp);
  const [isPositive, setIsPositive] = useState(initialIsPositive);

  const saveGoal = () => {
    if (!goalName.trim()) return;

    const goal = {
      name: goalName.trim(),
      area: goalArea.name.trim().toLowerCase(),
      xp: isPositive ? goalXp : -goalXp,
    };

    if (mode === 'edit' && updateGoal) {
      updateGoal(initialName, goal);
    } else {
      addGoal(goal);
    }

    router.back();
  };

  return (
    <View style={styles.container}>
      <HeaderBack title={mode === 'edit' ? 'Edit Goal' : 'Create Goal'} />

      <TextInput
        style={styles.input}
        placeholder="Goal name"
        value={goalName}
        onChangeText={setGoalName}
      />

      <Text style={styles.label}>Area:</Text>
      <View style={styles.buttonRow}>
        {areas.map((a) => (
          <Pressable
            key={a.name}
            onPress={() => setGoalArea(a)}
            style={[
              styles.optionButton,
              goalArea === a && styles.optionSelected,
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
            onPress={() => setGoalXp(value)}
            style={[
              styles.optionButton,
              goalXp === value && styles.optionSelected,
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

      {mode === 'edit' && (
        <Pressable
          onPress={() => {
            removeGoal(initialName);
            router.back();
          }}
          style={{
            marginTop: 12,
            padding: 10,
            backgroundColor: '#ff4d4f',
            borderRadius: 6,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Delete Goal
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
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
