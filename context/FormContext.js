import React, { createContext, useState } from 'react';

const initialFormState = {
  nomeVitima: '',
  fone: '',
  endereco: '',
  numero: '',
  bairro: '',
  vitima: '',
  empresa: false,
  data: '',
  hch: '',
  numeroBO: '',
  equipe: '',
  despachador: '',
  codigoIR: '',
  tabelaVTRs: [
    { vtr: '', unidade: '', litros: '', kmFinal: '', motorista: '' },
  ],
  tabelaServicosApoio: [{ vtr: '', cidade: '', litros: '' }],
  totalLitrosConsumidos: 0,
  bombeiros: [
    { nome: '', vtr: ''}
  ],
  demandante: '',
  tipoPerda: '',
  causaIncendio: '',
  areaAtingida: {
    edificada: '',
    naoEdificada: '',
  },
  areaTotal: {
    imovel: '',
    terreno: '',
  },
  incendioEm: '',
  detalheIncendio: '',
  observacaoIncendio: '',
  vazamentoGas: false,
  observacaoGas: '',
  SPEextintores: false,
  SHPhidrantes: false,
  SADIalarme: false,
  SIEiluminacaoEmergencia: false,
  SPKsprinkler: false,
  SALsinalizacaoAbandono: false,
  EEelevadorEmergencia: false,
  exaustaoFumaca: false,
  ventilacaoPermanenteGLP: false,
  compartimentacao: false,
  acessoViaturas: false,
  lavagemPista: false,
  vazamentoProdutosPerigosos: false,
  obsVazamentoProdutosPerigosos: '',
  usadoExtintor: false,
  utilizadoPor: '',
  quantosExtintores: '',
  tipoExtintor: '',
  anotacoes: '',
  observacoes: '',
  materiaisDanificadosOcorrencia: '',
  responsavelPeloPreenchimento: '',
};

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({ ...initialFormState });

  const clearForm = () => setFormData({ ...initialFormState });

  return (
    <FormContext.Provider value={{ formData, setFormData, clearForm }}>
      {children}
    </FormContext.Provider>
  );
};
