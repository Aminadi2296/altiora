import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type AreaProgressProps = {
  name: string;
  xp: number;
  color?: string;
};

// Calculate level from XP
const getLevel = (xp: number): number => {
  if (xp < 100) return 1;
  if (xp < 300) return 2;
  if (xp < 600) return 3;
  return Math.floor((xp - 100) / 300) + 2;
};

// Calculate progress bar fill %
const getProgress = (xp: number): number => {
  const level = getLevel(xp);
  const nextLevelXP = level === 1 ? 100 : level * 200;
  const prevLevelXP = level === 1 ? 0 : (level - 1) * 200;
  const progress = ((xp - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100;
  return Math.min(progress, 100);
};

const AreaProgress: React.FC<AreaProgressProps> = ({ name, xp, color = '#4CAF50'  }) => {
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
