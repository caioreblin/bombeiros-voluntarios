import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FormContext } from '../../context/FormContext';
import { useRouter } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function Step14() {
    const { formData, setFormData, clearForm } = useContext(FormContext);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePDF = async () => {
        setIsLoading(true);
        try {
            const htmlContent = `
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                .section-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 1px solid black;
                    padding: 10px;
                    border-radius: 10px;
                    font-family: Arial, sans-serif;
                }

                .logo-container img {
                    width: 80px;
                    height: auto;
                }

                .info-container {
                    text-align: center;
                    font-family: Arial, sans-serif;
                }

                .details-container {
                    font-family: Arial, sans-serif;
                    border: 1px solid black;
                    border-radius: 10px;
                    padding: 10px;
                    margin-top: 10px;
                }

                .details-row {
                    display: flex;
                    justify-content: space-between;
                }

                .details-row div {
                    margin: 5px 0;
                    width: 50%;
                    text-align: left;
                }

                .details-label {
                    font-weight: bold;
                }

                .details-title {
                    font-weight: normal;
                    margin-bottom: 10px;
                }

                td, th {
                    text-align: center;
                }
            </style>
        </head>

        <body>
            <div class="section-container">
                <div class="logo-container">
                    <img src="https://bvjs.com.br/wp-content/uploads/2019/09/LogosArtboard-1-copy-2.png" alt="Logo dos Bombeiros Voluntários">
                </div>

                <div class="info-container">
                    <strong>Associação de Serviços Sociais Voluntários de Jaraguá do Sul</strong>
                    <br>
                    <strong>Bombeiros Voluntários</strong>
                </div>

                <div class="details-container" style="margin-top: 0px;">
                    <div>Data: <strong>${formData.data}</strong></div>
                    <div>Hora: <strong>${formData.hch}</strong></div>
                    <div>Equipe: <strong>${formData.equipe}</strong></div>
                    <div>Código de IR: <strong>${
                        formData.codigoIR
                    }</strong></div>
                    <div>Nº do B.O: <strong>${formData.numeroBO}</strong></div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-row">
                    <div><span class="details-label">Nome do Proprietário:</span> ${
                        formData.nomeVitima
                    }</div>
                    <div><span class="details-label">CPF:</span> ${
                        formData.cpf
                    }</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">Endereço:</span> ${
                        formData.endereco
                    }</div>
                    <div><span class="details-label">Bairro:</span> ${
                        formData.bairro
                    }</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">Número:</span> ${
                        formData.numero
                    }</div>
                    <div><span class="details-label">Fone:</span> ${
                        formData.fone
                    }</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">Responsável pelo imóvel:</span> ${
                        formData.vitima
                    }</div>
                    <div><span class="details-label">Empresa:</span> ${
                        formData.empresa ? "Sim" : "Não"
                    }</div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Informações sobre o Incêndio</div>
                <div class="details-row">
                    <div>
                        <div><span class="details-label">Área atingida</span></div>
                        <div><span class="details-label">Edificada:</span> ${
                            formData.areaAtingida.edificada
                        }</div>
                        <div><span class="details-label">Não Edificada:</span> ${
                            formData.areaAtingida.naoEdificada
                        }</div>
                        <div><span class="details-label">Tipo de perda:</span> ${
                            formData.tipoPerda
                        }</div>
                    </div>
                    <div>
                        <div><span class="details-label">Área total</span></div>
                        <div><span class="details-label">Terreno:</span> ${
                            formData.areaTotal.terreno
                        }</div>
                        <div><span class="details-label">Imóvel:</span> ${
                            formData.areaTotal.imovel
                        }</div>
                    </div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Vazamento de produto perigoso</div>
                <div class="details-row">
                    <div style="width: 100%;">
                        <div><span class="details-label">Houve vazamento:</span> ${
                            formData.vazamentoProdutosPerigosos ? "Sim" : "Não"
                        }</div>
                        <div><span class="details-label">Tipo de vazamento:</span> ${
                            formData.vazamentoProdutosPerigosos
                                ? formData.vazamentoProdutosPerigosos
                                : ""
                        }</div>
                        <div><span class="details-label">OBS:</span> ${
                            formData.obsVazamentoProdutosPerigosos
                        }</div>
                    </div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Sistema de prevenção existentes</div>
                <div class="details-row">
                    <div><span class="details-label">SPE - Extintores:</span> ${
                        formData.SPEextintores ? "Sim" : "Não"
                    }</div>
                    <div><span class="details-label">EE - Elevador de emergência:</span> ${
                        formData.EEelevadorEmergencia ? "Sim" : "Não"
                    }</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">SHP - Hidrantes:</span> ${
                        formData.SHPhidrantes ? "Sim" : "Não"
                    }</div>
                    <div><span class="details-label">Exaustão de fumaça:</span> ${
                        formData.exaustaoFumaca ? "Sim" : "Não"
                    }</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">SIE - Iluminação de emergência:</span> ${
                        formData.SIEiluminacaoEmergencia ? "Sim" : "Não"
                    }</div>
                    <div><span class="details-label">Ventilação permanente (GLP):</span> ${
                        formData.ventilacaoPermanenteGLP ? "Sim" : "Não"
                    }</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">SADI - Alarme:</span> ${
                        formData.SADIalarme ? "Sim" : "Não"
                    }</div>
                    <div><span class="details-label">Compartimentação:</span> ${
                        formData.compartimentacao ? "Sim" : "Não"
                    }</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">SPK - Sprinkler:</span> ${
                        formData.SPKsprinkler ? "Sim" : "Não"
                    }</div>
                    <div><span class="details-label">Acesso de viaturas:</span> ${
                        formData.acessoViaturas ? "Sim" : "Não"
                    }</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">Sinalização p/ abandono:</span> ${
                        formData.SALsinalizacaoAbandono ? "Sim" : "Não"
                    }</div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-row">
                    <div><span class="details-label">Usado extintor: </span> ${
                        formData.usadoExtintor ? "Sim" : "Não"
                    }</div>
                    <div><span class="details-label">Quantos:</span> ${
                        formData.quantosExtintores
                    }</div>
                    <div><span class="details-label">Tipo:</span> ${
                        formData.tipoExtintor
                    }</div>
                    <div><span class="details-label">Da onde:</span> ${
                        formData.incendioEm
                    }</div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Tabela de viaturas</div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">VTR</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Unidade</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Água consumida (L)</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Km final</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Motorista</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formData.tabelaVTRs
                            .map(
                                (vtr) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                vtr.vtr || "N/A"
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                vtr.unidade || "N/A"
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                vtr.litros || "N/A"
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                vtr.kmFinal || "N/A"
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                vtr.motorista || "N/A"
                            }</td>
                        </tr>
                        `
                            )
                            .join("")}
                    </tbody>
                </table>
            </div>

            <div class="details-container">
                <div class="details-title">Serviços de apoio</div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">VTR</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Cidade</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Água consumida (L)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formData.tabelaServicosApoio
                            .map(
                                (vtr) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                vtr.vtr || "N/A"
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                vtr.cidade || "N/A"
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                vtr.litros || "N/A"
                            }</td>
                        </tr>
                        `
                            )
                            .join("")}
                    </tbody>
                </table>
            </div>

            <div class="details-container">
                <div class="details-row">
                    <div><span class="details-label">Total de água consumida (L): </span> ${
                        formData.totalLitrosConsumidos
                    }</div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Guarnição</div>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">Nome</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">VTR</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Combatente</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${formData.bombeiros
                            .map(
                                (bombeiro) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                bombeiro.nome || "N/A"
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                bombeiro.vtr || "N/A"
                            }</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${
                                bombeiro.combatente ? "Sim" : "Não" || "N/A"
                            }</td>
                        </tr>
                        `
                            )
                            .join("")}
                    </tbody>
                </table>
            </div>

            <div class="details-container">
                <div class="details-row">
                    <div><span class="details-label">Demandante da ocorrência: </span> ${
                        formData.demandante
                    }</div>
                    <div><span class="details-label">Total de bombeiros envolvidos: </span> ${
                        formData.bombeiros.length
                    }</div>
                </div>
            </div>

            <div class="details-container">
                <div><span class="details-label">Observações gerais:</span></div>
                <div>${formData.observacoes}</div>
            </div>

            <div class="details-container">
                <div><span class="details-label">Materiais danificados na ocorrência:</span></div>
                <div>${formData.materiaisDanificadosOcorrencia}</div>
            </div>

            <div class="details-container">
                <div><span class="details-label">Despachador:</span> ${
                    formData.despachador
                }</div>
                <div><span class="details-label">Responsável pelo preenchimento:</span> ${
                    formData.responsavelPeloPreenchimento
                }</div>
            </div>
        </body>
        </html>
      `;

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

            {isLoading ? (
                <ActivityIndicator size="large" color="#e21b1b" />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Voltar" onPress={handleBack} />
                    <Button title="Finalizar" onPress={handleGeneratePDF} />
                </View>
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
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 },
});
