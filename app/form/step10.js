import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { commonStyles } from '../../constants/theme';
import ToggleRow from '../../components/ToggleRow';
import StepFooter from '../../components/StepFooter';

const PREVENTION_SYSTEMS = [
  { field: 'SPEextintores', label: 'SPE – Extintores' },
  { field: 'SHPhidrantes', label: 'SHP - Hidrantes' },
  { field: 'SADIalarme', label: 'SADI - Alarme' },
  { field: 'SIEiluminacaoEmergencia', label: 'SIE - Iluminação de emergência' },
  { field: 'SPKsprinkler', label: 'SPK - Sprinkler' },
  { field: 'SALsinalizacaoAbandono', label: 'SAL - Sinalização p/ abandono' },
  { field: 'EEelevadorEmergencia', label: 'EE - Elevador de emergência' },
  { field: 'exaustaoFumaca', label: 'Exaustão de Fumaça' },
  { field: 'ventilacaoPermanenteGLP', label: 'Ventilação Permanente (GLP)' },
  { field: 'compartimentacao', label: 'Compartimentação' },
  { field: 'acessoViaturas', label: 'Acesso de viaturas' },
];

export default function Step10() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();

  const handleToggle = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  const handleNext = () => {
    router.push('/form/step11');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Tipos de Sistema de Prevenção Existentes</Text>

        {PREVENTION_SYSTEMS.map(({ field, label }) => (
          <ToggleRow
            key={field}
            label={label}
            value={formData[field] || false}
            onValueChange={() => handleToggle(field)}
          />
        ))}

        <StepFooter onBack={handleBack} onNext={handleNext} />
      </View>
    </ScrollView>
  );
}
