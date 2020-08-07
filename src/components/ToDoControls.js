import { EventEmitter } from '../util/EventEmitter';
import { ToDoCounter } from '../components/ToDoCounter';
import { ToDoFilters } from '../components/ToDoFilters';
import { ToDoClearButton } from '../components/ToDoClearButton';
import { EVENT_TYPE } from '../constants';

export class ToDoControls {
  constructor(elem, todos) {
    this.controls = null;
    this.counter = null;
    this.filters = null;
    this.clearBtn = null;
    this.elem = elem;
    this.eventEmitter = new EventEmitter();
    this.todos = todos;

    this.init();
  }

  init = () => {
    this.controls = document.createElement('div');

    this.controls.classList.add('app-controls');

    this.counter = new ToDoCounter(this.controls, this.todos);

    this.counter.render();

    this.filters = new ToDoFilters(this.controls);

    this.filters.on(EVENT_TYPE.FILTER_APPLIED, (filteredTodos) => {
      this.emit(EVENT_TYPE.FILTER_APPLIED, filteredTodos);
    });

    this.filters.render();

    this.clearBtn = new ToDoClearButton(this.controls, this.todos);

    this.clearBtn.on(EVENT_TYPE.CLEAR_COMPLETED, () => {
      this.emit(EVENT_TYPE.CLEAR_COMPLETED);
    });

    this.clearBtn.render();
  }

  on = (eventName, fn) => {
    this.eventEmitter.on(eventName, fn)
  }

  emit = (eventName, data) => {
    this.eventEmitter.emit(eventName, data)
  }

  render = (todos) => {
    this.todos = todos;

    this.counter.update(this.todos);
    this.clearBtn.update(this.todos);

    if (!document.querySelector('.app-controls')) {
      this.elem.append(this.controls);
    }
  }
}