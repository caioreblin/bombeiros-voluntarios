import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../constants/theme';

interface ToggleRowProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  bold?: boolean;
}

export default function ToggleRow({ label, value, onValueChange, bold = false }: ToggleRowProps) {
  return (
    <View style={commonStyles.toggleContainer}>
      <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.trackOff, true: colors.trackOn }}
        thumbColor={value ? colors.thumbOn : colors.thumbOff}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16, marginRight: 10 },
  bold: { fontWeight: 'bold' },
});
