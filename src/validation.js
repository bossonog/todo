const validateToDoInput = (str) => {
  let errorMsg = '';

  if (!str) {
    errorMsg = 'The string must not be empty';
  } else if (!/^\w+( \w+)*$/.test(str)) {
    errorMsg = 'The string must not contain symbols';
  }

  return errorMsg;
}