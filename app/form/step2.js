import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';

export default function Step2() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  const equipeOptions = ['Alfa', 'Bravo', 'Charlie', 'Delta'];
  const irOptions = ['1', '2', '3'];

  const formatDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [state, setState] = useState({
    data: formData.data || formatDate(),
    hch: formData.hch || formatTime(),
    numeroBO: formData.numeroBO || '',
    equipe: formData.equipe || equipeOptions[0],
    despachador: formData.despachador || '',
    codigoIR: formData.codigoIR || irOptions[0],
  }); 

  useEffect(() => {
    setFormData((prevForm) => ({
      ...prevForm,
      data: state.data,
      hch: state.hch,
      numeroBO: state.numeroBO,
      equipe: state.equipe,
      despachador: state.despachador,
      codigoIR: state.codigoIR,
    }));
  }, []);

  const handleChange = (field, value) => {
    let formattedValue = value;

    if (field === 'data') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 10);
    }

    if (field === 'hch') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1:$2')
        .slice(0, 5);
    }

    setState((prevState) => ({ ...prevState, [field]: formattedValue }));
    setFormData((prevForm) => ({ ...prevForm, [field]: formattedValue }));
  };

  const handleNext = () => {
    console.log("Dados do formulário no Passo 2:", formData);
    router.push('/form/step3');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Dados da Ocorrência</Text>

        <Text style={styles.label}>Data</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a data (DD/MM/AAAA)"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={state.data}
          onChangeText={(value) => handleChange('data', value)}
        />

        <Text style={styles.label}>H. CH</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a data (DD/MM/AAAA)"
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={state.hch}
          onChangeText={(value) => handleChange('hch', value)}
        />

        <Text style={styles.label}>Número B.O.</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o número do B.O."
          placeholderTextColor="#ccc"
          keyboardType="numeric"
          value={state.numeroBO}
          onChangeText={(value) => handleChange('numeroBO', value)}
        />

        <Text style={styles.label}>Equipe</Text>
        <Dropdown
          style={styles.input}
          selectedTextStyle={{ fontSize: 14 }}
          itemTextStyle={{ fontSize: 14 }}
          data={equipeOptions?.map((val) => ({ label: val, value: val })) || []}
          labelField="label"
          valueField="value"
          value={state.equipe}
          onChange={(item) => handleChange('equipe', item.value)}
          maxHeight={190}
        />

        <Text style={styles.label}>Despachador</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do despachador"
          placeholderTextColor="#ccc"
          value={state.despachador}
          onChangeText={(value) => handleChange('despachador', value)}
        />

        <Text style={styles.label}>Código de IR</Text>
        <Dropdown
          style={styles.input}
          selectedTextStyle={{ fontSize: 14 }}
          itemTextStyle={{ fontSize: 14 }}
          data={irOptions?.map((val) => ({ label: val, value: val })) || []}
          labelField="label"
          valueField="value"
          value={state.codigoIR}
          onChange={(item) => handleChange('codigoIR', item.value)}
          maxHeight={190}
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
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
