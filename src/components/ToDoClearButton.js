class ToDoClearButton {
  constructor(elem) {
    this.elem = elem;
    this.button = null;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init() {
    this.button = document.createElement('button');

    this.button.classList.add('app-clear-btn', 'button');

    this.button.textContent = 'Clear completed';

    if (!this.isAtLeastOneCompleted()) {
      this.button.hidden = true;
    }

    this.button.addEventListener('click', this.onClick);
  }

  on(eventName, fn) {
    this.eventEmitter.on(eventName, fn)
  }

  emit(eventName, data) {
    this.eventEmitter.emit(eventName, data)
  }

  onClick = (e) => {
    todos = todos.filter((todo) => !todo.completed);

    this.emit(EVENT_CLEAR_COMPLETED);
  }

  update() {
    this.button.hidden = !this.isAtLeastOneCompleted();
  }

  isAtLeastOneCompleted() {
    return todos.find((todo) => todo.completed);
  }

  render() {
    this.elem.append(this.button);
  }
}