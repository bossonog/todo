import { EVENT_TYPE } from '../../../constants';
import { EventEmitter } from '../../../util/EventEmitter';

export class ToDoItem {
  constructor(list, todo) {
    this.list = list;
    this.todo = todo;
    this.checkbox = null;
    this.remover = null;
    this.li = null;
    this.editBox = null;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init = () => {
    this.li = document.createElement('li');

    this.li.classList.add('app-todo');
    this.li.textContent = this.todo.title;
    this.li.dataset.id = this.todo.id;

    this.todo.completed ? this.li.classList.add('completed') : this.li.classList.remove('completed');

    this.li.addEventListener('dblclick', this.liOnDblClick);

    this.checkbox = document.createElement('span');

    this.checkbox.textContent = this.todo.completed ? 'check_box' : 'check_box_outline_blank';

    this.checkbox.classList.add('material-icons', 'app-todo-checkbox');

    this.checkbox.addEventListener('click', this.checkboxOnClick);

    this.li.append(this.checkbox);

    this.remover = document.createElement('button');

    this.remover.textContent = 'x';

    this.remover.classList.add('app-todo-remove', 'button');

    this.remover.addEventListener('click', this.removerOnClick);

    this.li.append(this.remover);
  }

  on = (eventName, fn) => {
    this.eventEmitter.on(eventName, fn);
  }

  emit = (eventName, data) => {
    this.eventEmitter.emit(eventName, data);
  }

  liOnDblClick = (e) => {
    this.editBox = document.createElement('input');

    this.editBox.value = this.todo.title;

    setTimeout(() => {
      this.editBox.focus();
    }, 0);

    this.editBox.classList.add('app-todo-edit');

    this.editBox.addEventListener('keydown', this.editBoxOnEnterPressed);
    this.editBox.addEventListener('input', this.editBoxOnInputValidation)

    document.body.addEventListener('click', this.editBoxOnBodyClick);

    this.li.innerHTML = '';
    this.li.append(this.editBox);
  }

  checkboxOnClick = (e) => {
    this.emit(EVENT_TYPE.TODO_EDITED, { ...this.todo, completed: !this.todo.completed });
  }

  removerOnClick = (e) => {
    const id = +this.li.dataset.id;

    this.emit(EVENT_TYPE.TODO_REMOVED, id);
  }

  editBoxOnEnterPressed = (e) => {
    if (e.keyCode === 13) {
      this.editBoxSubmit(e.target.value);
    }
  }

  editBoxOnBodyClick = (e) => {
    if (this.editBox && e.target !== this.editBox) {
      this.editBoxSubmit(this.editBox.value);

      this.editBox = null;
    }
  }

  editBoxOnInputValidation = (e) => {

  }

  editBoxSubmit = (title) => {
    this.emit(EVENT_TYPE.TODO_EDITED, { ...this.todo, title });
  }

  render = () => {
    this.list.append(this.li);
  }
}