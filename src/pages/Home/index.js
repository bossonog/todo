import React, { useState, useEffect } from 'react';

import { ToDos } from '../../components';

const Home = () => {
  const [todos, setToDos] = useState([
    {
      id: 1,
      title: 'todo 1',
      completed: false,
    },
    {
      id: 2,
      title: 'todo 2',
      completed: false,
    },
    {
      id: 3,
      title: 'todo 3',
      completed: true,
    },
  ]);

  const [isAllCompleted, setIsAllCompleted] = useState(false);

  useEffect(() => {
    const checked = todos.every((todo) => todo.completed);

    setIsAllCompleted(checked);
  }, [todos]);

  const removeToDo = (id) => {
    setToDos(todos.filter((todo) => todo.id !== id));
  };

  const changeToDo = (id) => {
    setToDos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const addToDo = (e) => {
    if (e.keyCode === 13) {
      const title = e.target.value;
      const id = todos.length ? todos[todos.length - 1].id + 1 : 0;

      e.target.value = '';

      setToDos([...todos, { id, title, completed: false }]);
    }
  };

  const toggleAllToDos = () => {
    setToDos(todos.map((todo) => ({ ...todo, completed: !isAllCompleted })));
  };

  const clearCompleted = () => {
    setToDos(todos.filter((todo) => !todo.completed));
  };

  const hasAtLeastOneCompleted = () => todos.find((todo) => todo.completed);

  const getCompletedToDosLength = () => todos.filter((todo) => !todo.completed).length;

  const itemsLeft = getCompletedToDosLength();

  let itemsLeftString = '';

  if (itemsLeft === 0 || itemsLeft > 1) {
    itemsLeftString = `${itemsLeft} items left`;
  } else {
    itemsLeftString = `${itemsLeft} item left`;
  }

  return (
    <ToDos
      todos={todos}
      setToDos={setToDos}
      removeToDo={removeToDo}
      changeToDo={changeToDo}
      addToDo={addToDo}
      toggleAllToDos={toggleAllToDos}
      clearCompleted={clearCompleted}
      hasAtLeastOneCompleted={hasAtLeastOneCompleted}
      itemsLeftString={itemsLeftString}
      isAllCompleted={isAllCompleted}
    />
  );
};

export default Home;
