import React, { useState, useEffect, memo } from 'react';

import { ToDos } from './components';

import { FILTER_TYPE } from '../../constants/filter';

import { processValidationsArray, isEmpty, hasSymbols } from '../../util/validations';

const Home = () => {
  const [todos, setToDos] = useState([
    {
      id: 3,
      title: 'todo 3',
      completed: true,
    },
  ]);

  const [isAllCompleted, setIsAllCompleted] = useState(false);

  const [filterType, setFilterType] = useState(FILTER_TYPE.ALL);

  const [toDoError, setToDoError] = useState('');

  useEffect(() => {
    const checked = todos.every((todo) => todo.completed);

    setIsAllCompleted(checked);
  }, [todos]);

  const removeToDo = (id) => {
    setToDos(todos.filter((todo) => todo.id !== id));
  };

  const changeToDo = (t) => {
    setToDos(todos.map((todo) => (todo.id === t.id ? { ...todo, ...t } : todo)));
  };

  const addToDo = (e) => {
    if (e.keyCode === 13) {
      const title = e.target.value.trim();
      const errorMsg = processValidationsArray([isEmpty, hasSymbols], title);

      if (errorMsg) {
        return setToDoError(errorMsg);
      }

      const id = todos.length ? todos[todos.length - 1].id + 1 : 1;

      e.target.value = '';

      setToDos([...todos, { id, title, completed: false }]);
    }
  };

  const updateToDoInputError = (e) => {
    const errorMsg = processValidationsArray([isEmpty, hasSymbols], e.target.value.trim());

    setToDoError(errorMsg);
  };

  const toggleAllToDos = () => {
    setToDos(todos.map((todo) => ({ ...todo, completed: !isAllCompleted })));
  };

  const clearCompleted = () => {
    setToDos(todos.filter((todo) => !todo.completed));
  };

  const getActiveToDos = () => todos.filter((todo) => !todo.completed);

  const getCompletedToDos = () => todos.filter((todo) => todo.completed);

  const getToDosByFilterState = () => {
    let filteredToDos = [];

    if (filterType === FILTER_TYPE.ALL) {
      filteredToDos = todos;
    }

    if (filterType === FILTER_TYPE.ACTIVE) {
      filteredToDos = getActiveToDos();
    }

    if (filterType === FILTER_TYPE.COMPLETED) {
      filteredToDos = getCompletedToDos();
    }

    return filteredToDos;
  };

  const hasAtLeastOneCompleted = () => todos.find((todo) => todo.completed);

  const getCompletedToDosLength = () => getActiveToDos().length;

  const itemsLeft = getCompletedToDosLength();

  let itemsLeftString = '';

  if (itemsLeft === 0 || itemsLeft > 1) {
    itemsLeftString = `${itemsLeft} items left`;
  } else {
    itemsLeftString = `${itemsLeft} item left`;
  }

  return (
    <ToDos
      todos={getToDosByFilterState()}
      removeToDo={removeToDo}
      onKeyDown={addToDo}
      onAllBtnClick={toggleAllToDos}
      onClearBtnClick={clearCompleted}
      hasAtLeastOneCompleted={hasAtLeastOneCompleted()}
      setFilterType={setFilterType}
      changeToDo={changeToDo}
      itemsLeftString={itemsLeftString}
      isAllCompleted={isAllCompleted}
      filterType={filterType}
      toDoError={toDoError}
      onInput={updateToDoInputError}
    />
  );
};

export default memo(Home);
