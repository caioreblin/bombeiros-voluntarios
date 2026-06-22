import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { commonStyles } from '../constants/theme';
import { toOptions, Option, OptionItem } from '../utils/options';

interface FormDropdownProps {
  data: Option[];
  value: string;
  onChange: (value: string) => void;
  maxHeight?: number;
  includeEmpty?: boolean;
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function FormDropdown({
  data,
  value,
  onChange,
  maxHeight = 190,
  includeEmpty = false,
  emptyLabel = 'Selecione...',
  style,
  containerStyle,
}: FormDropdownProps) {
  const items = toOptions(data || []);
  const finalData: OptionItem[] = includeEmpty
    ? [{ label: emptyLabel, value: '' }, ...items]
    : items;

  return (
    <Dropdown
      style={[commonStyles.input, style]}
      containerStyle={containerStyle}
      selectedTextStyle={{ fontSize: 14 }}
      itemTextStyle={{ fontSize: 14 }}
      data={finalData}
      labelField="label"
      valueField="value"
      value={value}
      onChange={(item: OptionItem) => onChange(item.value)}
      maxHeight={maxHeight}
    />
  );
}
