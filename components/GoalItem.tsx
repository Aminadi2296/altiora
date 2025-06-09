import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type GoalItemProps = {
  name: string;
  area: string;
  xp: number;
  color: string; // Add this
};

const GoalItem: React.FC<GoalItemProps> = ({ name, area, xp, color }) => {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.colorLine, { backgroundColor: color }]} />
      <View style={styles.container}>
        <Text style={styles.goalName}>{name}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.area}>{area}</Text>
          <Text style={[styles.xp, xp < 0 ? styles.negativeXP : styles.positiveXP]}>
            {xp > 0 ? `+${xp} XP` : `${xp} XP`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  colorLine: {
    width: 6,
  },
  container: {
    flex: 1,
    padding: 12,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  area: {
    fontSize: 12,
    color: '#555',
  },
  xp: {
    fontSize: 12,
    fontWeight: '700',
  },
  positiveXP: {
    color: 'green',
  },
  negativeXP: {
    color: 'red',
  },
});
