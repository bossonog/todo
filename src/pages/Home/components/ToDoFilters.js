import { EventEmitter } from '../../../util/EventEmitter';
import { EVENT_TYPE, FILTER_TYPE } from '../../../constants';

export class ToDoFilters {
  constructor(elem) {
    this.elem = elem;
    this.filters = null;
    this.filterState = FILTER_TYPE.ALL;
    this.eventEmitter = new EventEmitter();

    this.init();
  }

  init = () => {
    this.filters = document.createElement('div');

    this.filters.classList.add('app-filters');

    const allBtn = document.createElement('button');

    allBtn.classList.add('app-all-btn', 'app-filter-btn', 'button', 'active');

    allBtn.textContent = "All";

    const allBtnClickHandler = (e) => {
      this.filterState = FILTER_TYPE.ALL;

      allBtn.classList.add('active');
      activeBtn.classList.remove('active');
      completedBtn.classList.remove('active');

      this.emit(EVENT_TYPE.FILTER_APPLIED, this.filterState);
    }

    allBtn.addEventListener('click', allBtnClickHandler);

    const activeBtn = document.createElement('button');

    activeBtn.classList.add('app-active-btn', 'app-filter-btn', 'button');

    activeBtn.textContent = "Active";

    const activeBtnClickHandler = (e) => {
      this.filterState = FILTER_TYPE.ACTIVE;

      activeBtn.classList.add('active');
      allBtn.classList.remove('active');
      completedBtn.classList.remove('active');

      this.emit(EVENT_TYPE.FILTER_APPLIED, this.filterState);
    }

    activeBtn.addEventListener('click', activeBtnClickHandler);

    const completedBtn = document.createElement('button');

    completedBtn.classList.add('app-completed-btn', 'app-filter-btn', 'button');

    completedBtn.textContent = "Completed";

    const completedBtnClickHandler = (e) => {
      this.filterState = FILTER_TYPE.COMPLETED;

      completedBtn.classList.add('active');
      allBtn.classList.remove('active');
      activeBtn.classList.remove('active');

      this.emit(EVENT_TYPE.FILTER_APPLIED, this.filterState);
    }

    completedBtn.addEventListener('click', completedBtnClickHandler);

    this.filters.append(allBtn);
    this.filters.append(activeBtn);
    this.filters.append(completedBtn);
  }

  on = (eventName, fn) => {
    this.eventEmitter.on(eventName, fn)
  }

  emit = (eventName, data) => {
    this.eventEmitter.emit(eventName, data)
  }

  render = () => {
    this.elem.append(this.filters);
  }
}