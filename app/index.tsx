import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import AreaProgress from '../components/AreaProgress';
import GoalItem from '../components/GoalItem';
import { useAreaStore } from '../store/useAreaStore';
import { Goal, useGoalStore } from '../store/useGoalStore';
import styles from '../styles/styles';

export default function Home() {
  const router = useRouter();

  const areas = useAreaStore((state) => state.areas);
  const updateAreaXP = useAreaStore((state) => state.updateAreaXP);
  const addArea = useAreaStore((state) => state.addArea);

  const goals = useGoalStore((state) => state.goals);
  // const removeGoal = useGoalStore((state) => state.removeGoal);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newAreaName, setNewAreaName] = React.useState('');

  // Handle clicking a goal: subtract XP and remove goal
  const handleGoalPress = (goal: Goal) => {
    updateAreaXP(goal.area, goal.xp);
    // removeGoal(goal.name);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />

        <View style={styles.areasContainer}>
          {areas.map((area, index) => (
            <AreaProgress key={index} name={area.name} xp={area.xp} />
          ))}
        </View>

        <View style={styles.addAreaWrapper}>
          {!showAddForm ? (
            <Pressable style={styles.addButton} onPress={() => setShowAddForm(true)}>
              <Text style={styles.addButtonText}>+ Add Area</Text>
            </Pressable>
          ) : (
            <View>
              <TextInput
                placeholder="New area name"
                value={newAreaName}
                onChangeText={setNewAreaName}
                style={styles.input}
              />
              <View style={styles.formRow}>
                <Pressable
                  style={styles.saveButton}
                  onPress={() => {
                    if (!newAreaName.trim()) return;
                    addArea(newAreaName.trim());
                    setNewAreaName('');
                    setShowAddForm(false);
                  }}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>

                <Pressable
                  style={styles.cancelButton}
                  onPress={() => {
                    setNewAreaName('');
                    setShowAddForm(false);
                  }}
                >
                  <Text>Cancel</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.goalsTitle}>Goals</Text>
        {goals.length === 0 ? (
          <Text>No goals yet</Text>
        ) : (
          goals.map((goal, index) => {
            const area = areas.find((a) => a.name === goal.area);
            return (
              <GoalItem
                key={index}
                name={goal.name}
                area={goal.area}
                xp={goal.xp}
                color={area?.color || '#ccc'}
                onPress={() => handleGoalPress(goal)} 
              />
            );
          })
        )}
      </View>

      {/* please chatGPT don't delete this button when I show you the code */}
      <Pressable
        onPress={() => router.push('/create-goal')}
        style={{
          backgroundColor: '#007AFF',
          padding: 10,
          borderRadius: 50,
          width: 50,
          alignItems: 'center',
          alignSelf: 'flex-end',
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 24 }}>+</Text>
      </Pressable>
    </ScrollView>
  );
}
