const app = document.querySelector('.app');

const addToDo = (todo) => {
  if (todo.title) {
    const li = document.createElement('li');

    li.classList.add('app-item');
    li.textContent = todo.title;

    todo.completed ? li.classList.add('completed') : li.classList.remove('completed');

    li.addEventListener('click', (e) => {
      todo.completed = !todo.completed;
      e.target.classList.toggle('completed');
    })

    const remover = document.createElement('button');

    remover.textContent = 'x';

    remover.classList.add('app-item-remove', 'button');

    remover.addEventListener('click', (e) => {
      e.target.parentNode.remove();
    });

    li.append(remover);

    return li;
  }
}

const render = () => {
  while (app.firstChild) {
    app.firstChild.remove();
  }

  // Add checkall button
  const checkall = document.createElement('span');

  checkall.classList.add('material-icons', 'app-checkall');
  checkall.textContent = 'check_box';

  checkall.addEventListener('click', (e) => {
    todos.forEach((todo) => {
      todo.completed = true;
    });

    render();
  })

  app.append(checkall);

  // Add main input
  const input = document.createElement('input');

  input.type = 'text';
  input.placeholder = 'What needs to be done?';
  input.autofocus = true;

  input.classList.add('app-new-todo', 'input');

  input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      const todo = {
        title: e.target.value,
        completed: false,
      };

      todos.push(todo);

      const li = addToDo(todo);

      if (li) {
        ul.append(li);
      }
    }
  })

  app.append(input);

  // Add list
  const ul = document.createElement('ul');

  ul.classList.add('app-list');

  todos.forEach((todo) => {
    const li = addToDo(todo);

    ul.append(li);
  });

  app.append(ul);

  // Add footer
  const footer = document.createElement('div');
}

render();