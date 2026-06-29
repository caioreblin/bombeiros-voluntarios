import React from 'react';
import { Slot, usePathname } from 'expo-router';
import { View, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import StepProgress from '../../components/StepProgress';
import { TOTAL_STEPS } from '../../constants/steps';

export default function FormLayout() {
  const pathname = usePathname();
  // Extrai o número do step do caminho exato "/form/stepN" (rotas como
  // "/form/success" não casam e a barra de progresso fica oculta).
  const match = pathname.match(/^\/form\/step(\d+)/);
  const currentStep = match ? Number(match[1]) : null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      // No iOS empurramos o conteúdo com "padding"; no Android o
      // windowSoftInputMode=adjustResize (padrão) já redimensiona a tela e
      // deixa a ScrollView rolar até o campo em foco.
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {currentStep && <StepProgress current={currentStep} total={TOTAL_STEPS} />}
      <View style={styles.content}>
        <Slot />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
