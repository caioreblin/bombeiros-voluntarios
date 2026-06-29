import React, { useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { INCENDIO_EM_OPTIONS } from '../../constants/options';
import { colors, commonStyles } from '../../constants/theme';
import OptionSelector from '../../components/OptionSelector';
import StepFooter from '../../components/StepFooter';

export default function Step7() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const isOutroTipo = formData.incendioEm === 'Outro Tipo';

  const handleOptionChange = (value) => {
    setFormData({
      ...formData,
      incendioEm: value,
      // Limpa o tipo livre ao sair de "Outro Tipo".
      incendioOutroTipo: value === 'Outro Tipo' ? formData.incendioOutroTipo : '',
    });
  };

  const handleOutroTipoChange = (value) => {
    setFormData({ ...formData, incendioOutroTipo: value });
  };

  const handleNext = () => {
    router.push('/form/step8');
  };

  const handleBack = () => {
    router.back();
  };

  const nextDisabled =
    !formData.incendioEm || (isOutroTipo && !formData.incendioOutroTipo?.trim());

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Incêndio em:</Text>
      <OptionSelector
        options={INCENDIO_EM_OPTIONS}
        selected={formData.incendioEm}
        onSelect={handleOptionChange}
      />

      {isOutroTipo && (
        <>
          <Text style={[commonStyles.label, { marginTop: 20 }]}>Qual tipo?</Text>
          <TextInput
            style={commonStyles.input}
            value={formData.incendioOutroTipo}
            onChangeText={handleOutroTipoChange}
            placeholder="Especifique o tipo de incêndio"
            placeholderTextColor={colors.placeholder}
          />
        </>
      )}

      <StepFooter onBack={handleBack} onNext={handleNext} nextDisabled={nextDisabled} />
    </View>
  );
}
