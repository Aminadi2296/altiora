import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AreaProgress from '../components/AreaProgress';
import GoalItem from '../components/GoalItem';

const dummyAreas = [
  { name: 'Health', xp: 70 },
  { name: 'Career', xp: 40 },
  { name: 'Learning', xp: 20 },
  { name: 'Family', xp: 90 },
];

const dummyGoals = [
  { name: 'Finish project report', area: 'Career', xp: 2 },
  { name: 'Meditate daily', area: 'Health', xp: 3 },
  { name: 'Read book', area: 'Learning', xp: 5 },
  { name: 'Skip TV for study', area: 'Learning', xp: -3 },
];

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* Horizontal container for avatar and progress bars */}
      <View style={styles.topRow}>
        <Image
          source={require('../assets/images/avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.areasContainer}>
          {dummyAreas.map((area, index) => (
            <AreaProgress key={index} name={area.name} xp={area.xp} />
          ))}
        </View>
      </View>

      {/* Goals Section */}
      <View style={styles.goalsSection}>
        <Text style={styles.goalsTitle}>Goals</Text>
        {dummyGoals.map((goal, index) => (
          <GoalItem key={index} name={goal.name} area={goal.area} xp={goal.xp} />
        ))}
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
