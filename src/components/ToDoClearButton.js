import { EventEmitter } from '../util/EventEmitter';
import { EVENT_TYPE } from '../constants';

export class ToDoClearButton {
  constructor(elem, todos) {
    this.elem = elem;
    this.button = null;
    this.eventEmitter = new EventEmitter();
    this.todos = todos;

    this.init();
  }

  init = () => {
    this.button = document.createElement('button');

    this.button.classList.add('app-clear-btn', 'button');

    this.button.textContent = 'Clear completed';

    if (!this.isAtLeastOneCompleted()) {
      this.button.hidden = true;
    }

    this.button.addEventListener('click', this.onClick);
  }

  on = (eventName, fn) => {
    this.eventEmitter.on(eventName, fn)
  }

  emit = (eventName, data) => {
    this.eventEmitter.emit(eventName, data)
  }

  onClick = (e) => {
    this.emit(EVENT_TYPE.CLEAR_COMPLETED);
  }

  update = (todos) => {
    this.todos = todos;

    this.button.hidden = !this.isAtLeastOneCompleted();
  }

  isAtLeastOneCompleted = () => {
    return this.todos.find((todo) => todo.completed);
  }

  render = () => {
    this.elem.append(this.button);
  }
}