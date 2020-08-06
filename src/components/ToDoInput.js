import { EventEmitter } from '../util/EventEmitter';
import { EVENT_TYPE } from '../constants';
import { validateToDoInput } from '../validation';

export class ToDoInput {
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
      const errorMsg = validateToDoInput(e.target.value);

      if (errorMsg) {
        return this.emit(EVENT_TYPE.EVENT_INPUT_VALIDATION, errorMsg);
      }

      this.emit(EVENT_TYPE.EVENT_INPUT_VALIDATION, errorMsg);

      const title = e.target.value;
      const completed = false;

      const todo = { title, completed };

      e.target.value = '';

      this.emit(EVENT_TYPE.EVENT_TODO_ADDED, todo);
    }
  }

  onInput = (e) => {
    const errorMsg = validateToDoInput(e.target.value);

    this.emit(EVENT_TYPE.EVENT_INPUT_VALIDATION, errorMsg);
  }

  render() {
    this.elem.append(this.input);
  }
} 