const getToDo = (todo) => {
  const li = document.createElement('li');

  li.classList.add('app-todo');
  li.textContent = todo.title;
  li.dataset.id = todo.id;

  todo.completed ? li.classList.add('completed') : li.classList.remove('completed');

  const todoClickHandler = (e) => {
    todo.completed = !todo.completed;
    e.target.classList.toggle('completed');

    updateTodosCounter();

    const clearBtn = document.querySelector('.app-clear-btn');

    clearBtn.hidden = !isAtLeastOneCompleted();
  }

  li.addEventListener('click', todoClickHandler);

  const remover = document.createElement('button');

  remover.textContent = 'x';

  remover.classList.add('app-todo-remove', 'button');

  const removerClickHandler = () => {
    const id = +li.dataset.id;

    todos = todos.filter((todo) => todo.id !== id);

    li.remove();
  }

  // change parentNode
  remover.addEventListener('click', removerClickHandler);

  li.append(remover);

  return li;
}

const renderToDos = (ul, todos) => {
  while (ul.firstChild) {
    ul.firstChild.remove();
  }

  todos.forEach((todo) => {
    const li = getToDo(todo);

    ul.append(li);
  });
}

const getNewToDoInput = (ul) => {
  const input = document.createElement('input');

  input.type = 'text';
  input.placeholder = 'What needs to be done?';
  input.autofocus = true;

  input.classList.add('app-new-todo', 'input');

  const inputKeyDownHandler = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      const id = todos.length ? todos[todos.length - 1].id + 1 : 0;
      const title = e.target.value;
      const completed = false;

      const todo = { id, title, completed };

      todos.push(todo);

      const li = getToDo(todo);

      e.target.value = '';

      ul.append(li);

      document.querySelector('.app-checkall').classList.remove('checked');

      updateTodosCounter();
    }
  }

  input.addEventListener('keydown', inputKeyDownHandler)

  return input;
}

const getCheckAllBtn = (ul) => {
  const checkAllBtn = document.createElement('span');

  checkAllBtn.classList.add('material-icons', 'app-checkall');
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

    updateTodosCounter();
    renderToDos(ul, todos);
  }

  checkAllBtn.addEventListener('click', checkAllClickHandler);

  const todoClickHandler = (e) => {
    if (e.target.tagName === 'LI' || e.target.tagName === 'BUTTON') {
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

  const appFilters = getAppFilter(ul);

  controls.append(span);
  controls.append(appFilters);

  renderClearAllCompletedButton(ul, controls);

  return controls;
}

const getAppFilter = (ul) => {
  const appFilters = document.createElement('div');

  appFilters.classList.add('app-filters');

  const allBtn = document.createElement('button');

  allBtn.classList.add('app-all-btn', 'app-filter-btn', 'button');

  allBtn.textContent = "All";
  allBtn.addEventListener('click', () => renderToDos(ul, todos));

  const activeBtn = document.createElement('button');

  activeBtn.classList.add('app-active-btn', 'app-filter-btn', 'button');

  activeBtn.textContent = "Active";
  activeBtn.addEventListener('click', () => renderToDos(ul, getActiveTodos()));

  const completedBtn = document.createElement('button');

  completedBtn.classList.add('app-completed-btn', 'app-filter-btn', 'button');

  completedBtn.textContent = "Completed";
  completedBtn.addEventListener('click', () => renderToDos(ul, getCompletedTodos()));

  appFilters.append(allBtn);
  appFilters.append(activeBtn);
  appFilters.append(completedBtn);

  return appFilters;
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

const getActiveTodosQuantity = () => {
  return todos.filter((todo) => todo.completed === false).length;
}

const getActiveTodos = () => {
  return todos.filter((todo) => todo.completed === false);
}

const getCompletedTodos = () => {
  return todos.filter((todo) => todo.completed);
}

const isAtLeastOneCompleted = () => {
  return todos.find((todo) => todo.completed);
}

const render = () => {
  const root = document.querySelector('#root');

  root.innerHTML = rootTemplate;

  const app = document.querySelector('.app');

  const ul = document.createElement('ul');

  ul.classList.add('app-todos');

  renderToDos(ul, todos);

  const input = getNewToDoInput(ul);

  const checkAllBtn = getCheckAllBtn(ul);

  const controls = getAppControls(ul);

  app.append(checkAllBtn);
  app.append(input);
  app.append(ul);
  app.append(controls);
}

render();