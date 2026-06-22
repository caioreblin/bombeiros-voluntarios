import React from 'react';
import { Slot, usePathname } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import StepProgress from '../../components/StepProgress';
import { TOTAL_STEPS } from '../../constants/steps';

export default function FormLayout() {
  const pathname = usePathname();
  // Extrai o número do step do caminho exato "/form/stepN" (rotas como
  // "/form/success" não casam e a barra de progresso fica oculta).
  const match = pathname.match(/^\/form\/step(\d+)/);
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
