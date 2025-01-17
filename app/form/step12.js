import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';

export default function Step12() {
  const { formData, setFormData } = useContext(FormContext);
  const tiposExtintores = ['Água', 'CO2', 'P.Q.S', 'Pós especiais', 'Halon', 'Classe K'];
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(formData.utilizadoPor || '');

  const handleNext = () => {
      setFormData({ ...formData, utilizadoPor: selectedOption });
      console.log("Form Data:", formData);
      router.push("/form/step13");
  };

  const handleBack = () => {
      router.back();
  };

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Extintores</Text>

          <View style={styles.switchContainer}>
              <Text style={styles.label}>Usado Extintor</Text>
              <Switch
                  value={formData.usadoExtintor || false}
                  onValueChange={(value) =>
                      setFormData({ ...formData, usadoExtintor: value })
                  }
                  trackColor={{ false: "#e0e0e0", true: "#ff4d4d" }}
                  thumbColor={formData.usadoExtintor ? "#e21b1b" : "#f4f3f4"}
              />
          </View>

          {formData.usadoExtintor && (
              <>
                  <Text style={styles.subTitle}>Utilizado por</Text>
                  <TouchableOpacity
                      style={[
                          styles.radioButton,
                          selectedOption === "Bombeiro" && styles.radioSelected,
                      ]}
                      onPress={() => setSelectedOption("Bombeiro")}
                  >
                      <Text
                          style={[
                              styles.radioText,
                              selectedOption === "Bombeiro" &&
                                  styles.radioSelectedText,
                          ]}
                      >
                          Bombeiro
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={[
                          styles.radioButton,
                          selectedOption === "Empresa" && styles.radioSelected,
                      ]}
                      onPress={() => setSelectedOption("Empresa")}
                  >
                      <Text
                          style={[
                              styles.radioText,
                              selectedOption === "Empresa" &&
                                  styles.radioSelectedText,
                          ]}
                      >
                          Empresa
                      </Text>
                  </TouchableOpacity>

                  <View style={styles.inputContainer}>
                      <Text style={styles.label}>Quantos</Text>
                      <TextInput
                          style={styles.input}
                          keyboardType="numeric"
                          placeholder="Digite a quantidade"
                          placeholderTextColor="#ccc"
                          value={formData.quantosExtintores || ""}
                          onChangeText={(text) =>
                              setFormData({
                                  ...formData,
                                  quantosExtintores: text,
                              })
                          }
                      />
                  </View>

                  <View style={styles.inputContainer}>
                      <Text style={styles.label}>Tipo</Text>
                      <Dropdown
                          style={styles.input}
                          selectedTextStyle={{ fontSize: 14 }}
                          itemTextStyle={{ fontSize: 14 }}
                          data={
                              tiposExtintores?.map((val) => ({
                                  label: val,
                                  value: val,
                              })) || []
                          }
                          labelField="label"
                          valueField="value"
                          value={formData.tipoExtintor || tiposExtintores[0]}
                          onChange={(item) =>
                              setFormData({
                                  ...formData,
                                  tipoExtintor: item.value,
                              })
                          }
                          maxHeight={190}
                      />
                  </View>
              </>
          )}

          <View style={styles.buttonContainer}>
              <Button title="Voltar" onPress={handleBack} />
              <Button title="Próximo" onPress={handleNext} />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  subTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  radioGroup: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  radioButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  radioSelected: { backgroundColor: '#e21b1b' },
  radioText: { fontSize: 16 },
  radioSelectedText: { color: '#fff', fontWeight: 'bold' },
  inputContainer: { marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
