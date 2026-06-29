import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FormContext } from '../../context/FormContext';

export default function Success() {
  const router = useRouter();
  const { clearForm } = useContext(FormContext);

  const handleNovaOcorrencia = () => {
    clearForm();
    router.push('/form/step1');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ocorrência gerada com sucesso!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Início" onPress={() => router.push('/')} />
        <Button title="Nova Ocorrência" onPress={handleNovaOcorrencia} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-around', width: '100%' },
});
