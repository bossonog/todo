class ToDoCounter {
  constructor(elem) {
    this.elem = elem;
    this.span = null;
    this.counter = this.getActiveTodosQuantity();

    this.init();
  }

  init() {
    this.span = document.createElement('span');

    this.span.classList.add('app-todos-count');
    this.span.textContent = `${this.counter} items left`;
  }

  update() {
    this.counter = this.getActiveTodosQuantity();

    this.span.textContent = `${this.counter} items left`;
  }

  getActiveTodosQuantity() {
    return todos.filter((todo) => !todo.completed).length;
  }

  render() {
    this.elem.append(this.span);
  }
}