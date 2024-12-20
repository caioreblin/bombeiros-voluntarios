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
          <body>
            <h1 style="text-align: center; font-size: 24px; margin-bottom: 20px;">Relatório de Ocorrência</h1>

            <!-- Dados Gerais -->
            <h3 style="font-size: 20px; margin-top: 30px;">Dados Gerais</h3>
            <p><strong>Nome da Vítima:</strong> ${formData.nomeVitima || 'N/A'}</p>
            <p><strong>Fone:</strong> ${formData.fone || 'N/A'}</p>
            <p><strong>Endereço:</strong> ${formData.endereco || 'N/A'}</p>
            <p><strong>Número:</strong> ${formData.numero || 'N/A'}</p>
            <p><strong>Bairro:</strong> ${formData.bairro || 'N/A'}</p>
            <p><strong>Vítima:</strong> ${formData.vitima || 'N/A'}</p>
            <p><strong>Empresa:</strong> ${formData.empresa ? 'Sim' : 'Não'}</p>

            <!-- Dados Adicionais -->
            <h3 style="font-size: 20px;">Dados Adicionais</h3>
            <p><strong>Data:</strong> ${formData.data || 'N/A'}</p>
            <p><strong>H. CH:</strong> ${formData.hch || 'N/A'}</p>
            <p><strong>Número B.O:</strong> ${formData.numeroBO || 'N/A'}</p>
            <p><strong>Equipe:</strong> ${formData.equipe || 'N/A'}</p>
            <p><strong>Despachador:</strong> ${formData.despachador || 'N/A'}</p>
            <p><strong>Código de IR:</strong> ${formData.codigoIR || 'N/A'}</p>

            <!-- Tabela VTRs -->
            <h3 style="font-size: 20px;">Tabela de VTRs</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px;">VTR</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Unidade</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Litros Consumidos</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Km Final</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Motorista</th>
                </tr>
              </thead>
              <tbody>
                ${formData.tabelaVTRs.map((vtr) => `
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${vtr.vtr || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${vtr.unidade || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${vtr.litros || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${vtr.kmFinal || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${vtr.motorista || 'N/A'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <!-- Tabela de Serviços de Apoio -->
            <h3 style="font-size: 20px;">Tabela de Serviços de Apoio</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px;">VTR</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Cidade</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Litros Consumidos</th>
                </tr>
              </thead>
              <tbody>
                ${formData.tabelaServicosApoio.map((servico) => `
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${servico.vtr || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${servico.cidade || 'N/A'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${servico.litros || 'N/A'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p><strong>Total de Litros Consumidos:</strong> ${formData.totalLitrosConsumidos || 'N/A'}</p>

            <!-- Bombeiros -->
            <h3 style="font-size: 20px;">Bombeiros</h3>
            <ul>
              ${formData.bombeiros.map((bombeiro) => `
                <li><strong>Nome:</strong> ${bombeiro.nome || 'N/A'}, <strong>VTR:</strong> ${bombeiro.vtr || 'N/A'}</li>
              `).join('')}
            </ul>

            <!-- Detalhes da Ocorrência -->
            <h3 style="font-size: 20px;">Detalhes da Ocorrência</h3>
            <p><strong>Demandante:</strong> ${formData.demandante || 'N/A'}</p>
            <p><strong>Tipo de Perda:</strong> ${formData.tipoPerda || 'N/A'}</p>
            <p><strong>Causa do Incêndio:</strong> ${formData.causaIncendio || 'N/A'}</p>
            <p><strong>Área Atingida:</strong> Edificada: ${formData.areaAtingida.edificada || 'N/A'}, Não Edificada: ${formData.areaAtingida.naoEdificada || 'N/A'}</p>
            <p><strong>Área Total:</strong> Imóvel: ${formData.areaTotal.imovel || 'N/A'}, Terreno: ${formData.areaTotal.terreno || 'N/A'}</p>
            
            <!-- Detalhes do Incêndio -->
            <h3 style="font-size: 20px;">Detalhes do Incêndio</h3>
            <p><strong>Incêndio em:</strong> ${formData.incendioEm || 'N/A'}</p>
            <p><strong>Detalhes do Incêndio:</strong> ${formData.detalheIncendio || 'N/A'}</p>
            <p><strong>Observações sobre o Incêndio:</strong> ${formData.observacaoIncendio || 'N/A'}</p>

            <!-- Vazamentos -->
            <h3 style="font-size: 20px;">Vazamentos</h3>
            ${formData.lavagemPista ? `<p><strong>Lavagem de Pista (litros):</strong> ${formData.lavagemPista}</p>` : '<p>Sem lavagem de pista registrada.</p>'}
            ${formData.vazamentoProdutosPerigosos ? `
              <p><strong>Vazamento de Produtos Perigosos:</strong> ${formData.vazamentoProdutosPerigosos}</p>
              <p><strong>Observação:</strong> ${formData.obsVazamentoProdutosPerigosos || 'N/A'}</p>
            ` : '<p>Sem vazamento de produtos perigosos registrado.</p>'}

            <!-- Extintores -->
            <h3 style="font-size: 20px;">Extintores</h3>
            ${formData.usadoExtintor ? `
              <p><strong>Utilizado por:</strong> ${formData.utilizadoPor || 'N/A'}</p>
              <p><strong>Quantidade:</strong> ${formData.quantosExtintores || 'N/A'}</p>
              <p><strong>Tipo:</strong> ${formData.tipoExtintor || 'N/A'}</p>
            ` : '<p>Não foram usados extintores.</p>'}
            
            <!-- Materiais Danificados -->
            <h3 style="font-size: 20px;">Materiais Danificados na Ocorrência</h3>
            <p>${formData.materiaisDanificadosOcorrencia || 'Nenhum material danificado registrado.'}</p>

            <!-- Observações -->
            <h3 style="font-size: 20px;">Observações e Anotações</h3>
            <p><strong>Anotações:</strong> ${formData.anotacoes || 'Nenhuma anotação'}</p>
            <p><strong>Observações:</strong> ${formData.observacoes || 'Nenhuma observação'}</p>

            <!-- Responsável -->
            <h3 style="font-size: 20px;">Responsável</h3>
            <p>${formData.responsavelPeloPreenchimento || 'N/A'}</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      setIsLoading(false);

      const fileName = 'Relatorio_Ocorrencia.pdf';
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.moveAsync({
        from: uri,
        to: newPath,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newPath);
      } else {
        Alert.alert('Erro', 'Compartilhamento não suportado no dispositivo.');
      }

      clearForm();
      router.push('/form/success');
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro ao gerar o PDF', error.message || 'Erro desconhecido.');
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
        value={formData.responsavelPeloPreenchimento || ''}
        onChangeText={(text) => setFormData({ ...formData, responsavelPeloPreenchimento: text })}
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
