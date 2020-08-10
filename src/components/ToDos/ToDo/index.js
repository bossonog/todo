import React from 'react';

import './toDo.scss';

const ToDo = ({ todo }) => (
  <li className={`todo ${todo.completed && 'completed'}`}>
    <span className="todo-checkbox material-icons">{todo.completed ? 'check_box' : 'check_box_outline_blank'}</span>
    <span className="todo-title">{todo.title}</span>
    <button className="todo-remove button" type="button">X</button>
  </li>
);

export default ToDo;
