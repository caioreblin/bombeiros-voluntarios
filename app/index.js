import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Link href="/form/step1" style={styles.button}>
        Nova Ocorrência
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center'},
  logo: { width: 150, height: 165, marginBottom: 20 },
  button: { marginTop: 20, padding: 10, backgroundColor: '#e21b1b', color: '#fff', textAlign: 'center', borderRadius: 5 },
});
