import React from 'react';
import { Slot } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FormProvider } from '../context/FormContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FormProvider>
        {/* Ícones escuros: o app tem fundo branco, então o padrão claro
            ficava invisível (branco sobre branco) com o edge-to-edge do SDK 55. */}
        <StatusBar style="dark" />
        <SafeAreaView style={styles.container}>
          <Slot />
        </SafeAreaView>
      </FormProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
