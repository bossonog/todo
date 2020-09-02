export const isEmpty = (value) => (value ? '' : 'The string must not be empty');

export const hasSymbols = (value) => {
  if (!/^[A-Za-z0-9,!'";:-\s.?]+$/.test(value)) {
    return 'The string must contain only these symbols: ,.;:-\'"?!';
  }

  return '';
};

export const processValidationsArray = (validations, value) => {
  for (const validate of validations) {
    const errorMsg = validate(value);

    if (errorMsg) {
      return errorMsg;
    }
  }

  return '';
};
