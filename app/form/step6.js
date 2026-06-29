import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { formatAreaInput } from '../../utils/masks';
import { TIPO_PERDA_OPTIONS } from '../../constants/options';
import { colors, commonStyles } from '../../constants/theme';
import OptionSelector from '../../components/OptionSelector';
import StepFooter from '../../components/StepFooter';

export default function Step6() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleSelectPerda = (value) => {
    setFormData({ ...formData, tipoPerda: value });
  };

  const handleInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: formatAreaInput(formData[section][field], value),
      },
    });
  };

  const handleNext = () => {
    router.push('/form/step7');
  };

  const handleBack = () => {
    router.back();
  };

  const renderAreaInputs = (section, fields) => (
    <>
      {fields.map((field) => (
        <View key={field.form}>
          <Text style={commonStyles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            placeholder="Exemplo: 500 m²"
            placeholderTextColor={colors.placeholder}
            value={formData[section][field.form]}
            onChangeText={(value) => handleInputChange(section, field.form, value)}
            keyboardType="numeric"
          />
        </View>
      ))}
    </>
  );

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={commonStyles.container}>
        <Text style={styles.title}>Informações Sobre o Incêndio</Text>

        <Text style={commonStyles.label}>Tipo de Perda</Text>
        <OptionSelector
          horizontal
          options={TIPO_PERDA_OPTIONS}
          selected={formData.tipoPerda}
          onSelect={handleSelectPerda}
        />

        <Text style={commonStyles.label}>Possível Causa do Incêndio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descreva a possível causa do incêndio"
          placeholderTextColor={colors.placeholder}
          multiline
          value={formData.causaIncendio}
          onChangeText={(value) => setFormData({ ...formData, causaIncendio: value })}
        />

        <Text style={styles.title}>Área Atingida</Text>
        {renderAreaInputs('areaAtingida', [
          { label: 'Edificada', form: 'edificada' },
          { label: 'Não Edificada', form: 'naoEdificada' },
        ])}

        <Text style={[styles.title, { marginTop: 15 }]}>Área Total</Text>
        {renderAreaInputs('areaTotal', [
          { label: 'Imóvel', form: 'imovel' },
          { label: 'Terreno', form: 'terreno' },
        ])}

        <StepFooter onBack={handleBack} onNext={handleNext} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
  },
  textArea: { height: 100, textAlignVertical: 'top', marginBottom: 15 },
});
