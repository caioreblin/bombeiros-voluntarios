import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../constants/theme';
import { toOptions, Option } from '../utils/options';

interface OptionSelectorProps {
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
  horizontal?: boolean;
}

export default function OptionSelector({
  options,
  selected,
  onSelect,
  horizontal = false,
}: OptionSelectorProps) {
  const items = toOptions(options);

  return (
    <View style={horizontal ? styles.rowGroup : undefined}>
      {items.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            style={[
              horizontal ? styles.horizontalOption : commonStyles.optionContainer,
              isSelected && commonStyles.selectedOptionContainer,
            ]}
            onPress={() => onSelect(opt.value)}
          >
            <Text
              style={[
                horizontal ? styles.horizontalText : commonStyles.optionText,
                isSelected &&
                  (horizontal ? styles.horizontalTextSelected : commonStyles.selectedOptionText),
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  rowGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  horizontalOption: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: colors.optionBg,
    borderRadius: 5,
    alignItems: 'center',
  },
  horizontalText: { color: '#000', fontSize: 12 },
  horizontalTextSelected: { color: colors.white, fontSize: 12 },
});
