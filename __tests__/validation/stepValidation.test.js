import { validateStep } from '../../validation/stepValidation';

describe('validateStep', () => {
  describe('step 1', () => {
    it('is invalid when nomeVitima and endereco are empty', () => {
      const { valid, errors } = validateStep(1, { nomeVitima: '', endereco: '' });
      expect(valid).toBe(false);
      expect(errors.nomeVitima).toBeDefined();
      expect(errors.endereco).toBeDefined();
    });

    it('treats whitespace-only values as empty', () => {
      const { valid, errors } = validateStep(1, { nomeVitima: '   ', endereco: 'Rua X' });
      expect(valid).toBe(false);
      expect(errors.nomeVitima).toBeDefined();
      expect(errors.endereco).toBeUndefined();
    });

    it('is valid when both required fields are filled', () => {
      const { valid, errors } = validateStep(1, { nomeVitima: 'Ana', endereco: 'Rua X' });
      expect(valid).toBe(true);
      expect(errors).toEqual({});
    });
  });

  describe('step 2', () => {
    it('requires data, hch and numeroBO', () => {
      const { valid, errors } = validateStep(2, { data: '', hch: '', numeroBO: '' });
      expect(valid).toBe(false);
      expect(Object.keys(errors)).toEqual(['data', 'hch', 'numeroBO']);
    });

    it('is valid when all three are filled', () => {
      const result = validateStep(2, { data: '01/01/2024', hch: '10:00', numeroBO: '123' });
      expect(result.valid).toBe(true);
    });
  });

  describe('step 4', () => {
    it('is invalid when no bombeiro has a name', () => {
      const { valid, errors } = validateStep(4, {
        bombeiros: [{ nome: '', vtr: '', combatente: false }],
      });
      expect(valid).toBe(false);
      expect(errors.bombeiros).toBeDefined();
    });

    it('is valid when at least one bombeiro has a name', () => {
      const { valid } = validateStep(4, {
        bombeiros: [
          { nome: '', vtr: '', combatente: false },
          { nome: 'João', vtr: '', combatente: true },
        ],
      });
      expect(valid).toBe(true);
    });
  });

  describe('step 14', () => {
    it('requires responsavelPeloPreenchimento', () => {
      const { valid } = validateStep(14, { responsavelPeloPreenchimento: '' });
      expect(valid).toBe(false);
    });

    it('is valid when filled', () => {
      const { valid } = validateStep(14, { responsavelPeloPreenchimento: 'Maria' });
      expect(valid).toBe(true);
    });
  });

  it('returns valid for steps without rules', () => {
    expect(validateStep(3, {}).valid).toBe(true);
    expect(validateStep(99, {}).valid).toBe(true);
  });
});
