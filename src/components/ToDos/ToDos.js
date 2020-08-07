import React from 'react';

import './ToDos.scss';

export const ToDos = () => {
  return (
    <div className='todos'>
      <div className="todos-header">
        <span id="todos-checkall" className="material-icons">check_box</span>
        <input className="todos-new-todo input" type="text" placeholder="What needs to be done?" autoFocus />
      </div>
      <ul className='todos-list'>
        <li className="app-todo">
          <span className="app-todo-checkbox material-icons">check_box_outline_blank</span>
          <span className="app-todo-title">Todo 1</span>
          <button className="app-todo-remove button">X</button>
        </li>
        <li className="app-todo">
          <span className="app-todo-checkbox material-icons">check_box_outline_blank</span>
          <span className="app-todo-title">Todo 2</span>
          <button className="app-todo-remove button">X</button>
        </li>
        <li className="app-todo">
          <span className="app-todo-checkbox material-icons">check_box_outline_blank</span>
          <span className="app-todo-title">Todo 3</span>
          <button className="app-todo-remove button">X</button>
        </li>
      </ul>
    </div>
  );
}