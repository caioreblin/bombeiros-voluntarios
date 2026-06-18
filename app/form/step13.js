import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { colors, commonStyles } from '../../constants/theme';
import StepFooter from '../../components/StepFooter';

export default function Step13() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleNext = () => {
    router.push('/form/step14');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.label}>Anotações gerais:</Text>
      <TextInput
        style={[commonStyles.textArea, styles.textArea]}
        placeholder="Digite as anotações"
        placeholderTextColor={colors.placeholder}
        value={formData.anotacoes || ''}
        onChangeText={(text) => setFormData({ ...formData, anotacoes: text })}
        multiline
      />

      <Text style={commonStyles.label}>Observações gerais:</Text>
      <TextInput
        style={[commonStyles.textArea, styles.textArea]}
        placeholder="Insira as observações"
        placeholderTextColor={colors.placeholder}
        value={formData.observacoes || ''}
        onChangeText={(text) => setFormData({ ...formData, observacoes: text })}
        multiline
      />

      <Text style={commonStyles.label}>Materiais Danificados na Ocorrência:</Text>
      <TextInput
        style={[commonStyles.textArea, styles.textArea]}
        placeholder="Descreva os materiais danificados"
        placeholderTextColor={colors.placeholder}
        value={formData.materiaisDanificadosOcorrencia || ''}
        onChangeText={(text) => setFormData({ ...formData, materiaisDanificadosOcorrencia: text })}
        multiline
      />

      <StepFooter onBack={handleBack} onNext={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  textArea: { width: '100%', marginBottom: 20 },
});
