import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
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
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 16, paddingTop: 40 }}>
      {/* Avatar and areas bars - You can style this later to be in one row */}
      <Image
        source={require('../assets/images/avatar.png')}
        style={{ width: 48, height: 48, borderRadius: 24, marginBottom: 16 }}
      />

      {dummyAreas.map((area, index) => (
        <AreaProgress key={index} name={area.name} xp={area.xp} />
      ))}

      {/* Goals Section */}
      <View style={{ marginTop: 32 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12 }}>Goals</Text>
        {dummyGoals.map((goal, index) => (
          <GoalItem key={index} name={goal.name} area={goal.area} xp={goal.xp} />
        ))}
      </View>
    </ScrollView>
  );
}
