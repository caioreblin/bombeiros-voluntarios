import React, { useContext } from 'react';
import { View, ScrollView, Text, TextInput, Switch } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import { validateStep } from '../../validation/stepValidation';
import { formatCpfInput } from '../../utils/masks';
import { VICTIM_OPTIONS } from '../../constants/options';
import { colors, commonStyles } from '../../constants/theme';
import OptionSelector from '../../components/OptionSelector';
import StepFooter from '../../components/StepFooter';

export default function Step1() {
  const { formData, setFormData } = useContext(FormContext);
  const router = useRouter();
  const { valid, errors } = validateStep(1, formData);

  const handleChange = (field, value) => {
    setFormData((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleNext = () => {
    router.push('/form/step2');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={commonStyles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Informações da Vítima</Text>

        <Text style={commonStyles.label}>Nome da Vítima</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite o nome"
          placeholderTextColor={colors.placeholder}
          value={formData.nomeVitima}
          onChangeText={(value) => handleChange('nomeVitima', value)}
        />
        {errors.nomeVitima && <Text style={commonStyles.errorText}>{errors.nomeVitima}</Text>}

        <Text style={commonStyles.label}>CPF</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="000.000.000-00"
          placeholderTextColor={colors.placeholder}
          value={formData.cpf}
          keyboardType="numeric"
          maxLength={14}
          onChangeText={(value) => handleChange('cpf', formatCpfInput(formData.cpf || '', value))}
        />

        <Text style={commonStyles.label}>Fone</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite o telefone"
          placeholderTextColor={colors.placeholder}
          value={formData.fone}
          keyboardType="numeric"
          onChangeText={(value) => handleChange('fone', value)}
        />

        <Text style={commonStyles.label}>Endereço</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite o endereço"
          placeholderTextColor={colors.placeholder}
          value={formData.endereco}
          onChangeText={(value) => handleChange('endereco', value)}
        />
        {errors.endereco && <Text style={commonStyles.errorText}>{errors.endereco}</Text>}

        <Text style={commonStyles.label}>Número</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite o número"
          placeholderTextColor={colors.placeholder}
          value={formData.numero}
          keyboardType="numeric"
          onChangeText={(value) => handleChange('numero', value)}
        />

        <Text style={commonStyles.label}>Bairro</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="Digite o bairro"
          placeholderTextColor={colors.placeholder}
          value={formData.bairro}
          onChangeText={(value) => handleChange('bairro', value)}
        />

        <Text style={commonStyles.label}>Vítima</Text>
        <OptionSelector
          options={VICTIM_OPTIONS}
          selected={formData.vitima}
          onSelect={(value) => handleChange('vitima', value)}
        />

        <View style={commonStyles.switchContainer}>
          <Text style={commonStyles.label}>Empresa</Text>
          <Switch
            value={formData.empresa}
            onValueChange={(value) => handleChange('empresa', value)}
            trackColor={{ false: colors.trackOff, true: colors.trackOn }}
            thumbColor={formData.empresa ? colors.thumbOn : colors.thumbOff}
          />
        </View>

        <StepFooter onBack={handleBack} onNext={handleNext} nextDisabled={!valid} />
      </View>
    </ScrollView>
  );
}
