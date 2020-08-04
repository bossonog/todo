class App {
  constructor() {
    this.root = document.getElementById('root');
    this.filterState = ALL;
  }

  renderHomePage() {
    const mainLayout = new MainLayout(this.root);

    mainLayout.render();

    const app = document.querySelector('.app');

    const toDoInput = new ToDoInput(app);

    const toDoList = new ToDoList(app);

    const toDoAllButton = new ToDoAllButton(app);

    const toDoControls = new ToDoControls(app);

    toDoInput.on(EVENT_TODO_ADDED, () => {
      toDoAllButton.update();
      toDoList.render(this.getTodosByFilterState(this.filterState));
      toDoControls.render();
    });

    toDoInput.on(EVENT_INPUT_VALIDATION, (errorMsg) => {
      const errorBox = document.querySelector('.app-error');

      errorBox.textContent = errorMsg;
    });

    toDoAllButton.on(EVENT_TODO_TOGGLED, () => {
      toDoList.render(this.getTodosByFilterState(this.filterState));//
      toDoControls.render();
    });

    toDoList.on(EVENT_TODO_CHANGED, () => {
      toDoList.render(this.getTodosByFilterState(this.filterState));//
      toDoAllButton.update();
      toDoControls.render();
    });

    toDoControls.on(EVENT_FILTER_APPLIED, (filterState) => {
      this.filterState = filterState;

      toDoList.render(this.getTodosByFilterState(this.filterState));
    });

    toDoControls.on(EVENT_CLEAR_COMPLETED, () => {
      toDoList.render(this.getTodosByFilterState(this.filterState));
    });

    toDoAllButton.render();
    toDoInput.render();
    toDoList.render(todos);
    toDoControls.render();
  }

  getActiveTodos() {
    return todos.filter((todo) => !todo.completed);
  }

  getCompletedTodos() {
    return todos.filter((todo) => todo.completed);
  }

  getTodosByFilterState(filterState) {
    let filteredTodos = []

    if (filterState === ALL) {
      filteredTodos = todos;
    } else if (filterState === ACTIVE) {
      filteredTodos = this.getActiveTodos();
    } else if (filterState === COMPLETED) {
      filteredTodos = this.getCompletedTodos();
    }

    return filteredTodos;
  }

  render() {
    const path = '/home';

    if (path === '/home') {
      this.renderHomePage();
    } else if (path === '/login') {
      this.renderLogin();
    }
  }

  // async getTodos() {
  //   const response = httpGet('/api/todos')

  //   this.renderTodos(response.data.list)
  // }

  // renderToDoInput() {
  //   const toDoInput = new ToDoInput(app);
  //   toDoInput.on('added-todo', this.renderToDoList)
  //   // input.emit('add-todo')
  //   toDoInput.render();

  //   const toDoList = new ToDoList(app, todos);

  //   toDoList.render();
  // }

  // renderToDoList() {
  //   render todos here
  // }
}

const app = new App();

app.render();