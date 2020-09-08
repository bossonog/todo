import React, { memo } from 'react';
import { Input } from '../../../../../components';
import { isEmpty, hasSymbols } from '../../../../../util/validations';

import './index.scss';
import { TODO_STATUS } from '../../../../../constants/todos';

const ToDo = ({
  todo,
  onDblClick,
  isEditing,
  handleDeleteClick,
  handleCheckboxClick,
  onInput,
  onSubmit,
}) => (
  <li
    className={`todo ${
      todo.status === TODO_STATUS.COMPLETED ? 'completed' : ''
    }`}
  >
    <span
      className={`todo-checkbox material-icons ${isEditing ? 'hidden' : ''}`}
      onClick={() =>
        handleCheckboxClick({
          ...todo,
          status:
            todo.status === TODO_STATUS.COMPLETED
              ? TODO_STATUS.UNCOMPLETED
              : TODO_STATUS.COMPLETED,
        })
      }
    >
      {todo.status === TODO_STATUS.COMPLETED
        ? 'check_box'
        : 'check_box_outline_blank'}
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
