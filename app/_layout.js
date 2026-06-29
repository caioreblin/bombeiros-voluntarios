import React from 'react';
import { Slot } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { FormProvider } from '../context/FormContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <FormProvider>
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
