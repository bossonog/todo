import { todos, EVENT_TYPE } from './constants';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

export class App {
  constructor() {
    this.root = document.getElementById('root');
    this.todos = todos;
  }

  isAuthenticated() {
    return Boolean(localStorage.getItem('auth'));
  }

  render() {
    const login = new Login(this.root, this.isAuthenticated);
    const home = new Home(this.root, this.isAuthenticated);

    login.on(EVENT_TYPE.LOGIN_SUCCESS, () => {
      home.render();
    });

    this.isAuthenticated() ? home.render() : login.render();
  }
}