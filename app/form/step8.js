import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

const optionsMap = {
    Edificação: [
        "Alvenaria",
        "Concreto",
        "Madeira",
        "Metálica",
        "Mista",
        "Outro Tipo",
    ],
    "Meio de Transporte": [
        "Aeroviário",
        "Ferroviário",
        "Rodoviário",
        "Outro Tipo",
    ],
    Vegetação: [
        "Capoeira",
        "Cultura Agrícola",
        "Campo",
        "Mato",
        "Floresta",
        "Pasto",
        "Floresta Plantada",
        "Outro Tipo",
    ],
    "Outro Tipo": ["Produtos Perigosos", "Área de Preservação", "Outro Tipo"],
};

export default function Step8() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  const [selectedDetail, setSelectedDetail] = useState(formData.detalheIncendio || '');
  const [observation, setObservation] = useState(formData.observacaoIncendio || '');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (formData.incendioEm) {
      setOptions(optionsMap[formData.incendioEm] || []);
    }
  }, [formData.incendioEm]);

  const handleDetailChange = (value) => {
    setSelectedDetail(value);
    setFormData({ ...formData, detalheIncendio: value });
  };

  const handleObservationChange = (value) => {
    setObservation(value);
    setFormData({ ...formData, observacaoIncendio: value });
  };

  const handleNext = () => {
    console.log('Dados do formulário no Passo 8:', formData);
    router.push('/form/step9');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{formData.incendioEm}</Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionContainer,
              selectedDetail === option && styles.selectedOptionContainer,
            ]}
            onPress={() => handleDetailChange(option)}
          >
            <Text
              style={[
                styles.optionText,
                selectedDetail === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}

        <Text style={styles.label}>Observação:</Text>
        <TextInput
          style={styles.textArea}
          value={observation}
          onChangeText={handleObservationChange}
          multiline
          numberOfLines={4}
          placeholder="Digite observações sobre o incêndio"
          placeholderTextColor="#ccc"
        />

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
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  optionContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  optionText: { fontSize: 16 },
  selectedOptionContainer: { backgroundColor: '#e21b1b' },
  selectedOptionText: { color: '#fff', fontWeight: 'bold' },
  label: { marginTop: 20, marginBottom: 5, fontSize: 16 },
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
