class ToDoList {
  constructor(elem) {
    this.elem = elem;
    this.list = null;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init() {
    this.list = document.createElement('ul');

    this.list.classList.add('app-todos');
  }

  on(eventName, fn) {
    this.eventEmitter.on(eventName, fn);
  }

  emit(eventName, data) {
    this.eventEmitter.emit(eventName, data);
  }

  clearToDoList() {
    while (this.list.firstChild) {
      this.list.firstChild.remove();
    }
  }

  render(todosToRender) {
    this.clearToDoList()

    todosToRender.forEach((todo) => {
      const item = new ToDoItem(this.list, todo);

      item.on(EVENT_TODO_EDITED, () => {
        this.emit(EVENT_TODO_CHANGED);
      });

      item.on(EVENT_TODO_REMOVED, () => {
        this.emit(EVENT_TODO_CHANGED);
      });

      item.render();
    });

    if (!document.querySelector('.app-todos')) {
      this.elem.append(this.list);
    }
  }
}