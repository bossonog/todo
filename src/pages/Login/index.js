import { Home } from '../Home';
import { validateLogin, validateUsername, validatePassword, isEmpty } from '../../validation';
import { USER, EVENT_TYPE } from '../../constants';
import { EventEmitter } from '../../util/EventEmitter';
import { MainLayout } from '../../components/MainLayout';

export class Login {
  constructor(elem, isAuthenticated) {
    this.elem = elem;
    this.eventEmitter = new EventEmitter();
    this.usernameInput = null;
    this.usernameErrorBox = null;
    this.passwordInput = null;
    this.passwordErrorBox = null;
    this.errorBox = null;
    this.isAuthenticated = isAuthenticated;

    this.init();
  }

  init() {

  }

  on(eventName, fn) {
    this.eventEmitter.on(eventName, fn)
  }

  emit(eventName, data) {
    this.eventEmitter.emit(eventName, data)
  }

  usernameOnInput = (e) => {
    let errorMsg = isEmpty(e.target.value);

    if (errorMsg) {
      e.target.classList.add('error');
      this.updateUsernameErrorBox(errorMsg);
    } else {
      e.target.classList.remove('error');
      this.updateUsernameErrorBox(errorMsg);
    }
  }

  passwordOnInput = (e) => {
    let errorMsg = isEmpty(e.target.value);

    if (errorMsg) {
      e.target.classList.add('error');
      this.updatePasswordErrorBox(errorMsg);
    } else {
      e.target.classList.remove('error');
      this.updatePasswordErrorBox('');
    }
  }

  onSubmit = (e) => {
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError !== '' || passwordError !== '') {
      this.updateUsernameErrorBox(usernameError);
      this.updatePasswordErrorBox(passwordError);

      return;
    }

    if (username === USER.username && password === USER.password) {
      localStorage.setItem('auth', true);

      this.emit(EVENT_TYPE.EVENT_LOGIN_SUCCESS);
    } else {
      this.errorBox.textContent = 'There is no user with provided credentials';
    }
  }

  updateUsernameErrorBox(errorMsg) {
    this.usernameErrorBox.textContent = errorMsg;
  }

  updatePasswordErrorBox(errorMsg) {
    this.passwordErrorBox.textContent = errorMsg;
  }

  updateErrorMessage(errorMsg) {
    this.errorBox.textContent = errorMsg;
  }

  render() {
    this.elem.innerHTML = '';

    const mainLayout = new MainLayout(this.elem, this.isAuthenticated);

    mainLayout.render();

    const app = document.getElementById('app');

    const div = document.createElement('div');

    div.classList.add('app-login');

    this.usernameInput = document.createElement('input');
    this.usernameErrorBox = document.createElement('div');

    this.usernameInput.type = 'text';
    this.usernameInput.placeholder = 'Login';

    this.usernameInput.classList.add('app-login-control');
    this.usernameErrorBox.classList.add('app-input-error');

    this.usernameInput.addEventListener('input', this.usernameOnInput);

    this.passwordInput = document.createElement('input');
    this.passwordErrorBox = document.createElement('div');

    this.passwordInput.type = 'password';
    this.passwordInput.placeholder = 'Password';

    this.passwordInput.classList.add('app-login-control');
    this.passwordErrorBox.classList.add('app-input-error');

    this.passwordInput.addEventListener('input', this.passwordOnInput);

    const signInBtn = document.createElement('button');
    this.errorBox = document.createElement('div');

    signInBtn.textContent = 'Sign In';

    signInBtn.classList.add('app-login-control');
    this.errorBox.classList.add('app-input-error');

    signInBtn.addEventListener('click', this.onSubmit);

    div.append(this.usernameInput);
    div.append(this.usernameErrorBox);

    div.append(this.passwordInput);
    div.append(this.passwordErrorBox);

    div.append(signInBtn);
    div.append(this.errorBox);

    app.append(div);
  }
}