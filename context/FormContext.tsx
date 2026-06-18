import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FormData, FormContextType } from '../types/form';
import { EQUIPE_OPTIONS, IR_OPTIONS } from '../constants/options';

const STORAGE_KEY = '@bombeiros:formData';

const initialFormState: FormData = {
  nomeVitima: '',
  cpf: '',
  fone: '',
  endereco: '',
  numero: '',
  bairro: '',
  vitima: '',
  empresa: false,
  data: '',
  hch: '',
  numeroBO: '',
  equipe: EQUIPE_OPTIONS[0],
  despachador: '',
  codigoIR: IR_OPTIONS[0],
  tabelaVTRs: [{ vtr: '', unidade: '', litros: '', kmFinal: '', motorista: '' }],
  tabelaServicosApoio: [{ vtr: '', cidade: '', litros: '' }],
  totalLitrosConsumidos: 0,
  bombeiros: [{ nome: '', vtr: '', combatente: false }],
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
  tipoGasVazamento: '',
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
  litrosLavagemPista: '',
  vazamentoProdutosPerigosos: false,
  nomeProdutoPerigoso: '',
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

export const FormContext = createContext<FormContextType>({} as FormContextType);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({ ...initialFormState });
  const [isHydrated, setIsHydrated] = useState(false);
  const isLoaded = useRef(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          // Merge com os defaults para sobreviver a mudanças de schema
          // (chaves novas/aninhadas ausentes em blobs antigos) e ignora
          // valores corrompidos sem derrubar o app.
          setFormData({ ...initialFormState, ...JSON.parse(stored) });
        }
      } catch {
        // storage corrompido — mantém o estado inicial
      } finally {
        isLoaded.current = true;
        setIsHydrated(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoaded.current) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, 500);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [formData]);

  const clearForm = () => {
    const resetFormData: FormData = JSON.parse(JSON.stringify(initialFormState));
    setFormData(resetFormData);
    AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <FormContext.Provider value={{ formData, setFormData, clearForm, isHydrated }}>
      {children}
    </FormContext.Provider>
  );
};
