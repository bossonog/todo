class App {
  constructor() {
    this.root = document.getElementById('root');
    this.filterState = FILTER_TYPE.ALL;
  }

  renderHomePage() {
    const mainLayout = new MainLayout(this.root);

    mainLayout.render();

    const app = document.querySelector('.app');

    const toDoInput = new ToDoInput(app);

    const toDoList = new ToDoList(app);

    const toDoAllButton = new ToDoAllButton(app);

    const toDoControls = new ToDoControls(app);

    toDoInput.on(EVENT_TODO_ADDED, (todo) => {
      this.addToDo(todo);

      toDoAllButton.update();
      toDoList.render(this.getTodosByFilterState());
      toDoControls.render();
    });

    toDoInput.on(EVENT_INPUT_VALIDATION, (errorMsg) => {
      this.updateErrorMessage(errorMsg);
    });

    toDoAllButton.on(EVENT_TODO_TOGGLED, (checked) => {
      this.setStatusCompleted(checked);

      toDoList.render(this.getTodosByFilterState());
      toDoControls.render();
    });

    toDoList.on(EVENT_TODO_EDITED, (todo) => {
      const { id, completed, title } = todo;

      this.editToDoById(id, completed, title);

      toDoList.render(this.getTodosByFilterState());
      toDoAllButton.update();
      toDoControls.render();
    });

    toDoList.on(EVENT_TODO_REMOVED, (id) => {
      this.removeToDoById(id);

      toDoList.render(this.getTodosByFilterState());
      toDoAllButton.update();
      toDoControls.render();
    });

    toDoList.on(EVENT_INPUT_VALIDATION, (errorMsg) => {
      this.updateErrorMessage(errorMsg);
    });

    toDoControls.on(EVENT_FILTER_APPLIED, (filterState) => {
      this.filterState = filterState;

      toDoList.render(this.getTodosByFilterState());
    });

    toDoControls.on(EVENT_CLEAR_COMPLETED, () => {
      this.clearCompletedToDos();

      toDoList.render(this.getTodosByFilterState());
      toDoControls.render();
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

  getTodosByFilterState() {
    let filterState = this.filterState
    let filteredTodos = []

    if (filterState === FILTER_TYPE.ALL) {
      filteredTodos = todos;
    } else if (filterState === FILTER_TYPE.ACTIVE) {
      filteredTodos = this.getActiveTodos();
    } else if (filterState === FILTER_TYPE.COMPLETED) {
      filteredTodos = this.getCompletedTodos();
    }

    return filteredTodos;
  }

  editToDoById(id, completed, title) {
    const todo = todos.find((todo) => todo.id === id);

    todo.completed = completed;
    todo.title = title;
  }

  removeToDoById(id) {
    todos = todos.filter((todo) => todo.id !== id);
  }

  setStatusCompleted(checked) {
    todos.forEach((todo) => {
      todo.completed = checked;
    });
  }

  updateErrorMessage(errorMsg) {
    const errorBox = document.querySelector('.app-error');

    errorBox.textContent = errorMsg;
  }

  addToDo(todo) {
    const id = todos.length ? todos[todos.length - 1].id + 1 : 0;

    todos.push({ ...todo, id });
  }

  clearCompletedToDos() {
    todos = todos.filter((todo) => !todo.completed);
  }

  render() {
    const path = '/home';

    if (path === '/home') {
      this.renderHomePage();
    } else if (path === '/login') {
      this.renderLogin();
    }
  }
}

const app = new App();

app.render();