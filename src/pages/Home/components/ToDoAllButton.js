import { EventEmitter } from '../../../util/EventEmitter';
import { EVENT_TYPE } from '../../../constants';

export class ToDoAllButton {
  constructor(elem, todos) {
    this.elem = elem;
    this.button = null;
    this.todos = todos;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init = () => {
    this.button = document.createElement('span');

    this.button.classList.add('material-icons');

    this.button.id = 'app-checkall';
    this.button.textContent = 'check_box';

    const checked = this.isAllToDosCompleted();

    if (checked) {
      this.button.classList.add('checked');
    }

    this.button.addEventListener('click', this.onClick);
  }

  on = (eventName, fn) => {
    this.eventEmitter.on(eventName, fn);
  }

  emit = (eventName, data) => {
    this.eventEmitter.emit(eventName, data);
  }

  onClick = (e) => {
    if (this.todos.length) {
      e.target.classList.toggle('checked');

      const checked = e.target.classList.contains('checked');

      this.emit(EVENT_TYPE.TODO_TOGGLED, checked);
    }
  }

  isAllToDosCompleted = () => {
    return this.todos.every((todo) => todo.completed);
  }

  update = (todos) => {
    this.todos = todos;

    const checked = this.isAllToDosCompleted();

    if (checked) {
      return this.button.classList.add('checked');
    }

    this.button.classList.remove('checked');
  }

  render = () => {
    this.elem.append(this.button);
  }
}