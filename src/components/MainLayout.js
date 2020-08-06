export class MainLayout {
  constructor(root, isAuthenticated) {
    this.root = root;
    this.wrapper = null;
    this.isAuthenticated = isAuthenticated;

    this.init();
  }

  init() {
    this.wrapper = document.createElement('div');

    this.wrapper.classList.add('wrapper');

    const header = document.createElement('header');

    header.classList.add('header');

    const containerHeader = document.createElement('div');

    containerHeader.classList.add('container');

    const h1 = document.createElement('h1');

    h1.textContent = 'todos';

    h1.classList.add('app-title', 'title');

    const logoutBtn = document.createElement('button');

    logoutBtn.hidden = !this.isAuthenticated();

    logoutBtn.textContent = 'Logout';

    logoutBtn.classList.add('header-logout');

    logoutBtn.addEventListener('click', (e) => {
      localStorage.removeItem('auth');
      window.location.reload();
    });

    containerHeader.append(logoutBtn);
    containerHeader.append(h1);
    header.append(containerHeader);
    this.wrapper.append(header);

    const main = document.createElement('main');

    main.classList.add('main');

    const section = document.createElement('section');

    section.classList.add('section', 'todoapp');

    const containerApp = document.createElement('div');

    containerApp.classList.add('container');

    const app = document.createElement('div');

    app.id = 'app';

    containerApp.append(app);
    section.append(containerApp);
    main.append(section);

    this.wrapper.append(main);
  }

  render() {
    this.root.append(this.wrapper);
  }
}