const display = (value, fallback = 'N/A') => {
  if (value === null || value === undefined || value === '') return fallback;
  return value;
};

const yesNo = (value) => (value ? 'Sim' : 'Não');

export function buildReportHtml(formData, logoDataUri = '') {
  const vtrRows = formData.tabelaVTRs
    .map(
      (vtr) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(vtr.vtr)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(vtr.unidade)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(vtr.litros)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(vtr.kmFinal)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(vtr.motorista)}</td>
                        </tr>`
    )
    .join('');

  const apoioRows = formData.tabelaServicosApoio
    .map(
      (vtr) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(vtr.vtr)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(vtr.cidade)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(vtr.litros)}</td>
                        </tr>`
    )
    .join('');

  const guarnicaoRows = formData.bombeiros
    .map(
      (bombeiro) => `
                        <tr>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(bombeiro.nome)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${display(bombeiro.vtr)}</td>
                            <td style="border: 1px solid #ddd; padding: 8px;">${yesNo(bombeiro.combatente)}</td>
                        </tr>`
    )
    .join('');

  return `
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
                    <img src="${logoDataUri}" alt="Logo dos Bombeiros Voluntários">
                </div>

                <div class="info-container">
                    <strong>Associação de Serviços Sociais Voluntários de Jaraguá do Sul</strong>
                    <br>
                    <strong>Bombeiros Voluntários</strong>
                </div>

                <div class="details-container" style="margin-top: 0px;">
                    <div>Data: <strong>${display(formData.data)}</strong></div>
                    <div>Hora: <strong>${display(formData.hch)}</strong></div>
                    <div>Equipe: <strong>${display(formData.equipe)}</strong></div>
                    <div>Código de IR: <strong>${display(formData.codigoIR)}</strong></div>
                    <div>Nº do B.O: <strong>${display(formData.numeroBO)}</strong></div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-row">
                    <div><span class="details-label">Nome do Proprietário:</span> ${display(formData.nomeVitima)}</div>
                    <div><span class="details-label">CPF:</span> ${display(formData.cpf)}</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">Endereço:</span> ${display(formData.endereco)}</div>
                    <div><span class="details-label">Bairro:</span> ${display(formData.bairro)}</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">Número:</span> ${display(formData.numero)}</div>
                    <div><span class="details-label">Fone:</span> ${display(formData.fone)}</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">Responsável pelo imóvel:</span> ${display(formData.vitima)}</div>
                    <div><span class="details-label">Empresa:</span> ${yesNo(formData.empresa)}</div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Informações sobre o Incêndio</div>
                <div class="details-row">
                    <div>
                        <div><span class="details-label">Área atingida</span></div>
                        <div><span class="details-label">Edificada:</span> ${display(formData.areaAtingida.edificada)}</div>
                        <div><span class="details-label">Não Edificada:</span> ${display(formData.areaAtingida.naoEdificada)}</div>
                        <div><span class="details-label">Tipo de perda:</span> ${display(formData.tipoPerda)}</div>
                    </div>
                    <div>
                        <div><span class="details-label">Área total</span></div>
                        <div><span class="details-label">Terreno:</span> ${display(formData.areaTotal.terreno)}</div>
                        <div><span class="details-label">Imóvel:</span> ${display(formData.areaTotal.imovel)}</div>
                    </div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Vazamento de produto perigoso</div>
                <div class="details-row">
                    <div style="width: 100%;">
                        <div><span class="details-label">Houve vazamento:</span> ${yesNo(formData.vazamentoProdutosPerigosos)}</div>
                        <div><span class="details-label">Nome do produto:</span> ${display(formData.nomeProdutoPerigoso)}</div>
                        <div><span class="details-label">OBS:</span> ${display(formData.obsVazamentoProdutosPerigosos)}</div>
                    </div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Vazamento de Gás</div>
                <div class="details-row">
                    <div style="width: 100%;">
                        <div><span class="details-label">Houve vazamento:</span> ${yesNo(formData.vazamentoGas)}</div>
                        <div><span class="details-label">Tipo de gás:</span> ${display(formData.tipoGasVazamento)}</div>
                        <div><span class="details-label">OBS:</span> ${display(formData.observacaoGas)}</div>
                    </div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Lavagem de Pista</div>
                <div class="details-row">
                    <div style="width: 100%;">
                        <div><span class="details-label">Houve lavagem:</span> ${yesNo(formData.lavagemPista)}</div>
                        <div><span class="details-label">Litros utilizados:</span> ${display(formData.litrosLavagemPista)}</div>
                    </div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-title">Sistema de prevenção existentes</div>
                <div class="details-row">
                    <div><span class="details-label">SPE - Extintores:</span> ${yesNo(formData.SPEextintores)}</div>
                    <div><span class="details-label">EE - Elevador de emergência:</span> ${yesNo(formData.EEelevadorEmergencia)}</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">SHP - Hidrantes:</span> ${yesNo(formData.SHPhidrantes)}</div>
                    <div><span class="details-label">Exaustão de fumaça:</span> ${yesNo(formData.exaustaoFumaca)}</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">SIE - Iluminação de emergência:</span> ${yesNo(formData.SIEiluminacaoEmergencia)}</div>
                    <div><span class="details-label">Ventilação permanente (GLP):</span> ${yesNo(formData.ventilacaoPermanenteGLP)}</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">SADI - Alarme:</span> ${yesNo(formData.SADIalarme)}</div>
                    <div><span class="details-label">Compartimentação:</span> ${yesNo(formData.compartimentacao)}</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">SPK - Sprinkler:</span> ${yesNo(formData.SPKsprinkler)}</div>
                    <div><span class="details-label">Acesso de viaturas:</span> ${yesNo(formData.acessoViaturas)}</div>
                </div>
                <div class="details-row">
                    <div><span class="details-label">Sinalização p/ abandono:</span> ${yesNo(formData.SALsinalizacaoAbandono)}</div>
                </div>
            </div>

            <div class="details-container">
                <div class="details-row">
                    <div><span class="details-label">Usado extintor: </span> ${yesNo(formData.usadoExtintor)}</div>
                    <div><span class="details-label">Quantos:</span> ${display(formData.quantosExtintores)}</div>
                    <div><span class="details-label">Tipo:</span> ${display(formData.tipoExtintor)}</div>
                    <div><span class="details-label">Da onde:</span> ${display(formData.incendioEm)}</div>
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
                    <tbody>${vtrRows}
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
                    <tbody>${apoioRows}
                    </tbody>
                </table>
            </div>

            <div class="details-container">
                <div class="details-row">
                    <div><span class="details-label">Total de água consumida (L): </span> ${display(formData.totalLitrosConsumidos)}</div>
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
                    <tbody>${guarnicaoRows}
                    </tbody>
                </table>
            </div>

            <div class="details-container">
                <div class="details-row">
                    <div><span class="details-label">Demandante da ocorrência: </span> ${display(formData.demandante)}</div>
                    <div><span class="details-label">Total de bombeiros envolvidos: </span> ${formData.bombeiros.length}</div>
                </div>
            </div>

            <div class="details-container">
                <div><span class="details-label">Observações gerais:</span></div>
                <div>${display(formData.observacoes)}</div>
            </div>

            <div class="details-container">
                <div><span class="details-label">Materiais danificados na ocorrência:</span></div>
                <div>${display(formData.materiaisDanificadosOcorrencia)}</div>
            </div>

            <div class="details-container">
                <div><span class="details-label">Despachador:</span> ${display(formData.despachador)}</div>
                <div><span class="details-label">Responsável pelo preenchimento:</span> ${display(formData.responsavelPeloPreenchimento)}</div>
            </div>
        </body>
        </html>
      `;
}
