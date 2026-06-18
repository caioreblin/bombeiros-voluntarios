import React, { useContext } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { DETALHE_INCENDIO_MAP } from '../../constants/options';
import { colors, commonStyles } from '../../constants/theme';
import OptionSelector from '../../components/OptionSelector';
import StepFooter from '../../components/StepFooter';

export default function Step8() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  const options = DETALHE_INCENDIO_MAP[formData.incendioEm] || [];

  const handleDetailChange = (value) => {
    setFormData({ ...formData, detalheIncendio: value });
  };

  const handleObservationChange = (value) => {
    setFormData({ ...formData, observacaoIncendio: value });
  };

  const handleNext = () => {
    router.push('/form/step9');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>{formData.incendioEm}</Text>
        <OptionSelector
          options={options}
          selected={formData.detalheIncendio}
          onSelect={handleDetailChange}
        />

        <Text style={[commonStyles.label, { marginTop: 20 }]}>Observação:</Text>
        <TextInput
          style={commonStyles.textArea}
          value={formData.observacaoIncendio}
          onChangeText={handleObservationChange}
          multiline
          numberOfLines={4}
          placeholder="Digite observações sobre o incêndio"
          placeholderTextColor={colors.placeholder}
        />

        <StepFooter onBack={handleBack} onNext={handleNext} />
      </View>
    </ScrollView>
  );
}
