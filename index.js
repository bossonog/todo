const getToDo = (todo) => {
  const li = document.createElement('li');

  li.classList.add('app-todo');
  li.textContent = todo.title;
  li.dataset.id = todo.id;

  todo.completed ? li.classList.add('completed') : li.classList.remove('completed');

  li.addEventListener('click', (e) => {
    todo.completed = !todo.completed;
    e.target.classList.toggle('completed');
  })

  const remover = document.createElement('button');

  remover.textContent = 'x';

  remover.classList.add('app-todo-remove', 'button');

  // change parentNode
  remover.addEventListener('click', (e) => {
    const id = +li.dataset.id;

    todos = todos.filter((todo) => todo.id !== id);

    li.remove();
  });

  li.append(remover);

  return li;
}

const renderToDos = (ul) => {
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

  input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 && e.target.value) {
      const id = todos[todos.length - 1].id + 1;
      const title = e.target.value;
      const completed = false;

      const todo = { id, title, completed };

      todos.push(todo);

      const li = getToDo(todo);

      e.target.value = '';

      ul.append(li);
    }
  })

  return input;
}

const getCheckAllBtn = (ul) => {
  const checkAll = document.createElement('span');

  checkAll.classList.add('material-icons', 'app-checkall');
  checkAll.textContent = 'check_box';

  let checked = false;

  checkAll.addEventListener('click', (e) => {
    checked = !checked;

    todos.forEach((todo) => {
      todo.completed = checked;
    });

    renderToDos(ul);
  })

  return checkAll;
}

const render = () => {
  const root = document.querySelector('#root');

  root.innerHTML = rootTemplate;

  const app = document.querySelector('.app');

  const ul = document.createElement('ul');

  ul.classList.add('app-todos');

  renderToDos(ul);

  const input = getNewToDoInput(ul);

  const checkAllBtn = getCheckAllBtn(ul);

  app.append(checkAllBtn);
  app.append(input);
  app.append(ul);

  // Add footer
  // const footer = document.createElement('div');
}

render();