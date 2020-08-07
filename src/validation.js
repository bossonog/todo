export const validateToDoInput = (str) => {
  let errorMsg = '';

  if (!str) {
    errorMsg = 'The string must not be empty';
  } else if (!/^\w+( \w+)*$/.test(str)) {
    errorMsg = 'The string must not contain symbols';
  }

  return errorMsg;
}

export const isValidToDoTitle = (value) => {
  if (!/^\w+( \w+)*$/.test(value)) {
    return 'The string must not contain symbols';
  }

  return '';
}

export const isEmpty = (value) => value ? '' : 'Field can`t be empty';
