import { EventEmitter } from '../../../util/EventEmitter';
import { EVENT_TYPE } from '../../../constants';

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

    // this.input = new Input({
    //   elem: this.elem,
    //   type: 'text',
    //   placeholder: 'What needs to be done?',
    //   isFocused: true,
    //   classList: ['app-new-todo', 'input'],
    //   onInput: this.onInput,
    //   onSubmit: this.onSubmit,
    //   validationFunctions: [isEmpty, isValidToDoTitle],
    // });
  }

  on = (eventName, fn) => {
    this.eventEmitter.on(eventName, fn)
  }

  emit = (eventName, data) => {
    this.eventEmitter.emit(eventName, data)
  }

  onSubmit = (e) => {
    if (e.keyCode === 13) {
      const title = e.target.value;
      const completed = false;

      const todo = { title, completed };

      this.emit(EVENT_TYPE.TODO_ADDED, todo);
    }
  }

  onInput = (e) => {
    this.emit(EVENT_TYPE.INPUT_VALIDATION, e.target.value);
  }

  clearInput = () => {
    this.input.value = '';
  }

  render = () => {
    this.elem.append(this.input);
  }
} 