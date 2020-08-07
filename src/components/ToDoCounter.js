export class ToDoCounter {
  constructor(elem, todos) {
    this.elem = elem;
    this.span = null;
    this.counter = null;
    this.todos = todos;

    this.init();
  }

  init = () => {
    this.counter = this.getActiveTodosQuantity();

    this.span = document.createElement('span');

    this.span.classList.add('app-todos-count');
    this.span.textContent = `${this.counter} item${this.isMultipleOrZero() ? 's' : ''} left`;
  }

  update = (todos) => {
    this.todos = todos;

    this.counter = this.getActiveTodosQuantity();

    this.span.textContent = `${this.counter} item${this.isMultipleOrZero() ? 's' : ''} left`;
  }

  isMultipleOrZero = () => {
    const activeTodos = this.getActiveTodosQuantity();

    if (activeTodos === 0 || activeTodos > 1) {
      return true;
    }
    return false;
  }

  getActiveTodosQuantity = () => {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  render = () => {
    this.elem.append(this.span);
  }
}