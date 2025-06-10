import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface GoalItemProps {
  name: string;
  area: string;
  xp: number;
  color: string;
  onPress: () => void;
  onXPPress: () => void;
}

export default function GoalItem({
  name,
  area,
  xp,
  color,
  onPress,
  onXPPress,
}: GoalItemProps) {
  return (
    <View style={styles.container}>
      {/* Left side: goal name and area */}
      <Pressable onPress={onPress} style={styles.leftSide}>
        <Text style={[styles.goalName, { color }]}>{name}</Text>
        <Text style={styles.areaName}>{area}</Text>
      </Pressable>

      {/* Right side: XP button */}
      <Pressable
        onPress={() => {
          console.log('XP button pressed:', name, area, xp);
          onXPPress();
        }}
        style={[styles.xpButton, { borderColor: color }]}
      >
        <Text style={[styles.xpText, { color }]}>
          {xp > 0 ? `+${xp} XP` : `${xp} XP`}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  leftSide: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
  },
  areaName: {
    fontSize: 12,
    color: '#666',
  },
  xpButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#eee', // makes the button more visible
  },
  xpText: {
    fontWeight: '700',
  },
});
