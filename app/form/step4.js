import React, { useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';

export default function Step4() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleAddBombeiro = () => {
    setFormData({
      ...formData,
      bombeiros: [...formData.bombeiros, { nome: '', vtr: '' }], // Adiciona um novo objeto vazio
    });
  };

  const handleRemoveBombeiro = (index) => {
    if (formData.bombeiros.length > 1) {
      const updatedBombeiros = formData.bombeiros.filter((_, i) => i !== index);
      setFormData({ ...formData, bombeiros: updatedBombeiros });
    }
  };

  const handleBombeiroChange = (index, key, value) => {
    const updatedBombeiros = [...formData.bombeiros];
    updatedBombeiros[index][key] = value; // Atualiza a chave específica (nome ou vtr)
    setFormData({ ...formData, bombeiros: updatedBombeiros });
  };

  const handleNext = () => {
    console.log('Dados do formulário no Passo 4:', formData);
    router.push('/form/step5');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bombeiros na Ocorrência</Text>
      <FlatList
        style={styles.containerFlatList}
        data={formData.bombeiros}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.bombeiroRow}>
            <TextInput
              style={styles.input}
              placeholder={`Bombeiro ${index + 1}`}
              placeholderTextColor="#ccc"
              value={item.nome}
              onChangeText={(value) => handleBombeiroChange(index, 'nome', value)}
            />
            <Dropdown
              style={styles.input}
              selectedTextStyle={{ fontSize: 14 }}
              itemTextStyle={{ fontSize: 14 }}
              data={
                [{ label: 'Selecione...', value: '' }, 
                ...(formData.tabelaVTRs?.map((val) => ({ label: val.vtr, value: val.vtr })) || [])]
              }
              labelField="label"
              valueField="value"
              value={item.vtr}
              onChange={(selected) => handleBombeiroChange(index, 'vtr', selected.value)}
              maxHeight={190}
            />
            {formData.bombeiros.length > 1 && (
              <TouchableOpacity onPress={() => handleRemoveBombeiro(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        ListFooterComponent={
          <Button title="Adicionar Bombeiro" onPress={handleAddBombeiro} />
        }
      />

      <Text style={styles.label}>Demandante</Text>
      <TextInput
        style={styles.input2}
        placeholder="Nome do demandante"
        placeholderTextColor="#ccc"
        value={formData.demandante}
        onChangeText={(value) => setFormData({ ...formData, demandante: value })}
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
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  input2: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  bombeiroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: '#e21b1b',
    borderRadius: 5,
    padding: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  containerFlatList: {
    marginBottom: 10,
  },
});
