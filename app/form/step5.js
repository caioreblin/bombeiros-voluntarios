import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { commonStyles } from '../../constants/theme';
import ToggleRow from '../../components/ToggleRow';
import StepFooter from '../../components/StepFooter';

export default function Step5() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleToggleCombatente = (index) => {
    const updatedBombeiros = [...formData.bombeiros];
    updatedBombeiros[index].combatente = !updatedBombeiros[index].combatente;
    setFormData({ ...formData, bombeiros: updatedBombeiros });
  };

  const handleNext = () => {
    router.push('/form/step6');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer}>
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Bombeiros combatentes</Text>

        {formData.bombeiros.map((bombeiro, index) => (
          <ToggleRow
            key={index}
            label={bombeiro.nome || `Bombeiro ${index + 1}`}
            value={bombeiro.combatente}
            onValueChange={() => handleToggleCombatente(index)}
          />
        ))}

        <StepFooter onBack={handleBack} onNext={handleNext} />
      </View>
    </ScrollView>
  );
}
