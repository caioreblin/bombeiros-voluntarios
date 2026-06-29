import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../constants/theme';

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
      <Pressable
        onPress={onBack}
        style={({ pressed }) => [
          styles.button,
          styles.backButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.backText}>Voltar</Text>
      </Pressable>

      <Pressable
        onPress={onNext}
        disabled={nextDisabled}
        style={({ pressed }) => [
          styles.button,
          styles.nextButton,
          nextDisabled && styles.nextButtonDisabled,
          pressed && !nextDisabled && styles.pressed,
        ]}
      >
        <Text style={[styles.nextText, nextDisabled && styles.nextTextDisabled]}>
          {nextLabel}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: colors.back,
    marginRight: 8,
  },
  nextButton: {
    backgroundColor: colors.next,
    marginLeft: 8,
  },
  nextButtonDisabled: {
    backgroundColor: colors.disabledBg,
  },
  pressed: {
    opacity: 0.7,
  },
  backText: {
    color: colors.backText,
    fontSize: 16,
    fontWeight: '600',
  },
  nextText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  nextTextDisabled: {
    color: colors.disabledText,
  },
});
