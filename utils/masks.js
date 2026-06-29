// Limitação conhecida: a detecção de backspace abaixo compara comprimentos e
// assume edição NO FIM do campo. Apagar um separador no meio do texto (ou
// editar com o cursor no meio) remove o último dígito em vez do caractere
// alvo. É um tradeoff consciente para fazer o backspace funcionar no fim
// (vide __tests__/utils/masks.test.js); edição no meio não é suportada.
export function applyDigitMask(previousValue, newValue, groups, separator = '') {
  let digits = newValue.replace(/\D/g, '');
  const prevDigits = previousValue.replace(/\D/g, '');

  if (newValue.length < previousValue.length && digits.length === prevDigits.length) {
    digits = digits.slice(0, -1);
  }

  const max = groups.reduce((a, b) => a + b, 0);
  digits = digits.slice(0, max);

  let result = '';
  let pos = 0;
  groups.forEach((g, i) => {
    if (digits.length > pos) {
      result += digits.slice(pos, pos + g);
      pos += g;
      if (digits.length > pos && i < groups.length - 1) result += separator;
    }
  });

  return result;
}

export const formatCpfInput = (prev, next) => {
  let digits = next.replace(/\D/g, '');
  const prevDigits = prev.replace(/\D/g, '');

  // Mesmo tratamento de backspace no fim do campo usado em applyDigitMask.
  if (next.length < prev.length && digits.length === prevDigits.length) {
    digits = digits.slice(0, -1);
  }

  digits = digits.slice(0, 11);

  let result = digits.slice(0, 3);
  if (digits.length > 3) result += '.' + digits.slice(3, 6);
  if (digits.length > 6) result += '.' + digits.slice(6, 9);
  if (digits.length > 9) result += '-' + digits.slice(9, 11);

  return result;
};

export const formatDateInput = (prev, next) => applyDigitMask(prev, next, [2, 2, 4], '/');

export const formatTimeInput = (prev, next) => applyDigitMask(prev, next, [2, 2], ':');

export const formatAreaInput = (prev, next) => {
  const digits = applyDigitMask(prev, next, [6], '');
  return digits ? `${digits} m²` : '';
};
