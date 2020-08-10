import React, { useEffect } from 'react';

import './index.scss';

const ToDo = ({ todo, removeToDo, changeToDo }) => (
  <li className={`todo ${todo.completed && 'completed'}`} onDoubleClick={() => {}}>
    <span className="todo-checkbox material-icons" onClick={() => changeToDo(todo.id)}>
      {todo.completed ? 'check_box' : 'check_box_outline_blank'}
    </span>
    <span className="todo-title">{todo.title}</span>
    <span
      className="todo-remove material-icons"
      onClick={() => removeToDo(todo.id)}
    >
      delete
    </span>
  </li>
);

export default ToDo;
