let filterState = ALL;

const getToDo = (ul, todo) => {
  const li = document.createElement('li');

  li.classList.add('app-todo');
  li.textContent = todo.title;
  li.dataset.id = todo.id;

  todo.completed ? li.classList.add('completed') : li.classList.remove('completed');

  const checkbox = document.createElement('span');

  checkbox.textContent = todo.completed ? 'check_box' : 'check_box_outline_blank';

  checkbox.classList.add('material-icons', 'app-todo-checkbox');

  const checkboxClickHandler = (e) => {
    todo.completed = !todo.completed;

    if (filterState === ALL) {
      renderToDos(ul, todos);
    } else if (filterState === ACTIVE) {
      renderToDos(ul, getActiveTodos());
    } else if (filterState === COMPLETED) {
      renderToDos(ul, getCompletedTodos())
    }

    updateTodosCounter();
    updateClearButton();
  }

  checkbox.addEventListener('click', checkboxClickHandler);

  li.append(checkbox);

  const remover = document.createElement('button');

  remover.textContent = 'x';

  remover.classList.add('app-todo-remove', 'button');

  const removerClickHandler = () => {
    const id = +li.dataset.id;

    todos = todos.filter((todo) => todo.id !== id);

    renderToDos(ul, todos);
    updateTodosCounter();
  }

  remover.addEventListener('click', removerClickHandler);

  li.append(remover);

  return li;
}

const renderToDos = (ul, todos) => {
  while (ul.firstChild) {
    ul.firstChild.remove();
  }

  todos.forEach((todo) => {
    const li = getToDo(ul, todo);

    ul.append(li);
  });
}

const getNewToDoInput = (ul, controls) => {
  const input = document.createElement('input');

  input.type = 'text';
  input.placeholder = 'What needs to be done?';
  input.autofocus = true;

  input.classList.add('app-new-todo', 'input');

  const inputKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      const errorMsg = validate(e.target.value);

      if (errorMsg) {
        return updateInputError(errorMsg);
      }

      updateInputError('');

      const id = todos.length ? todos[todos.length - 1].id + 1 : 0;
      const title = e.target.value;
      const completed = false;

      const todo = { id, title, completed };

      todos.push(todo);

      const li = getToDo(ul, todo);

      e.target.value = '';

      renderToDos(ul, todos);

      document.getElementById('app-checkall').classList.remove('checked');

      updateTodosCounter();

      filterState = 'all';

      renderAppFilters(ul, controls);
    }
  }

  input.addEventListener('keydown', inputKeyDownHandler);
  input.addEventListener('input', (e) => {
    const errorMsg = validate(e.target.value);

    if (errorMsg) {
      return updateInputError(errorMsg);
    }

    updateInputError('');
  })

  return input;
}

const getCheckAllBtn = (ul) => {
  const checkAllBtn = document.createElement('span');

  checkAllBtn.classList.add('material-icons');

  checkAllBtn.id = 'app-checkall';
  checkAllBtn.textContent = 'check_box';

  const checked = todos.every((todo) => todo.completed);

  if (checked) {
    checkAllBtn.classList.add('checked');
  }

  const checkAllClickHandler = (e) => {
    e.target.classList.toggle('checked');

    const checked = e.target.classList.contains('checked');

    todos.forEach((todo) => {
      todo.completed = checked;
    });

    updateClearButton();
    updateTodosCounter();
    renderToDos(ul, todos);
  }

  checkAllBtn.addEventListener('click', checkAllClickHandler);

  const todoClickHandler = (e) => {
    if (e.target.tagName === 'SPAN' || e.target.tagName === 'BUTTON') {
      const checked = todos.every((todo) => todo.completed);

      checked ? checkAllBtn.classList.add('checked') : checkAllBtn.classList.remove('checked');
    }
  }

  ul.addEventListener('click', todoClickHandler);

  return checkAllBtn;
}

const getAppControls = (ul) => {
  const controls = document.createElement('div');

  controls.classList.add('app-controls');

  const span = document.createElement('span');

  const counter = getActiveTodosQuantity();

  span.classList.add('app-todos-count');
  span.textContent = `${counter} items left`;

  controls.append(span);

  renderAppFilters(ul, controls);
  renderClearAllCompletedButton(ul, controls);

  return controls;
}

