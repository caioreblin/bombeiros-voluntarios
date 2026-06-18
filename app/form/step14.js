import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert, Platform } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { validateStep } from '../../validation/stepValidation';
import { buildReportHtml } from '../../utils/pdfTemplate';
import StepFooter from '../../components/StepFooter';

const loadLogoDataUri = async () => {
    try {
        const asset = Asset.fromModule(require('../../assets/logo.png'));
        await asset.downloadAsync();

        if (Platform.OS === 'web') {
            return asset.uri;
        }

        const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        return `data:image/png;base64,${base64}`;
    } catch (error) {
        return '';
    }
};

export default function Step14() {
    const { formData, setFormData, clearForm } = useContext(FormContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { valid, errors } = validateStep(14, formData);

    const handleGeneratePDF = async () => {
        setIsLoading(true);
        try {
            const logoDataUri = await loadLogoDataUri();
            const htmlContent = buildReportHtml(formData, logoDataUri);

            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            setIsLoading(false);

            const fileName = "Relatorio_Ocorrencia.pdf";
            const newPath = FileSystem.documentDirectory + fileName;

            await FileSystem.moveAsync({
                from: uri,
                to: newPath,
            });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(newPath);
            } else {
                Alert.alert(
                    "Erro",
                    "Compartilhamento não suportado no dispositivo."
                );
            }

            clearForm();
            router.push("/form/success");
        } catch (error) {
            setIsLoading(false);
            Alert.alert(
                "Erro ao gerar o PDF",
                error.message || "Erro desconhecido."
            );
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Responsável pelo Preenchimento</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do responsável"
                placeholderTextColor="#ccc"
                value={formData.responsavelPeloPreenchimento || ""}
                onChangeText={(text) =>
                    setFormData({
                        ...formData,
                        responsavelPeloPreenchimento: text,
                    })
                }
            />
            {errors.responsavelPeloPreenchimento && (
                <Text style={styles.errorText}>{errors.responsavelPeloPreenchimento}</Text>
            )}

            {isLoading ? (
                <ActivityIndicator size="large" color="#e21b1b" />
            ) : (
                <StepFooter
                    onBack={handleBack}
                    onNext={handleGeneratePDF}
                    nextLabel="Finalizar"
                    nextDisabled={!valid}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: { color: 'red', fontSize: 12, marginTop: -5, marginBottom: 10 },
});
