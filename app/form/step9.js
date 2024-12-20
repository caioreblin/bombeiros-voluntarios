import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

const options = ['Acetileno', 'Amónia', 'Argônio', 'Gás Natural', 'G.L.P.', 'Oxigênio', 'Outro Tipo'];

export default function Step9() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  const [isGasLeak, setIsGasLeak] = useState(formData.vazamentoGas ? true : false);
  const [selectedGas, setSelectedGas] = useState(formData.vazamentoGas || '');
  const [observationGas, setObservationGas] = useState(formData.observacaoGas || '');

  const handleToggleChange = (value) => {
    setIsGasLeak(value);
    if (!value) {
      setSelectedGas('');
      setObservationGas('');
      setFormData({ ...formData, vazamentoGas: false, observacaoGas: '' });
    }
  };

  const handleGasChange = (value) => {
    setSelectedGas(value);
    setFormData({ ...formData, vazamentoGas: value });
  };

  const handleObservationChange = (value) => {
    setObservationGas(value);
    setFormData({ ...formData, observacaoGas: value });
  };

  const handleNext = () => {
    console.log('Dados do formulário no Passo 9:', formData);
    router.push('/form/step10');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Vazamento de Gás</Text>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Houve Vazamento</Text>
          <Switch
            value={isGasLeak}
            onValueChange={handleToggleChange}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={isGasLeak ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        {isGasLeak && (
          <>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionContainer,
                  selectedGas === option && styles.selectedOptionContainer,
                ]}
                onPress={() => handleGasChange(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedGas === option && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={[styles.label, { marginTop: 15, marginBottom: 5}]}>Observação:</Text>
            <TextInput
              style={styles.textArea}
              value={observationGas}
              onChangeText={handleObservationChange}
              multiline
              numberOfLines={4}
              placeholder="Digite observações sobre o vazamento de gás"
              placeholderTextColor="#ccc"
            />
          </>
        )}

        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={handleBack} />
          <Button
            title="Próximo"
            onPress={handleNext}
            disabled={isGasLeak && !selectedGas} // Desabilita o botão se "Houve Vazamento" for true e nenhuma opção estiver selecionada
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginRight: 10 },
  optionContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  optionText: { fontSize: 16 },
  selectedOptionContainer: { backgroundColor: '#e21b1b' },
  selectedOptionText: { color: '#fff', fontWeight: 'bold' },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