const renderAppFilters = (ul, controls) => {
  const oldAppFilters = document.querySelector('.app-filters');

  if (oldAppFilters) {
    oldAppFilters.remove();
  }

  const appFilters = document.createElement('div');

  appFilters.classList.add('app-filters');

  const allBtn = document.createElement('button');

  allBtn.classList.add('app-all-btn', 'app-filter-btn', 'button', 'active');

  allBtn.textContent = "All";

  const allBtnClickHandler = (e) => {
    filterState = 'all';

    renderToDos(ul, todos);
    renderAppFilters(ul, controls);
  }

  allBtn.addEventListener('click', allBtnClickHandler);

  const activeBtn = document.createElement('button');

  activeBtn.classList.add('app-active-btn', 'app-filter-btn', 'button');

  activeBtn.textContent = "Active";

  const activeBtnClickHandler = (e) => {
    filterState = ACTIVE;

    renderToDos(ul, getActiveTodos());
    renderAppFilters(ul, controls);
  }

  activeBtn.addEventListener('click', activeBtnClickHandler);

  const completedBtn = document.createElement('button');

  completedBtn.classList.add('app-completed-btn', 'app-filter-btn', 'button');

  completedBtn.textContent = "Completed";

  const completedBtnClickHandler = (e) => {
    filterState = 'completed';

    renderToDos(ul, getCompletedTodos());
    renderAppFilters(ul, controls);
  }

  completedBtn.addEventListener('click', completedBtnClickHandler);

  if (filterState === ALL) {
    allBtn.classList.add('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
  } else if (filterState === ACTIVE) {
    activeBtn.classList.add('active');
    allBtn.classList.remove('active');
    completedBtn.classList.remove('active');
  } else if (filterState === COMPLETED) {
    completedBtn.classList.add('active');
    allBtn.classList.remove('active');
    activeBtn.classList.remove('active');
  }

  appFilters.append(allBtn);
  appFilters.append(activeBtn);
  appFilters.append(completedBtn);

  controls.append(appFilters);
}

const renderClearAllCompletedButton = (ul, controls) => {
  const clearBtn = document.createElement('button');

  clearBtn.classList.add('app-clear-btn', 'button');

  clearBtn.textContent = 'Clear completed';

  if (!isAtLeastOneCompleted()) {
    clearBtn.hidden = true;
  }

  const clearBtnClickHandler = () => {
    todos = todos.filter((todo) => !todo.completed);
    renderToDos(ul, todos);
  }

  clearBtn.addEventListener('click', clearBtnClickHandler);

  controls.append(clearBtn);
}

const updateTodosCounter = () => {
  const span = document.querySelector('.app-todos-count');

  const counter = getActiveTodosQuantity();

  span.textContent = `${counter} items left`;
}

const updateClearButton = () => {
  const clearBtn = document.querySelector('.app-clear-btn');
  clearBtn.hidden = !isAtLeastOneCompleted();
}

const getActiveTodosQuantity = () => {
  return getActiveTodos().length;
}

const getActiveTodos = () => {
  return todos.filter((todo) => !todo.completed);
}

const getCompletedTodos = () => {
  return todos.filter((todo) => todo.completed);
}

const isAtLeastOneCompleted = () => {
  return todos.find((todo) => todo.completed);
}

const getRootLayout = () => {
  const wrapper = document.createElement('div');

  wrapper.classList.add('wrapper');

  const header = document.createElement('header');

  header.classList.add('header');

  const containerHeader = document.createElement('div');

  containerHeader.classList.add('container');

  const h1 = document.createElement('h1');

  h1.textContent = 'todos';

  h1.classList.add('app-title', 'title');

  containerHeader.append(h1);
  header.append(containerHeader);
  wrapper.append(header);

  const main = document.createElement('main');

  main.classList.add('main');

  const section = document.createElement('section');

  section.classList.add('section', 'todoapp');

  const containerApp = document.createElement('div');

  containerApp.classList.add('container');

  const app = document.createElement('div');

  app.classList.add('app');

  const erroBox = document.createElement('div');

  erroBox.classList.add('app-error');

  app.append(erroBox);
  containerApp.append(app);
  section.append(containerApp);
  main.append(section);
  wrapper.append(main);

  return wrapper;
}

const validate = (str) => {
  let errorMsg = '';

  if (!str) {
    errorMsg = 'The string must not be empty';
  } else if (!/^\w+( \w+)*$/.test(str)) {
    errorMsg = 'The string must not contain symbols';
  }

  return errorMsg;
}

const updateInputError = (str) => {
  const errorBox = document.querySelector('.app-error');

  errorBox.textContent = str;
}

const render = () => {
  const root = document.querySelector('#root');

  root.append(getRootLayout());

  const app = document.querySelector('.app');

  const ul = document.createElement('ul');

  ul.classList.add('app-todos');

  renderToDos(ul, todos);

  const checkAllBtn = getCheckAllBtn(ul);

  const controls = getAppControls(ul);

  const input = getNewToDoInput(ul, controls);

  app.append(checkAllBtn);
  app.append(input);
  app.append(ul);
  app.append(controls);
}

render();