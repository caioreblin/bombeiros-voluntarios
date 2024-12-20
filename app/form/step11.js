import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

export default function Step11() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const [isLavagemPista, setIsLavagemPista] = useState(!!formData.lavagemPista);
  const [isVazamentoProdutos, setIsVazamentoProdutos] = useState(!!formData.vazamentoProdutosPerigosos);

  const handleNext = () => {
    console.log('Form Data:', formData);
    router.push('/form/step12');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Houve</Text>

      {/* Lavagem de Pista */}
      <View style={styles.toggleContainer}>
        <Text style={styles.labelToggle}>Lavagem de Pista</Text>
        <Switch
          value={isLavagemPista}
          onValueChange={(value) => {
            setIsLavagemPista(value);
            if (!value) {
              setFormData({ ...formData, lavagemPista: false });
            }
          }}
          trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
          thumbColor={isLavagemPista ? '#e21b1b' : '#f4f3f4'}
        />
      </View>

      {isLavagemPista && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantidade de Litros</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Digite a quantidade em litros"
            placeholderTextColor="#ccc"
            value={formData.lavagemPista || ''}
            onChangeText={(text) => setFormData({ ...formData, lavagemPista: text })}
          />
        </View>
      )}

      {/* Vazamento de Produtos Perigosos */}
      <View style={styles.toggleContainer}>
        <Text style={styles.labelToggle}>Vazamento de Produtos Perigosos</Text>
        <Switch
          value={isVazamentoProdutos}
          onValueChange={(value) => {
            setIsVazamentoProdutos(value);
            if (!value) {
              setFormData({
                ...formData,
                vazamentoProdutosPerigosos: false,
                obsVazamentoProdutosPerigosos: '',
              });
            }
          }}
          trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
          thumbColor={isVazamentoProdutos ? '#e21b1b' : '#f4f3f4'}
        />
      </View>

      {isVazamentoProdutos && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome do Produto</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do produto"
              placeholderTextColor="#ccc"
              value={formData.vazamentoProdutosPerigosos || ''}
              onChangeText={(text) => setFormData({ ...formData, vazamentoProdutosPerigosos: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Observações:</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Digite observações sobre o vazamento"
              placeholderTextColor="#ccc"
              value={formData.obsVazamentoProdutosPerigosos || ''}
              onChangeText={(text) =>
                setFormData({ ...formData, obsVazamentoProdutosPerigosos: text })
              }
              multiline
              numberOfLines={4}
            />
          </View>
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Voltar" onPress={handleBack} />
        <Button
          title="Próximo"
          onPress={handleNext}
          disabled={
            (isLavagemPista && !formData.lavagemPista) ||
            (isVazamentoProdutos &&
              (!formData.vazamentoProdutosPerigosos || !formData.obsVazamentoProdutosPerigosos))
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  toggleContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' },
  label: { fontSize: 16, marginRight: 10, marginBottom: 5 },
  labelToggle: { fontSize: 16, marginRight: 10, fontWeight: 'bold' },
  inputContainer: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
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
