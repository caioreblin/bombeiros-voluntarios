import { buildReportHtml } from '../../utils/pdfTemplate';

const sampleFormData = {
  nomeVitima: 'Ana Silva',
  cpf: '12345678900',
  fone: '4799990000',
  endereco: 'Rua das Flores',
  numero: '100',
  bairro: 'Centro',
  vitima: 'Proprietário',
  empresa: false,
  data: '01/02/2024',
  hch: '14:30',
  numeroBO: '987',
  equipe: 'Alfa',
  despachador: 'Carlos',
  codigoIR: '2',
  tabelaVTRs: [
    { vtr: 'UCIR-0331', unidade: 'Centro', litros: '500', kmFinal: '1200', motorista: 'Pedro' },
  ],
  tabelaServicosApoio: [{ vtr: 'UTB-0305', cidade: 'Guaramirim', litros: '200' }],
  totalLitrosConsumidos: 700,
  bombeiros: [
    { nome: 'João', vtr: 'UCIR-0331', combatente: true },
    { nome: 'Maria', vtr: 'UCIR-0331', combatente: false },
  ],
  demandante: 'Vizinho',
  tipoPerda: 'Parcial',
  causaIncendio: 'Curto-circuito',
  areaAtingida: { edificada: '50 m²', naoEdificada: '20 m²' },
  areaTotal: { imovel: '120 m²', terreno: '300 m²' },
  incendioEm: 'Edificação',
  detalheIncendio: 'Alvenaria',
  observacaoIncendio: 'Fogo controlado rapidamente',
  vazamentoGas: true,
  tipoGasVazamento: 'G.L.P.',
  observacaoGas: 'Cheiro forte no local',
  SPEextintores: true,
  SHPhidrantes: false,
  SADIalarme: true,
  SIEiluminacaoEmergencia: false,
  SPKsprinkler: false,
  SALsinalizacaoAbandono: true,
  EEelevadorEmergencia: false,
  exaustaoFumaca: false,
  ventilacaoPermanenteGLP: false,
  compartimentacao: true,
  acessoViaturas: true,
  lavagemPista: true,
  litrosLavagemPista: '300',
  vazamentoProdutosPerigosos: false,
  nomeProdutoPerigoso: '',
  obsVazamentoProdutosPerigosos: '',
  usadoExtintor: true,
  utilizadoPor: 'Bombeiro',
  quantosExtintores: '2',
  tipoExtintor: 'P.Q.S',
  anotacoes: 'Sem anotações',
  observacoes: 'Ocorrência encerrada',
  materiaisDanificadosOcorrencia: 'Fiação',
  responsavelPeloPreenchimento: 'Sgt. Lima',
};

describe('buildReportHtml', () => {
  it('matches the snapshot for a filled report', () => {
    const html = buildReportHtml(sampleFormData, 'data:image/png;base64,SAMPLELOGO');
    expect(html).toMatchSnapshot();
  });

  it('never renders undefined/null literals for empty fields', () => {
    const empty = {
      ...sampleFormData,
      nomeVitima: '',
      cpf: '',
      despachador: '',
      responsavelPeloPreenchimento: '',
      observacoes: '',
      materiaisDanificadosOcorrencia: '',
    };
    const html = buildReportHtml(empty, '');
    expect(html).not.toMatch(/\bundefined\b/);
    expect(html).not.toMatch(/>null</);
    expect(html).toContain('N/A');
  });

  it('embeds the provided logo data URI', () => {
    const html = buildReportHtml(sampleFormData, 'data:image/png;base64,SAMPLELOGO');
    expect(html).toContain('src="data:image/png;base64,SAMPLELOGO"');
  });

  it('includes the gas and lavagem sections', () => {
    const html = buildReportHtml(sampleFormData, '');
    expect(html).toContain('Vazamento de Gás');
    expect(html).toContain('Lavagem de Pista');
    expect(html).toContain('G.L.P.');
  });

  it('shows the custom type when incêndio is "Outro Tipo"', () => {
    const html = buildReportHtml(
      { ...sampleFormData, incendioEm: 'Outro Tipo', incendioOutroTipo: 'Lixão' },
      ''
    );
    expect(html).toContain('Outro Tipo: Lixão');
  });

  it('shows the mixed materials when "Mista" is selected', () => {
    const html = buildReportHtml(
      { ...sampleFormData, detalheIncendio: 'Mista', materiaisMistos: 'alvenaria e madeira' },
      ''
    );
    expect(html).toContain('Materiais (mista):');
    expect(html).toContain('alvenaria e madeira');
  });
});
