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
    setFormData({
      ...formData,
      detalheIncendio: value,
      // Limpa os materiais ao sair de "Mista".
      materiaisMistos: value === 'Mista' ? formData.materiaisMistos : '',
    });
  };

  const handleMateriaisMistosChange = (value) => {
    setFormData({ ...formData, materiaisMistos: value });
  };

  const handleObservationChange = (value) => {
    setFormData({ ...formData, observacaoIncendio: value });
  };

  const handleNext = () => {
    // Tela 9 (Vazamento de Gás) removida do fluxo — vai direto para a Tela 10.
    router.push('/form/step10');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>{formData.incendioEm}</Text>
        <OptionSelector
          options={options}
          selected={formData.detalheIncendio}
          onSelect={handleDetailChange}
        />

        {formData.detalheIncendio === 'Mista' && (
          <>
            <Text style={[commonStyles.label, { marginTop: 20 }]}>Materiais mistos:</Text>
            <TextInput
              style={commonStyles.input}
              value={formData.materiaisMistos}
              onChangeText={handleMateriaisMistosChange}
              placeholder="Indique os materiais (ex.: alvenaria e madeira)"
              placeholderTextColor={colors.placeholder}
            />
          </>
        )}

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
