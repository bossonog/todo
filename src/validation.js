export const validateToDoInput = (str) => {
  let errorMsg = '';

  if (!str) {
    errorMsg = 'The string must not be empty';
  } else if (!/^\w+( \w+)*$/.test(str)) {
    errorMsg = 'The string must not contain symbols';
  }

  return errorMsg;
}

export const isEmpty = (value, fieldName) => value ? '' : 'Field cant be empty'

export const isValidEmail = () => { }

export const isValidName = () => { }

export const isValidPassword = () => { }

// export const validateLogin = (login, password) => {
//   let errorMsg = '';

//   if (!login || !password) {
//     errorMsg = 'The login or password must not be empty';
//   }

//   return errorMsg;
// }

// export const validateUsername = (username) => {
//   let errorMsg = '';

//   if (!username) {
//     errorMsg = 'The login must not be empty';
//   }

//   return errorMsg;
// }

// export const validatePassword = (password) => {
//   let errorMsg = '';

//   if (!password) {
//     errorMsg = 'The password must not be empty';
//   }

//   return errorMsg;
// }