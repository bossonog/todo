class ToDoAllButton {
  constructor(elem) {
    this.elem = elem;
    this.button = null;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init() {
    this.button = document.createElement('span');

    this.button.classList.add('material-icons');

    this.button.id = 'app-checkall';
    this.button.textContent = 'check_box';

    const checked = todos.every((todo) => todo.completed);

    if (checked) {
      this.button.classList.add('checked');
    }

    this.button.addEventListener('click', this.onClick);
  }

  on(eventName, fn) {
    this.eventEmitter.on(eventName, fn);
  }

  emit(eventName, data) {
    this.eventEmitter.emit(eventName, data);
  }

  onClick = (e) => {
    e.target.classList.toggle('checked');

    const checked = e.target.classList.contains('checked');

    todos.forEach((todo) => {
      todo.completed = checked;
    });

    this.emit(EVENT_TODO_TOGGLED);
  }

  update() {
    const checked = todos.every((todo) => todo.completed);

    if (checked) {
      return this.button.classList.add('checked');
    }

    this.button.classList.remove('checked');
  }

  render() {
    this.elem.append(this.button);
  }
}