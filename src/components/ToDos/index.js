import React from 'react';

import './toDos.scss';

import ToDo from './ToDo';

const ToDos = ({ todos }) => (
  <div className="todos">
    <div className="todos-header">
      <span id="todos-checkall" className="material-icons">check_box</span>
      <input className="todos-new-todo input" type="text" placeholder="What needs to be done?" autoFocus />
    </div>
    <ul className="todos-list">
      {todos.map((todo) => (
        <ToDo todo={todo} key={todo.id} />
      ))}
    </ul>
  </div>
);

export default ToDos;
