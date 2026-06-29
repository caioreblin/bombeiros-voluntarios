import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { colors, commonStyles } from '../../constants/theme';
import ToggleRow from '../../components/ToggleRow';
import StepFooter from '../../components/StepFooter';

export default function Step11() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleNext = () => {
    router.push('/form/step12');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={commonStyles.title}>Houve</Text>

      {/* Lavagem de Pista */}
      <ToggleRow
        bold
        label="Lavagem de Pista"
        value={formData.lavagemPista}
        onValueChange={(value) =>
          setFormData({
            ...formData,
            lavagemPista: value,
            ...(value ? {} : { litrosLavagemPista: '' }),
          })
        }
      />

      {formData.lavagemPista && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Quantidade de Litros</Text>
          <TextInput
            style={commonStyles.input}
            keyboardType="numeric"
            placeholder="Digite a quantidade em litros"
            placeholderTextColor={colors.placeholder}
            value={formData.litrosLavagemPista || ''}
            onChangeText={(text) => setFormData({ ...formData, litrosLavagemPista: text })}
          />
        </View>
      )}

      {/* Vazamento de Produtos Perigosos */}
      <ToggleRow
        bold
        label="Vazamento de Produtos Perigosos"
        value={formData.vazamentoProdutosPerigosos}
        onValueChange={(value) =>
          setFormData({
            ...formData,
            vazamentoProdutosPerigosos: value,
            ...(value ? {} : { nomeProdutoPerigoso: '', obsVazamentoProdutosPerigosos: '' }),
          })
        }
      />

      {formData.vazamentoProdutosPerigosos && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome do Produto</Text>
            <TextInput
              style={commonStyles.input}
              placeholder="Digite o nome do produto"
              placeholderTextColor={colors.placeholder}
              value={formData.nomeProdutoPerigoso || ''}
              onChangeText={(text) => setFormData({ ...formData, nomeProdutoPerigoso: text })}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Observações:</Text>
            <TextInput
              style={commonStyles.textArea}
              placeholder="Digite observações sobre o vazamento"
              placeholderTextColor={colors.placeholder}
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

      <StepFooter
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={
          (formData.lavagemPista && !formData.litrosLavagemPista) ||
          (formData.vazamentoProdutosPerigosos &&
            (!formData.nomeProdutoPerigoso || !formData.obsVazamentoProdutosPerigosos))
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: colors.white },
  label: { fontSize: 16, marginRight: 10, marginBottom: 5 },
  inputContainer: { marginBottom: 15 },
});
