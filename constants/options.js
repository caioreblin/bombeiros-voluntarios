export const VICTIM_OPTIONS = ['Proprietário', 'Inquilino'];

export const EQUIPE_OPTIONS = ['Alfa', 'Bravo', 'Charlie', 'Delta'];

export const IR_OPTIONS = ['1', '2', '3'];

export const VTR_OPTIONS = [
  { label: 'UCIR-0331', value: 'UCIR-0331' },
  { label: 'UCI-0330', value: 'UCI-0330' },
  { label: 'UCIR-0350', value: 'UCIR-0350' },
  { label: 'UTB-0351', value: 'UTB-0351' },
  { label: 'UTB-0305', value: 'UTB-0305' },
];

export const UNIDADE_OPTIONS = [
  { label: 'Centro', value: 'Centro' },
  { label: 'Barra', value: 'Barra' },
  { label: 'Nereu', value: 'Nereu' },
  { label: 'João Pessoa', value: 'João Pessoa' },
];

export const TIPO_PERDA_OPTIONS = ['Total', 'Parcial', 'Insignificante'];

export const INCENDIO_EM_OPTIONS = ['Edificação', 'Meio de Transporte', 'Vegetação', 'Outro Tipo'];

export const DETALHE_INCENDIO_MAP = {
  Edificação: ['Alvenaria', 'Concreto', 'Madeira', 'Metálica', 'Mista', 'Outro Tipo'],
  'Meio de Transporte': ['Aeroviário', 'Ferroviário', 'Rodoviário', 'Outro Tipo'],
  Vegetação: [
    'Capoeira',
    'Cultura Agrícola',
    'Campo',
    'Mato',
    'Floresta',
    'Pasto',
    'Floresta Plantada',
    'Outro Tipo',
  ],
  'Outro Tipo': ['Produtos Perigosos', 'Área de Preservação', 'Outro Tipo'],
};

export const GAS_OPTIONS = ['Acetileno', 'Amónia', 'Argônio', 'Gás Natural', 'G.L.P.', 'Oxigênio', 'Outro Tipo'];

export const UTILIZADO_POR_OPTIONS = ['Bombeiro', 'Empresa'];

export const TIPOS_EXTINTORES = ['Água', 'CO2', 'P.Q.S', 'Pós especiais', 'Halon', 'Classe K'];
