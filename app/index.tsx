import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import AreaProgress from '../components/AreaProgress';
import GoalItem from '../components/GoalItem';
import { predefinedColors, useAreaStore } from '../store/useAreaStore';
import { useGoalStore } from '../store/useGoalStore';
import styles from '../styles/styles';


export default function Home() {
  const router = useRouter();

  const areas = useAreaStore((state) => state.areas);
  const updateAreaXP = useAreaStore((state) => state.updateAreaXP);
  const addArea = useAreaStore((state) => state.addArea);

  const goals = useGoalStore((state) => state.goals);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newAreaName, setNewAreaName] = React.useState('');
  const usedColors = new Set<string>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topRow}>
        <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
        <View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Development Areas</Text>
  <Pressable onPress={() => router.push('/edit-areas')}>
  <Ionicons
    name="pencil"
    size={15}
    color="#808080"
    style={{ marginLeft: 8 }} // Add spacing here
  />
</Pressable>
</View>
      
        <View style={styles.areasContainer}>
        {areas.map((area, index) => {
        let displayColor = area.color;
    
    if (usedColors.has(displayColor)) {
      const availableColor = predefinedColors.find(c => !usedColors.has(c));
      if (availableColor) displayColor = availableColor;
    }
    
    usedColors.add(displayColor);
    
    return (
       <View key={index} style={styles.areaBarWrapper}>
      <AreaProgress
        name={area.name}
        xp={area.xp}
        color={displayColor}
      />
    </View>
    );
  })}
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

    <View style={styles.goalsSection}>
  <View style={styles.goalsHeader}>
    <Text style={styles.goalsTitle}>Goals</Text>
    <Pressable
      style={styles.addGoalButton}
      onPress={() => router.push('/create-goal')}
    >
      <Text style={styles.addGoalButtonText}>+</Text>
    </Pressable>
  </View>

  {goals.length === 0 ? (
    <Text style={styles.noGoalsText}>No goals yet</Text>
  ) : (
    <View style={styles.goalsList}>
      {goals.map((goal) => {
        const area = areas.find((a) => a.name.trim().toLowerCase() === goal.area.trim().toLowerCase());
        return (
          <GoalItem
            key={goal.name}
            name={goal.name}
            area={goal.area}
            xp={goal.xp}
            color={area?.color || '#ccc'}
            onPress={() => {
              router.push({
                pathname: '/create-goal',
                params: {
                  mode: 'edit',
                  name: goal.name,
                  area: goal.area,
                  xp: goal.xp.toString(),
                },
              });
            }}
            onXPPress={() => {
              updateAreaXP(goal.area, goal.xp);
            }}
          />
        );
      })}
    </View>
  )}
</View>

    </ScrollView>
  );
}
