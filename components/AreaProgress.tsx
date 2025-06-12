import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AreaProgressProps = {
  name: string;
  xp: number;
  color?: string;
};

// Calculate level from XP
const getLevel = (xp: number): number => {
  let level = 1;
  let requiredXP = 100;

  while (xp >= requiredXP) {
    level++;
    requiredXP += level * 100;
  }

  return level;
};

// Calculate progress bar fill % within current level
const getProgress = (xp: number): number => {
  let level = 1;
  let totalXP = 0;
  let nextXP = 100;

  while (xp >= nextXP) {
    totalXP = nextXP;
    level++;
    nextXP += level * 100;
  }

  const currentLevelXP = xp - totalXP;
  const levelXPRange = nextXP - totalXP;

  const progress = (currentLevelXP / levelXPRange) * 100;
  return Math.min(progress, 100);
};

const AreaProgress: React.FC<AreaProgressProps> = ({ name, xp, color = '#4CAF50' }) => {
  const level = getLevel(xp);
  const progress = getProgress(xp);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%`, backgroundColor: color }]} />
      </View>

      <Text style={styles.levelText}>
        Level {level} – XP: {xp}
      </Text>
    </View>
  );
};

export default AreaProgress;

const styles = StyleSheet.create({
  container: {
    marginBottom: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  progressBar: {
    width: '100%',
    height: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  levelText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
});
