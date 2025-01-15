import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

export default function Step13() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleNext = () => {
    router.push('/form/step14');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Anotações gerais:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Digite as anotações"
        placeholderTextColor="#ccc"
        value={formData.anotacoes || ''}
        onChangeText={(text) => setFormData({ ...formData, anotacoes: text })}
        multiline
      />

      <Text style={styles.label}>Observações gerais:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Insira as observações"
        placeholderTextColor="#ccc"
        value={formData.observacoes || ''}
        onChangeText={(text) => setFormData({ ...formData, observacoes: text })}
        multiline
      />

      <Text style={styles.label}>Materiais Danificados na Ocorrência:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Descreva os materiais danificados"
        placeholderTextColor="#ccc"
        value={formData.materiaisDanificadosOcorrencia || ''}
        onChangeText={(text) => setFormData({ ...formData, materiaisDanificadosOcorrencia: text })}
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={handleBack} />
        <Button title="Próximo" onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 5 },
  textArea: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
});
