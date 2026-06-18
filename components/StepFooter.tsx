import React from 'react';
import { View, Button } from 'react-native';
import { commonStyles } from '../constants/theme';

interface StepFooterProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

export default function StepFooter({
  onBack,
  onNext,
  nextLabel = 'Próximo',
  nextDisabled = false,
}: StepFooterProps) {
  return (
    <View style={commonStyles.buttonContainer}>
      <Button title="Voltar" onPress={onBack} />
      <Button title={nextLabel} onPress={onNext} disabled={nextDisabled} />
    </View>
  );
}
