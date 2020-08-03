class ToDoInput {
  constructor(elem) {
    this.elem = elem;
    this.input = null;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init() {
    this.input = document.createElement('input');

    this.input.type = 'text';
    this.input.placeholder = 'What needs to be done?';
    this.input.autofocus = true;

    this.input.classList.add('app-new-todo', 'input');

    this.input.addEventListener('keydown', this.onSubmit);
    this.input.addEventListener('input', this.onInput);
  }

  on(eventName, fn) {
    this.eventEmitter.on(eventName, fn)
  }

  emit(eventName, data) {
    this.eventEmitter.emit(eventName, data)
  }

  onSubmit = (e) => {
    if (e.keyCode === 13) {
      const errorMsg = validate(e.target.value);

      if (errorMsg) {
        return this.emit(EVENT_INPUT_VALIDATION, errorMsg);
      }

      this.emit(EVENT_INPUT_VALIDATION, errorMsg);

      const id = todos.length ? todos[todos.length - 1].id + 1 : 0;
      const title = e.target.value;
      const completed = false;

      const todo = { id, title, completed };

      todos.push(todo);

      e.target.value = '';

      this.emit(EVENT_TODO_ADDED);
    }
  }

  onInput = (e) => {
    const errorMsg = validate(e.target.value);

    this.emit(EVENT_INPUT_VALIDATION, errorMsg);
  }

  render() {
    this.elem.append(this.input);
  }
} 