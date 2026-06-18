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

export const formatDateInput = (prev, next) => applyDigitMask(prev, next, [2, 2, 4], '/');

export const formatTimeInput = (prev, next) => applyDigitMask(prev, next, [2, 2], ':');

export const formatAreaInput = (prev, next) => {
  const digits = applyDigitMask(prev, next, [6], '');
  return digits ? `${digits} m²` : '';
};
