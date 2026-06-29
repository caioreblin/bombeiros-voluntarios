import React, { useContext } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { GAS_OPTIONS } from '../../constants/options';
import { colors, commonStyles } from '../../constants/theme';
import OptionSelector from '../../components/OptionSelector';
import ToggleRow from '../../components/ToggleRow';
import StepFooter from '../../components/StepFooter';

export default function Step9() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleToggleChange = (value) => {
    if (!value) {
      setFormData({ ...formData, vazamentoGas: false, tipoGasVazamento: '', observacaoGas: '' });
    } else {
      setFormData({ ...formData, vazamentoGas: true });
    }
  };

  const handleGasChange = (value) => {
    setFormData({ ...formData, vazamentoGas: true, tipoGasVazamento: value });
  };

  const handleObservationChange = (value) => {
    setFormData({ ...formData, observacaoGas: value });
  };

  const handleNext = () => {
    router.push('/form/step10');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Vazamento de Gás</Text>

        <ToggleRow
          label="Houve Vazamento"
          value={formData.vazamentoGas}
          onValueChange={handleToggleChange}
        />

        {formData.vazamentoGas && (
          <>
            <OptionSelector
              options={GAS_OPTIONS}
              selected={formData.tipoGasVazamento}
              onSelect={handleGasChange}
            />

            <Text style={[commonStyles.label, { marginTop: 15 }]}>Observação:</Text>
            <TextInput
              style={commonStyles.textArea}
              value={formData.observacaoGas}
              onChangeText={handleObservationChange}
              multiline
              numberOfLines={4}
              placeholder="Digite observações sobre o vazamento de gás"
              placeholderTextColor={colors.placeholder}
            />
          </>
        )}

        <StepFooter
          onBack={handleBack}
          onNext={handleNext}
          nextDisabled={formData.vazamentoGas && !formData.tipoGasVazamento}
        />
      </View>
    </ScrollView>
  );
}
