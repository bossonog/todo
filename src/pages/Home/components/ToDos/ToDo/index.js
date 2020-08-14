import React, { memo } from 'react';

import './index.scss';

import { Input } from '../../../../../components';

import { isEmpty, hasSymbols } from '../../../../../util/validations';

const ToDo = ({
  todo,
  onDblClick,
  isEditing,
  handleDeleteClick,
  handleCheckboxClick,
  onInput,
  onSubmit,
}) => (
  <li className={`todo ${todo.completed ? 'completed' : ''}`}>
    <span
      className={`todo-checkbox material-icons ${isEditing ? 'hidden' : ''}`}
      onClick={() => handleCheckboxClick({ ...todo, completed: !todo.completed })}
    >
      {todo.completed ? 'check_box' : 'check_box_outline_blank'}
    </span>
    <div className="todo-edit-box" onDoubleClick={() => onDblClick(todo.id)}>
      {isEditing ? (
        <Input
          type="text"
          value={todo.title}
          className="todo-input"
          isFocused
          onInput={(e) => onInput({ ...todo, title: e.target.value })}
          onSubmit={onSubmit}
          validationFunctions={[isEmpty, hasSymbols]}
        />
      ) : (
        <span className="todo-title">{todo.title}</span>
      )}
    </div>
    <span
      className={`todo-remove material-icons ${isEditing ? 'hidden' : ''}`}
      onClick={() => handleDeleteClick(todo.id)}
    >
      delete
    </span>
  </li>
);
export default memo(ToDo);
