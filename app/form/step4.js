import React, { useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { validateStep } from '../../validation/stepValidation';
import FormDropdown from '../../components/FormDropdown';
import StepFooter from '../../components/StepFooter';

export default function Step4() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  const { valid, errors } = validateStep(4, formData);

  const handleAddBombeiro = () => {
    setFormData({
      ...formData,
      bombeiros: [...formData.bombeiros, { nome: '', vtr: '', combatente: false }], // Adiciona um novo objeto vazio
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
        renderItem={({ item, index }) => {
          // Opções vindas das viaturas do step3 (sem linhas vazias, que
          // colidiriam com a opção "Selecione..."). Se o bombeiro já tem uma
          // VTR que foi removida/renomeada no step3, mantém ela na lista para
          // não apagar a seleção silenciosamente.
          const vtrOptions = (formData.tabelaVTRs || [])
            .map((val) => val.vtr)
            .filter((vtr) => vtr)
            .map((vtr) => ({ label: vtr, value: vtr }));
          const vtrData =
            item.vtr && !vtrOptions.some((o) => o.value === item.vtr)
              ? [...vtrOptions, { label: item.vtr, value: item.vtr }]
              : vtrOptions;

          return (
            <View style={styles.bombeiroRow}>
              <TextInput
                style={styles.input}
                placeholder={`Bombeiro ${index + 1}`}
                placeholderTextColor="#ccc"
                value={item.nome}
                onChangeText={(value) => handleBombeiroChange(index, 'nome', value)}
              />
              <FormDropdown
                style={styles.input}
                data={vtrData}
                includeEmpty
                value={item.vtr}
                onChange={(value) => handleBombeiroChange(index, 'vtr', value)}
              />
              {formData.bombeiros.length > 1 && (
                <TouchableOpacity onPress={() => handleRemoveBombeiro(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
        ListFooterComponent={
          <>
            <Button title="Adicionar Bombeiro" onPress={handleAddBombeiro} />
            {errors.bombeiros && <Text style={styles.errorText}>{errors.bombeiros}</Text>}
          </>
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

      <StepFooter onBack={handleBack} onNext={handleNext} nextDisabled={!valid} />
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
  errorText: { color: 'red', fontSize: 12, marginTop: 5, marginBottom: 10 },
  containerFlatList: {
    marginBottom: 10,
  },
});
