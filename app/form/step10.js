import React, { useContext } from 'react';
import { View, Text, Switch, Button, StyleSheet, ScrollView } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Tipos de Sistema de Prevenção Existentes</Text>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>SPE – Extintores</Text>
          <Switch
            value={formData.SPEextintores || false}
            onValueChange={() => handleToggle('SPEextintores')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.SPEextintores ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>SHP - Hidrantes</Text>
          <Switch
            value={formData.SHPhidrantes || false}
            onValueChange={() => handleToggle('SHPhidrantes')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.SHPhidrantes ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>SADI - Alarme</Text>
          <Switch
            value={formData.SADIalarme || false}
            onValueChange={() => handleToggle('SADIalarme')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.SADIalarme ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>SIE - Iluminação de emergência</Text>
          <Switch
            value={formData.SIEiluminacaoEmergencia || false}
            onValueChange={() => handleToggle('SIEiluminacaoEmergencia')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.SIEiluminacaoEmergencia ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>SPK - Sprinkler</Text>
          <Switch
            value={formData.SPKsprinkler || false}
            onValueChange={() => handleToggle('SPKsprinkler')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.SPKsprinkler ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>SAL - Sinalização p/ abandono</Text>
          <Switch
            value={formData.SALsinalizacaoAbandono || false}
            onValueChange={() => handleToggle('SALsinalizacaoAbandono')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.SALsinalizacaoAbandono ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>EE - Elevador de emergência</Text>
          <Switch
            value={formData.EEelevadorEmergencia || false}
            onValueChange={() => handleToggle('EEelevadorEmergencia')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.EEelevadorEmergencia ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Exaustão de Fumaça</Text>
          <Switch
            value={formData.exaustaoFumaca || false}
            onValueChange={() => handleToggle('exaustaoFumaca')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.exaustaoFumaca ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Ventilação Permanente (GLP)</Text>
          <Switch
            value={formData.ventilacaoPermanenteGLP || false}
            onValueChange={() => handleToggle('ventilacaoPermanenteGLP')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.ventilacaoPermanenteGLP ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Compartimentação</Text>
          <Switch
            value={formData.compartimentacao || false}
            onValueChange={() => handleToggle('compartimentacao')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.compartimentacao ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Acesso de viaturas</Text>
          <Switch
            value={formData.acessoViaturas || false}
            onValueChange={() => handleToggle('acessoViaturas')}
            trackColor={{ false: '#e0e0e0', true: '#ff4d4d' }}
            thumbColor={formData.acessoViaturas ? '#e21b1b' : '#f4f3f4'}
          />
        </View>

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
  label: { fontSize: 16},
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});
