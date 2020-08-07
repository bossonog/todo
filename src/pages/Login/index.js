import { isEmpty } from '../../validation';
import { EventEmitter } from '../../util/EventEmitter';
import { MainLayout } from '../../components/MainLayout';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { USER, EVENT_TYPE } from '../../constants';

export class Login {
  constructor(elem, isAuthenticated) {
    this.elem = elem;
    this.eventEmitter = new EventEmitter();
    this.isAuthenticated = isAuthenticated;

    this.form = null;
    this.usernameInput = null;
    this.passwordInput = null;
    this.errorBox = null;
  }

  on = (eventName, fn) => {
    this.eventEmitter.on(eventName, fn)
  }

  emit = (eventName, data) => {
    this.eventEmitter.emit(eventName, data)
  }

  onInput = () => {
    this.errorBox.textContent = '';
  }

  onSubmit = (e) => {
    e.preventDefault();

    const username = this.usernameInput.value;
    const password = this.passwordInput.value;

    const usernameError = this.usernameInput.updateError();
    const passwordError = this.passwordInput.updateError();

    if (usernameError || passwordError) return;

    if (username === USER.username && password === USER.password) {
      localStorage.setItem('auth', true);

      this.emit(EVENT_TYPE.LOGIN_SUCCESS);
    } else {
      this.errorBox.textContent = 'There is no user with provided credentials';
    }
  }

  render = () => {
    this.elem.innerHTML = '';

    const mainLayout = new MainLayout(this.elem, this.isAuthenticated());

    mainLayout.render();

    const app = document.getElementById('app');

    this.form = document.createElement('form');

    this.form.addEventListener('submit', this.onSubmit);

    this.form.classList.add('app-login');

    this.usernameInput = new Input({
      elem: this.form,
      type: 'text',
      placeholder: 'Login',
      classList: ['app-login-control'],
      validationFunctions: [isEmpty],
      onInput: this.onInput,
    });

    this.usernameInput.render();

    this.passwordInput = new Input({
      elem: this.form,
      type: 'password',
      placeholder: 'Password',
      classList: ['app-login-control'],
      validationFunctions: [isEmpty],
      onInput: this.onInput,
    });

    this.passwordInput.render();

    this.buttonSubmit = new Button({
      elem: this.form,
      type: 'submit',
      title: 'Sign in',
      classList: ['app-login-button'],
      onClick: this.onSubmit,
    });

    this.buttonSubmit.render();

    this.errorBox = document.createElement('div');

    this.errorBox.classList.add('app-login-error');

    this.form.append(this.errorBox);

    app.append(this.form);
  }
}