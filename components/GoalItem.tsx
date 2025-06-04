import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type GoalItemProps = {
  name: string;
  area: string;
  xp: number;
};

const GoalItem: React.FC<GoalItemProps> = ({ name, area, xp }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.goalName}>{name}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.area}>{area}</Text>
        <Text style={[styles.xp, xp < 0 ? styles.negativeXP : styles.positiveXP]}>
          {xp > 0 ? `+${xp} XP` : `${xp} XP`}
        </Text>
      </View>
    </View>
  );
};

export default GoalItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
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
