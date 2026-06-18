import React from 'react';
import { Slot, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import StepProgress from '../../components/StepProgress';

const TOTAL_STEPS = 14;

export default function FormLayout() {
  const pathname = usePathname();
  const match = pathname.match(/step(\d+)/);
  const currentStep = match ? Number(match[1]) : null;

  return (
    <View style={styles.container}>
      {currentStep && <StepProgress current={currentStep} total={TOTAL_STEPS} />}
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
