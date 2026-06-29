import React, { useContext, useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, Alert, Platform } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { File, Paths } from 'expo-file-system';
import { Asset } from 'expo-asset';
import { validateStep } from '../../validation/stepValidation';
import { buildReportHtml } from '../../utils/pdfTemplate';
import { colors, commonStyles } from '../../constants/theme';
import StepFooter from '../../components/StepFooter';

const loadLogoDataUri = async () => {
    try {
        const asset = Asset.fromModule(require('../../assets/logo.png'));
        await asset.downloadAsync();

        if (Platform.OS === 'web') {
            return asset.uri;
        }

        const base64 = await new File(asset.localUri).base64();
        return `data:image/png;base64,${base64}`;
    } catch (error) {
        console.warn('Falha ao carregar o logo do PDF:', error);
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

            const pdfFile = new File(uri);
            const destination = new File(Paths.document, "Relatorio_Ocorrencia.pdf");
            // move() falha se o destino já existir (PDF de uma geração anterior).
            if (destination.exists) {
                destination.delete();
            }
            pdfFile.move(destination);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(destination.uri);
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
        <View style={commonStyles.container}>
            <Text style={commonStyles.label}>Responsável pelo Preenchimento</Text>
            <TextInput
                style={commonStyles.input}
                placeholder="Digite o nome do responsável"
                placeholderTextColor={colors.placeholder}
                value={formData.responsavelPeloPreenchimento || ""}
                onChangeText={(text) =>
                    setFormData({
                        ...formData,
                        responsavelPeloPreenchimento: text,
                    })
                }
            />
            {errors.responsavelPeloPreenchimento && (
                <Text style={commonStyles.errorText}>{errors.responsavelPeloPreenchimento}</Text>
            )}

            {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} />
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
