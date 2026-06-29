import {
  applyDigitMask,
  formatDateInput,
  formatTimeInput,
  formatAreaInput,
  formatCpfInput,
} from '../../utils/masks';

describe('formatDateInput', () => {
  it('formats digits progressively as the user types', () => {
    expect(formatDateInput('', '1')).toBe('1');
    expect(formatDateInput('1', '12')).toBe('12');
    expect(formatDateInput('12', '123')).toBe('12/3');
    expect(formatDateInput('12/3', '12/34')).toBe('12/34');
    expect(formatDateInput('12/34', '12/345')).toBe('12/34/5');
  });

  it('formats a fully pasted date', () => {
    expect(formatDateInput('', '01022024')).toBe('01/02/2024');
  });

  it('caps at 8 digits', () => {
    expect(formatDateInput('', '010220249999')).toBe('01/02/2024');
  });

  it('backspacing a digit works normally', () => {
    expect(formatDateInput('12/34', '12/3')).toBe('12/3');
  });

  it('backspacing over a separator also removes a digit (no stuck cursor)', () => {
    // user deleted the "/" — digits unchanged but value got shorter
    expect(formatDateInput('12/34', '1234')).toBe('12/3');
  });
});

describe('formatTimeInput', () => {
  it('formats digits progressively', () => {
    expect(formatTimeInput('', '1')).toBe('1');
    expect(formatTimeInput('1', '12')).toBe('12');
    expect(formatTimeInput('12', '123')).toBe('12:3');
    expect(formatTimeInput('', '1230')).toBe('12:30');
  });

  it('caps at 4 digits', () => {
    expect(formatTimeInput('', '123099')).toBe('12:30');
  });

  it('backspacing over the separator removes a digit', () => {
    expect(formatTimeInput('12:34', '1234')).toBe('12:3');
  });
});

describe('formatAreaInput', () => {
  it('appends the m² unit', () => {
    expect(formatAreaInput('', '500')).toBe('500 m²');
  });

  it('returns empty string when there are no digits', () => {
    expect(formatAreaInput('', '')).toBe('');
    expect(formatAreaInput('', 'abc')).toBe('');
  });

  it('backspacing over the unit removes a digit', () => {
    expect(formatAreaInput('500 m²', '500 m')).toBe('50 m²');
  });

  it('caps at 6 digits', () => {
    expect(formatAreaInput('', '1234567')).toBe('123456 m²');
  });
});

describe('formatCpfInput', () => {
  it('formats digits progressively', () => {
    expect(formatCpfInput('', '123')).toBe('123');
    expect(formatCpfInput('123', '1234')).toBe('123.4');
    expect(formatCpfInput('123.456', '1234567')).toBe('123.456.7');
    expect(formatCpfInput('123.456.789', '1234567890')).toBe('123.456.789-0');
  });

  it('formats a fully pasted CPF', () => {
    expect(formatCpfInput('', '12345678901')).toBe('123.456.789-01');
  });

  it('strips non-digit characters', () => {
    expect(formatCpfInput('', 'a1b2c3')).toBe('123');
  });

  it('caps at 11 digits', () => {
    expect(formatCpfInput('', '1234567890199')).toBe('123.456.789-01');
  });

  it('backspacing over a separator removes a digit', () => {
    expect(formatCpfInput('123.456', '123456')).toBe('123.45');
  });
});

describe('applyDigitMask', () => {
  it('groups digits with the given separator', () => {
    expect(applyDigitMask('', '123456', [3, 3], '.')).toBe('123.456');
  });

  it('keeps only digits from the new value', () => {
    expect(applyDigitMask('', 'a1b2c3', [2, 2], '-')).toBe('12-3');
  });
});
