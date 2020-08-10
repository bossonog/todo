import React, { useState, useEffect } from 'react';

import './index.scss';

import ToDo from './ToDo';

const ToDos = ({
  todos,
  addToDo,
  removeToDo,
  changeToDo,
  toggleAllToDos,
  itemsLeftString,
  isAllCompleted,
  clearCompleted,
  hasAtLeastOneCompleted,
}) => (
  <div className="todos">
    <div className="todos-header">
      <span
        id="todos-checkall"
        className={`material-icons ${isAllCompleted ? 'checked' : ''}`}
        onClick={toggleAllToDos}
      >
        check_box
      </span>
      <input
        className="todos-new-todo input"
        type="text"
        placeholder="What needs to be done?"
        onKeyDown={addToDo}
      />
    </div>
    <ul className="todos-list">
      {todos.map((todo) => (
        <ToDo todo={todo} key={todo.id} removeToDo={removeToDo} changeToDo={changeToDo} />
      ))}
    </ul>
    <div className="todos-controls">
      <span className="todos-counter">{itemsLeftString}</span>
      <button
        className="todos-clear-btn button"
        type="button"
        onClick={clearCompleted}
        hidden={!hasAtLeastOneCompleted()}
      >
        Clear completed
      </button>
    </div>
  </div>
);
export default ToDos;
