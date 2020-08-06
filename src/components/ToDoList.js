import { ToDoItem } from '../components/ToDoItem';
import { EventEmitter } from '../util/EventEmitter';
import { EVENT_TYPE } from '../constants';

export class ToDoList {
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

      item.on(EVENT_TYPE.EVENT_TODO_EDITED, (todo) => {
        this.emit(EVENT_TYPE.EVENT_TODO_EDITED, todo);
      });

      item.on(EVENT_TYPE.EVENT_TODO_REMOVED, (id) => {
        this.emit(EVENT_TYPE.EVENT_TODO_REMOVED, id);
      });

      // item.on(EVENT_TYPE.EVENT_INPUT_VALIDATION, (errorMsg) => {
      //   this.emit(EVENT_TYPE.EVENT_INPUT_VALIDATION, errorMsg)
      // })

      item.render();
    });

    if (!document.querySelector('.app-todos')) {
      this.elem.append(this.list);
    }
  }
}