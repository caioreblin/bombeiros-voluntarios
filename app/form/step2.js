import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { formatDateInput, formatTimeInput } from '../../utils/masks';
import { validateStep } from '../../validation/stepValidation';
import { EQUIPE_OPTIONS, IR_OPTIONS } from '../../constants/options';
import { colors, commonStyles } from '../../constants/theme';
import FormDropdown from '../../components/FormDropdown';
import StepFooter from '../../components/StepFooter';

export default function Step2() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

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

  const { valid, errors } = validateStep(2, formData);

  useEffect(() => {
    setFormData((prevForm) => ({
      ...prevForm,
      data: prevForm.data || formatDate(),
      hch: prevForm.hch || formatTime(),
      equipe: prevForm.equipe || EQUIPE_OPTIONS[0],
      codigoIR: prevForm.codigoIR || IR_OPTIONS[0],
    }));
  }, []);

  const handleChange = (field, value) => {
    let formattedValue = value;

    if (field === 'data') {
      formattedValue = formatDateInput(formData.data, value);
    }

    if (field === 'hch') {
      formattedValue = formatTimeInput(formData.hch, value);
    }

    setFormData((prevForm) => ({ ...prevForm, [field]: formattedValue }));
  };

  const handleNext = () => {
    router.push('/form/step3');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Dados da Ocorrência</Text>

        <Text style={commonStyles.label}>Data</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite a data (DD/MM/AAAA)"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={formData.data}
          onChangeText={(value) => handleChange('data', value)}
        />
        {errors.data && <Text style={commonStyles.errorText}>{errors.data}</Text>}

        <Text style={commonStyles.label}>H. CH</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite a data (DD/MM/AAAA)"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={formData.hch}
          onChangeText={(value) => handleChange('hch', value)}
        />
        {errors.hch && <Text style={commonStyles.errorText}>{errors.hch}</Text>}

        <Text style={commonStyles.label}>Número B.O.</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite o número do B.O."
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={formData.numeroBO}
          onChangeText={(value) => handleChange('numeroBO', value)}
        />
        {errors.numeroBO && <Text style={commonStyles.errorText}>{errors.numeroBO}</Text>}

        <Text style={commonStyles.label}>Equipe</Text>
        <FormDropdown
          style={styles.dropdown}
          data={EQUIPE_OPTIONS}
          value={formData.equipe}
          onChange={(value) => handleChange('equipe', value)}
        />

        <Text style={commonStyles.label}>Despachador</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite o nome do despachador"
          placeholderTextColor={colors.placeholder}
          value={formData.despachador}
          onChangeText={(value) => handleChange('despachador', value)}
        />

        <Text style={commonStyles.label}>Código de IR</Text>
        <FormDropdown
          style={styles.dropdown}
          data={IR_OPTIONS}
          value={formData.codigoIR}
          onChange={(value) => handleChange('codigoIR', value)}
        />

        <StepFooter onBack={handleBack} onNext={handleNext} nextDisabled={!valid} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dropdown: { justifyContent: 'center' },
});
