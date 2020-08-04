class ToDoControls {
  constructor(elem) {
    this.controls = null;
    this.counter = null;
    this.filters = null;
    this.clearBtn = null;
    this.elem = elem;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init() {
    this.controls = document.createElement('div');

    this.controls.classList.add('app-controls');

    this.counter = new ToDoCounter(this.controls);

    this.counter.render();

    this.filters = new ToDoFilters(this.controls);

    this.filters.on(EVENT_FILTER_APPLIED, (filteredTodos) => {
      this.emit(EVENT_FILTER_APPLIED, filteredTodos);
    });

    this.filters.render();

    this.clearBtn = new ToDoClearButton(this.controls);

    this.clearBtn.on(EVENT_CLEAR_COMPLETED, () => {
      this.emit(EVENT_CLEAR_COMPLETED);
    });

    this.clearBtn.render();
  }

  on(eventName, fn) {
    this.eventEmitter.on(eventName, fn)
  }

  emit(eventName, data) {
    this.eventEmitter.emit(eventName, data)
  }

  render() {
    this.counter.update();
    this.clearBtn.update();
    this.elem.append(this.controls);
  }
}