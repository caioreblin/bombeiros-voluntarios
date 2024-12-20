import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

export default function Step5() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  const [selectedPerda, setSelectedPerda] = useState(formData.tipoPerda || '');

  const handleSelectPerda = (value) => {
    setSelectedPerda(value);
    setFormData({ ...formData, tipoPerda: value });
  };

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
    console.log('Dados do formulário no Passo 5:', formData);
    router.push('/form/step7'); // Próximo passo
  };

  const handleBack = () => {
    router.back();
  };

  const renderAreaInputs = (section, fields) => (
    <>
      {fields.map((field) => (
        <View key={field}>
          <Text style={styles.label}>{field}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Exemplo: 500 m²`}
            placeholderTextColor="#ccc"
            value={formData[section][field]}
            onChangeText={(value) => handleInputChange(section, field, value)}
            keyboardType="numeric"
          />
        </View>
      ))}
    </>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Informações Sobre o Incêndio</Text>

        <Text style={styles.label}>Tipo de Perda</Text>
        <View style={styles.radioGroup}>
          {['Total', 'Parcial', 'Insignificante'].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.radioButton,
                selectedPerda === option && styles.radioButtonSelected,
              ]}
              onPress={() => handleSelectPerda(option)}
            >
              <Text style={selectedPerda === option ? styles.radioTextSelected : styles.radioText}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Possível Causa do Incêndio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva a possível causa do incêndio"
          placeholderTextColor="#ccc"
          multiline
          value={formData.causaIncendio}
          onChangeText={(value) => setFormData({ ...formData, causaIncendio: value })}
        />

        <Text style={styles.title}>Área Atingida</Text>
        {renderAreaInputs('areaAtingida', ['Edificada', 'Não Edificada'])}

        <Text style={[styles.title, { marginTop: 15}]}>Área Total</Text>
        {renderAreaInputs('areaTotal', ['Imóvel', 'Terreno'])}

        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={handleBack} />
          <Button title="Próximo" onPress={handleNext} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  label: { marginTop: 10, fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10
  },
  textArea: { height: 100, textAlignVertical: 'top', marginBottom: 15 },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  radioButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center'
  },
  radioButtonSelected: { backgroundColor: '#e21b1b' },
  radioText: { color: '#000', fontSize: 12 },
  radioTextSelected: { color: '#fff', fontSize: 12 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
