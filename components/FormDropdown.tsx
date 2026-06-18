import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { commonStyles } from '../constants/theme';

type DropdownItem = { label: string; value: string };
type DataOption = string | DropdownItem;

interface FormDropdownProps {
  data: DataOption[];
  value: string;
  onChange: (value: string) => void;
  maxHeight?: number;
  includeEmpty?: boolean;
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const normalize = (options: DataOption[]): DropdownItem[] =>
  options.map((opt) => (typeof opt === 'string' ? { label: opt, value: opt } : opt));

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
  const items = normalize(data || []);
  const finalData: DropdownItem[] = includeEmpty
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
      onChange={(item: DropdownItem) => onChange(item.value)}
      maxHeight={maxHeight}
    />
  );
}
