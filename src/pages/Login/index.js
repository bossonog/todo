import React, { useState } from 'react';

import { CREDENTIALS } from '../../constants/user';

import { LoginForm } from './components';

import './index.scss';

const Login = ({ authorize }) => {
  const [formData, setFormData] = useState({
    // username: {
    //   value: '',
    //   error: '',
    // },
    username: '',
    password: '',
  });

  // const [errors, setErros] = useState({
  //   username: '',
  //   password: '',
  // });

  const onSubmit = (e) => {
    e.preventDefault();

    if (CREDENTIALS.username === formData.username && CREDENTIALS.password === formData.password) {
      localStorage.setItem('auth', true);

      return authorize(true);
    }
  };

  const onInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <LoginForm onSubmit={onSubmit} onInput={onInput} values={formData} />
    // <LoginForm onSubmit={onSubmit} onInput={onInput} values={formData} errors={errors} />
  );
};

export default Login;
