import { MainLayout } from './components/MainLayout';
import { ToDoInput } from './components/ToDoInput';
import { ToDoList } from './components/ToDoList';
import { ToDoAllButton } from './components/ToDoAllButton';
import { ToDoControls } from './components/ToDoControls';
import { todos, FILTER_TYPE, EVENT_TYPE, USER } from './constants';
import { validateToDoInput, validateLogin } from './validation';
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
    // const home = new Home(this.root);

    // home.render();

    const login = new Login(this.root, this.isAuthenticated);
    const home = new Home(this.root, this.isAuthenticated);

    login.on(EVENT_TYPE.EVENT_LOGIN_SUCCESS, () => {
      home.render();
    });

    this.isAuthenticated() ? home.render() : login.render();

    // const path = window.location.pathname;
    // window.addEventListener('hashchange', this.onHashChanged);

    // this.isAuthenticated() ? this.renderHomePage() : this.renderLogin();

    // this.renderHomePage();
    // if (path === '/') {
    //   this.renderHomePage();
    // } else if (path === 'login') {
    //   this.renderLogin();
    // }
  }

  // onHashChanged = () => {
  //   const hash = window.location.hash;
  //   const view = document.querySelector('.app');

  //   if (!(view instanceof HTMLElement)) {
  //     throw new ReferenceError('No router view element available for rendering');
  //   }

  //   switch (hash) {
  //     case '':
  //       this.isAuthenticated() && this.renderHomePage();
  //       break;

  //     case '#login':
  //       console.log(!this.isAuthenticated())
  //       !this.isAuthenticated() && this.renderLogin();
  //       break;

  //     default:
  //       view.innerHTML = '<h2>Page Not Found</h2>';
  //       break;
  //   }
}