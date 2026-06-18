import React, { useContext } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { TIPOS_EXTINTORES, UTILIZADO_POR_OPTIONS } from '../../constants/options';
import { colors, commonStyles } from '../../constants/theme';
import OptionSelector from '../../components/OptionSelector';
import ToggleRow from '../../components/ToggleRow';
import FormDropdown from '../../components/FormDropdown';
import StepFooter from '../../components/StepFooter';

export default function Step12() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleNext = () => {
    router.push('/form/step13');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Extintores</Text>

      <ToggleRow
        label="Usado Extintor"
        value={formData.usadoExtintor || false}
        onValueChange={(value) => setFormData({ ...formData, usadoExtintor: value })}
      />

      {formData.usadoExtintor && (
        <>
          <Text style={styles.subTitle}>Utilizado por</Text>
          <OptionSelector
            options={UTILIZADO_POR_OPTIONS}
            selected={formData.utilizadoPor}
            onSelect={(value) => setFormData({ ...formData, utilizadoPor: value })}
          />

          <View style={styles.inputContainer}>
            <Text style={commonStyles.label}>Quantos</Text>
            <TextInput
              style={commonStyles.input}
              keyboardType="numeric"
              placeholder="Digite a quantidade"
              placeholderTextColor={colors.placeholder}
              value={formData.quantosExtintores || ''}
              onChangeText={(text) => setFormData({ ...formData, quantosExtintores: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={commonStyles.label}>Tipo</Text>
            <FormDropdown
              data={TIPOS_EXTINTORES}
              value={formData.tipoExtintor || TIPOS_EXTINTORES[0]}
              onChange={(value) => setFormData({ ...formData, tipoExtintor: value })}
            />
          </View>
        </>
      )}

      <StepFooter onBack={handleBack} onNext={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  inputContainer: { marginTop: 15 },
});
