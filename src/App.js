class App {
  constructor() {
    this.root = null;
  }

  render() {
    this.root = document.getElementById('root');

    const mainLayout = new MainLayout(this.root);

    mainLayout.render();

    const app = document.querySelector('.app');

    const toDoInput = new ToDoInput(app);

    const toDoList = new ToDoList(app, todos);

    const toDoAllButton = new ToDoAllButton(app);

    toDoInput.on(EVENT_TODO_ADDED, () => {
      toDoAllButton.update();
      toDoList.render();
    })

    toDoInput.on(EVENT_INPUT_VALIDATION, (errorMsg) => {
      const errorBox = document.querySelector('.app-error');

      errorBox.textContent = errorMsg;
    })

    toDoAllButton.on(EVENT_TODO_TOGGLED, () => {
      toDoList.render();
    });

    toDoList.on(EVENT_TODO_CHANGED, () => {
      toDoAllButton.update();
    })

    toDoAllButton.render();
    toDoInput.render();
    toDoList.render();

    // this.renderToDoInput()
  }

  // async getTodos() {
  //   const response = httpGet('/api/todos')

  //   this.renderTodos(response.data.list)
  // }

  // renderToDoInput() {
  //   const toDoInput = new ToDoInput(app);
  //   toDoInput.on('added-todo', this.renderToDoList)
  //   // input.emit('add-todo')
  //   toDoInput.render();

  //   const toDoList = new ToDoList(app, todos);

  //   toDoList.render();
  // }

  // renderToDoList() {
  //   // render todos here
  // }
}

const app = new App();

app.render();