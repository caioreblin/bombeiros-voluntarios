import React from 'react';
import { Slot } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FormProvider } from '../context/FormContext';

export default function RootLayout() {
  return (
    <FormProvider>
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
