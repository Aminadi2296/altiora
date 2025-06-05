import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AreaProgress from '../components/AreaProgress';
import GoalItem from '../components/GoalItem';

import { useRouter } from 'expo-router';

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
        <Image
          source={require('../assets/images/avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.areasContainer}>
          {areas.map((area, index) => (
            <AreaProgress key={index} name={area.name} xp={area.xp} />
          ))}
        </View>
        <View style={{ marginTop: 16 }}>
  {!showAddForm ? (
    <Pressable
      style={{
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
      }}
      onPress={() => setShowAddForm(true)}
    >
      <Text style={{ color: 'white', fontWeight: '600' }}>+ Add Area</Text>
    </Pressable>
  ) : (
    <View>
      <TextInput
        placeholder="New area name"
        value={newAreaName}
        onChangeText={setNewAreaName}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 6,
          padding: 8,
          marginBottom: 8,
        }}
      />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable
          style={{
            backgroundColor: '#4CAF50',
            padding: 10,
            borderRadius: 6,
            flex: 1,
            alignItems: 'center',
          }}
          onPress={() => {
            if (!newAreaName.trim()) return;
            setAreas([...areas, { name: newAreaName.trim(), xp: 0 }]);
            setNewAreaName('');
            setShowAddForm(false);
          }}
        >
          <Text style={{ color: 'white' }}>Save</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: '#ccc',
            padding: 10,
            borderRadius: 6,
            flex: 1,
            alignItems: 'center',
          }}
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
        {dummyGoals.map((goal, index) => (
          <GoalItem key={index} name={goal.name} area={goal.area} xp={goal.xp} />
        ))}

        <Pressable onPress={() => router.push('/create-goal')}>
          <Text style={{ fontSize: 16, color: 'blue', marginTop: 10 }}>+ Add Goal</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 40,
  },
  topRow: {
    flexDirection: 'row',       // Arrange children horizontally
    alignItems: 'center',       // Vertically center avatar and bars
  },
  avatar: {
    width: 190,                  // Bigger avatar
    height: 240,
    borderRadius: 40,
    marginRight: 5,            // Space between avatar and bars
  },
  areasContainer: {
    flex: 1,                    // Take all remaining space
  },
  goalsSection: {
    marginTop: 32,
  },
  goalsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
});
