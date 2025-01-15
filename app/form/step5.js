import React, { useContext } from 'react';
import { View, Text, Switch, Button, StyleSheet, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

export default function Step10() {
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Bombeiros combatentes</Text>

        {formData.bombeiros.map((bombeiro, index) => (
          <View key={index} style={styles.toggleContainer}>
            <Text style={styles.label}>{bombeiro.nome || `Bombeiro ${index + 1}`}</Text>
            <Switch
              value={bombeiro.combatente}
              onValueChange={() => handleToggleCombatente(index)}
              trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
              thumbColor={bombeiro.combatente ? '#e21b1b' : '#f4f3f4'}
            />
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button title="Voltar" onPress={handleBack} />
          <Button title="Próximo" onPress={handleNext} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: { fontSize: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
