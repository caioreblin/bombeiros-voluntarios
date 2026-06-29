import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { FormContext } from '../context/FormContext';

export default function Home() {
  const router = useRouter();
  const { clearForm } = useContext(FormContext);

  const handleNovaOcorrencia = () => {
    // Limpa qualquer rascunho persistido antes de iniciar uma nova ocorrência.
    clearForm();
    router.push('/form/step1');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Pressable style={styles.button} onPress={handleNovaOcorrencia}>
        <Text style={styles.buttonText}>Nova Ocorrência</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center'},
  logo: { width: 150, height: 165, marginBottom: 20 },
  button: { marginTop: 20, padding: 10, backgroundColor: '#e21b1b', borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
});
