class ToDoItem {
  constructor(list, todo) {
    this.list = list;
    this.todo = todo;
    this.li = null;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init() {
    this.li = document.createElement('li');

    this.li.classList.add('app-todo');
    this.li.textContent = this.todo.title;
    this.li.dataset.id = this.todo.id;

    this.todo.completed ? this.li.classList.add('completed') : this.li.classList.remove('completed');

    const checkbox = document.createElement('span');

    checkbox.textContent = this.todo.completed ? 'check_box' : 'check_box_outline_blank';

    checkbox.classList.add('material-icons', 'app-todo-checkbox');

    checkbox.addEventListener('click', this.checkboxOnClick);

    this.li.append(checkbox);

    const remover = document.createElement('button');

    remover.textContent = 'x';

    remover.classList.add('app-todo-remove', 'button');

    remover.addEventListener('click', this.removerOnClick);

    this.li.append(remover);
  }

  on(eventName, fn) {
    this.eventEmitter.on(eventName, fn);
  }

  emit(eventName, data) {
    this.eventEmitter.emit(eventName, data);
  }

  checkboxOnClick = (e) => {
    this.todo.completed = !this.todo.completed;

    this.emit(EVENT_TODO_EDITED);
  }

  removerOnClick = (e) => {
    const id = +this.li.dataset.id;
    todos = todos.filter((todo) => todo.id !== id);

    this.emit(EVENT_TODO_REMOVED);
  }

  render() {
    this.list.append(this.li);
  }
}