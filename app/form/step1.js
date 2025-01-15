import React, { useContext, useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

const victimOptions = ['Proprietário', 'Inquilino'];

export default function Step1() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const [state, setState] = useState({
    nomeVitima: formData.nomeVitima || '',
    cpf: formData.nome || '',
    fone: formData.fone || '',
    endereco: formData.endereco || '',
    numero: formData.numero || '',
    bairro: formData.bairro || '',
    vitima: formData.vitima || '',
    empresa: formData.empresa || false,
  });

  const handleChange = (field, value) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
    setFormData((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleNext = () => {
    console.log('Dados do formulário no Passo 1:', formData);
    router.push('/form/step2');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Informações da Vítima</Text>

        <Text style={styles.label}>Nome da Vítima</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          placeholderTextColor="#ccc"
          value={state.nomeVitima}
          onChangeText={(value) => handleChange('nomeVitima', value)}
        />

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o CPF (somente dígitos)"
          placeholderTextColor="#ccc"
          value={state.cpf}
          onChangeText={(value) => handleChange('cpf', value)}
        />

        <Text style={styles.label}>Fone</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o telefone"
          placeholderTextColor="#ccc"
          value={state.fone}
          keyboardType='numeric'
          onChangeText={(value) => handleChange('fone', value)}
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o endereço"
          placeholderTextColor="#ccc"
          value={state.endereco}
          onChangeText={(value) => handleChange('endereco', value)}
        />

        <Text style={styles.label}>Número</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o número"
          placeholderTextColor="#ccc"
          value={state.numero}
          keyboardType="numeric"
          onChangeText={(value) => handleChange('numero', value)}
        />

        <Text style={styles.label}>Bairro</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o bairro"
          placeholderTextColor="#ccc"
          value={state.bairro}
          onChangeText={(value) => handleChange('bairro', value)}
        />

        <Text style={styles.label}>Vítima</Text>
        {victimOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.radioButton,
              state.vitima === option && styles.selectedRadioButton,
            ]}
            onPress={() => handleChange('vitima', option)}
          >
            <Text
              style={[
                styles.radioText,
                state.vitima === option && styles.selectedRadioText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Empresa</Text>
          <Switch
            style={{}}
            value={state.empresa}
            onValueChange={(value) => handleChange('empresa', value)}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={state.empresa ? '#e21b1b' : '#f4f3f4'} 
          />
        </View>

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
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  radioButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  selectedRadioButton: { backgroundColor: '#e21b1b' },
  radioText: { fontSize: 16 },
  selectedRadioText: { color: '#fff', fontWeight: 'bold' },
  switchContainer: { flexDirection: 'row',justifyContent: 'space-between' ,alignItems: 'center', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
