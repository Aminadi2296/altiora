import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import AreaProgress from '../components/AreaProgress';
import GoalItem from '../components/GoalItem';
import styles from '../styles/styles';

const dummyGoals = [
  { name: 'Finish project report', area: 'Career', xp: 2 },
  { name: 'Meditate daily', area: 'Health', xp: 3 },
  { name: 'Read book', area: 'Learning', xp: 5 },
  { name: 'Skip TV for study', area: 'Learning', xp: -3 },
];

export default function Home() {
  const router = useRouter();
  const [areas, setAreas] = React.useState([
    { name: 'Health', xp: 70 },
    { name: 'Career', xp: 40 },
    { name: 'Learning', xp: 20 },
    { name: 'Family', xp: 90 },
  ]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newAreaName, setNewAreaName] = React.useState('');

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
                    setAreas([...areas, { name: newAreaName.trim(), xp: 0 }]);
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

      <View style={styles.goalsSection}>
        <Text style={styles.goalsTitle}>Goals</Text>

        {/* 🟡 Goal List */}
        {dummyGoals.map((goal, index) => (
          <GoalItem key={index} name={goal.name} area={goal.area} xp={goal.xp} />
        ))}

        {/* 🔵 Add Goal Button */}
        <Pressable onPress={() => router.push('/create-goal')} style={styles.addGoalButton}>
          <Text style={styles.addGoalButtonText}>+ Add Goal</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
