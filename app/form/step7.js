import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { INCENDIO_EM_OPTIONS } from '../../constants/options';
import { commonStyles } from '../../constants/theme';
import OptionSelector from '../../components/OptionSelector';
import StepFooter from '../../components/StepFooter';

export default function Step7() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleOptionChange = (value) => {
    setFormData({ ...formData, incendioEm: value });
  };

  const handleNext = () => {
    router.push('/form/step8');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Incêndio em:</Text>
      <OptionSelector
        options={INCENDIO_EM_OPTIONS}
        selected={formData.incendioEm}
        onSelect={handleOptionChange}
      />
      <StepFooter onBack={handleBack} onNext={handleNext} nextDisabled={!formData.incendioEm} />
    </View>
  );
}
