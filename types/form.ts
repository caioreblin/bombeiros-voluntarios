import type { Dispatch, SetStateAction } from 'react';

export interface VtrRow {
  vtr: string;
  unidade: string;
  litros: string;
  kmFinal: string;
  motorista: string;
}

export interface ApoioRow {
  vtr: string;
  cidade: string;
  litros: string;
}

export interface Bombeiro {
  nome: string;
  vtr: string;
  combatente: boolean;
}

export interface AreaAtingida {
  edificada: string;
  naoEdificada: string;
}

export interface AreaTotal {
  imovel: string;
  terreno: string;
}

export interface FormData {
  nomeVitima: string;
  cpf: string;
  fone: string;
  endereco: string;
  numero: string;
  bairro: string;
  vitima: string;
  empresa: boolean;
  data: string;
  hch: string;
  numeroBO: string;
  equipe: string;
  despachador: string;
  codigoIR: string;
  tabelaVTRs: VtrRow[];
  tabelaServicosApoio: ApoioRow[];
  totalLitrosConsumidos: number;
  bombeiros: Bombeiro[];
  demandante: string;
  tipoPerda: string;
  causaIncendio: string;
  areaAtingida: AreaAtingida;
  areaTotal: AreaTotal;
  incendioEm: string;
  detalheIncendio: string;
  observacaoIncendio: string;
  vazamentoGas: boolean;
  tipoGasVazamento: string;
  observacaoGas: string;
  SPEextintores: boolean;
  SHPhidrantes: boolean;
  SADIalarme: boolean;
  SIEiluminacaoEmergencia: boolean;
  SPKsprinkler: boolean;
  SALsinalizacaoAbandono: boolean;
  EEelevadorEmergencia: boolean;
  exaustaoFumaca: boolean;
  ventilacaoPermanenteGLP: boolean;
  compartimentacao: boolean;
  acessoViaturas: boolean;
  lavagemPista: boolean;
  litrosLavagemPista: string;
  vazamentoProdutosPerigosos: boolean;
  nomeProdutoPerigoso: string;
  obsVazamentoProdutosPerigosos: string;
  usadoExtintor: boolean;
  utilizadoPor: string;
  quantosExtintores: string;
  tipoExtintor: string;
  anotacoes: string;
  observacoes: string;
  materiaisDanificadosOcorrencia: string;
  responsavelPeloPreenchimento: string;
}

export interface FormContextType {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  clearForm: () => void;
  isHydrated: boolean;
}
