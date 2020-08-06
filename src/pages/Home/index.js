import { todos, FILTER_TYPE, EVENT_TYPE } from '../../constants';
import { MainLayout } from '../../components/MainLayout';
import { ToDoInput } from '../../components/ToDoInput';
import { ToDoList } from '../../components/ToDoList';
import { ToDoAllButton } from '../../components/ToDoAllButton';
import { ToDoControls } from '../../components/ToDoControls';
import { validateToDoInput, validateLogin } from '../../validation';

export class Home {
  constructor(elem, isAuthenticated) {
    this.elem = elem;
    this.filterState = FILTER_TYPE.ALL;
    this.todos = todos;
    this.isAuthenticated = isAuthenticated;
  }

  render() {
    this.elem.innerHTML = '';

    const mainLayout = new MainLayout(this.elem, this.isAuthenticated);

    mainLayout.render();

    const app = document.getElementById('app');

    const toDoInput = new ToDoInput(app);

    const toDoList = new ToDoList(app);

    const toDoAllButton = new ToDoAllButton(app, this.todos);

    const toDoControls = new ToDoControls(app, this.todos);

    const errorBox = document.createElement('div');

    errorBox.classList.add('app-error');

    app.append(errorBox);

    toDoInput.on(EVENT_TYPE.EVENT_TODO_ADDED, (todo) => {
      this.addToDo(todo);

      toDoAllButton.update();
      toDoList.render(this.getTodosByFilterState());
      toDoControls.render();
    });

    toDoInput.on(EVENT_TYPE.EVENT_INPUT_VALIDATION, (errorMsg) => {
      this.updateErrorMessage(errorMsg);
    });

    toDoAllButton.on(EVENT_TYPE.EVENT_TODO_TOGGLED, (checked) => {
      this.setStatusCompleted(checked);

      toDoList.render(this.getTodosByFilterState());
      toDoControls.render();
    });

    toDoList.on(EVENT_TYPE.EVENT_TODO_EDITED, (todo) => {
      const { id, completed, title } = todo;

      this.editToDoById(id, completed, title);

      toDoList.render(this.getTodosByFilterState());
      toDoAllButton.update();
      toDoControls.render();
    });

    toDoList.on(EVENT_TYPE.EVENT_TODO_REMOVED, (id) => {
      this.removeToDoById(id);

      const updatedTodos = this.getTodosByFilterState()

      toDoList.render(updatedTodos);
      toDoAllButton.update(updatedTodos);
      toDoControls.render(updatedTodos);
    });

    toDoList.on(EVENT_TYPE.EVENT_INPUT_VALIDATION, (errorMsg) => {
      this.updateErrorMessage(errorMsg);
    });

    toDoControls.on(EVENT_TYPE.EVENT_FILTER_APPLIED, (filterState) => {
      this.filterState = filterState;

      toDoList.render(this.getTodosByFilterState());
    });

    toDoControls.on(EVENT_TYPE.EVENT_CLEAR_COMPLETED, () => {
      this.clearCompletedToDos();

      toDoList.render(this.getTodosByFilterState());
      toDoControls.render();
    });

    toDoAllButton.render();
    toDoInput.render();
    toDoList.render(this.todos);
    toDoControls.render();
  }

  getActiveTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  getTodosByFilterState() {
    let filterState = this.filterState

    if (filterState === FILTER_TYPE.ALL) {
      return this.todos;
    }

    if (filterState === FILTER_TYPE.ACTIVE) {
      return this.getActiveTodos();
    }

    if (filterState === FILTER_TYPE.COMPLETED) {
      return this.getCompletedTodos();
    }

  }

  editToDoById(id, completed, title) {
    const todo = this.todos.find((todo) => todo.id === id);

    todo.completed = completed;
    todo.title = title;
  }

  removeToDoById(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  setStatusCompleted(checked) {
    this.todos.forEach((todo) => {
      todo.completed = checked;
    });
  }

  updateErrorMessage(errorMsg) {
    const errorBox = document.querySelector('.app-error');

    errorBox.textContent = errorMsg;
  }

  addToDo(todo) {
    const id = this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 0;

    this.todos.push({ ...todo, id });
  }

  clearCompletedToDos() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }
}