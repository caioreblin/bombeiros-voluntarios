import React, { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

export default function Step6() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value.replace(/\D/g, '') + ' m²',
      },
    });
  };

  const handleNext = () => {
    console.log('Dados do formulário no Passo 6:', formData);
    router.push('/form/step7');
  };

  const handleBack = () => {
    router.back();
  };

  const renderAreaInputs = (section) => (
    <>
      <Text style={styles.label}>Edificada</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemplo: 221 m²"
        placeholderTextColor="#ccc"
        value={formData[section].edificada}
        onChangeText={(value) => handleInputChange(section, 'edificada', value)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Não edificada (urbana)</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemplo: 500 m²"
        placeholderTextColor="#ccc"
        value={formData[section].naoEdificadaUrbana}
        onChangeText={(value) => handleInputChange(section, 'naoEdificadaUrbana', value)}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Não edificada (rural)</Text>
      <TextInput
        style={styles.input}
        placeholder="Exemplo: 1000 m²"
        placeholderTextColor="#ccc"
        value={formData[section].naoEdificadaRural}
        onChangeText={(value) => handleInputChange(section, 'naoEdificadaRural', value)}
        keyboardType="numeric"
      />
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Área Atingida</Text>
        {renderAreaInputs('areaAtingida')}

        <Text style={styles.title}>Área Total</Text>
        {renderAreaInputs('areaTotal')}

        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={handleBack} />
          <Button title="Próximo" onPress={handleNext} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  label: { marginTop: 10, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
