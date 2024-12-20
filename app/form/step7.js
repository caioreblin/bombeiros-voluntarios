import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

const options = ['Edificação', 'Meio de Transporte', 'Vegetação', 'Outro Tipo'];

export default function Step7() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(formData.incendioEm || '');

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setFormData({ ...formData, incendioEm: value });
  };

  const handleNext = () => {
    console.log('Dados do formulário no Passo 7:', formData);
    router.push('/form/step8');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incêndio em:</Text>
      {options.map((option) => (
        <TouchableOpacity 
            key={option} 
            style={[
              styles.optionContainer,
              selectedOption === option && styles.selectedOptionContainer,
            ]} 
            onPress={() => handleOptionChange(option)}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === option && styles.selectedOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={handleBack} />
        <Button title="Próximo" onPress={handleNext} disabled={!selectedOption} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  optionContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  optionText: { fontSize: 16 },
  selectedOptionContainer: { backgroundColor: '#e21b1b'},
  selectedOptionText: { color: '#fff', fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
