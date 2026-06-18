import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StepProgressProps {
  current: number;
  total: number;
}

export default function StepProgress({ current, total }: StepProgressProps) {
  const progress = Math.min(Math.max(current / total, 0), 1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{`Passo ${current} de ${total}`}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5, backgroundColor: '#fff' },
  label: { fontSize: 12, color: '#666', marginBottom: 5 },
  track: { height: 6, borderRadius: 3, backgroundColor: '#e0e0e0', overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#e21b1b', borderRadius: 3 },
});
