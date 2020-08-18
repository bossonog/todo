import React, { useState, memo } from 'react';

import './index.scss';

import ToDo from './ToDo';
import Filters from '../../../../components/Filters';
import { TODOS_FILTER_TYPE_OPTIONS } from '../../../../constants/filter';

const ToDos = ({
  todos,
  onKeyDown,
  removeToDo,
  changeToDo,
  onAllBtnClick,
  setFilterType,
  itemsLeftString,
  isAllCompleted,
  onClearBtnClick,
  hasAtLeastOneCompleted,
  filterType,
  toDoError,
  onInput,
}) => {
  const [editingToDo, setEditingToDo] = useState(0);

  return (
    <div className="todos">
      <div className="todos-error">{toDoError}</div>
      <div className="todos-header">
        <span
          className={`material-icons todos-checkall ${isAllCompleted ? 'checked' : ''}`}
          onClick={() => { onAllBtnClick(); setEditingToDo(0); }}
        >
          check_box
        </span>
        <input
          className="todos-new-todo input"
          type="text"
          placeholder="What needs to be done?"
          onKeyDown={(e) => { onKeyDown(e); setEditingToDo(0); }}
          onInput={onInput}
        />
      </div>
      <ul className="todos-list">
        {todos.map((todo) => (
          <ToDo
            todo={todo}
            key={todo.id}
            handleDeleteClick={removeToDo}
            handleCheckboxClick={changeToDo}
            onInput={changeToDo}
            onSubmit={() => setEditingToDo(0)}
            isEditing={editingToDo === todo.id}
            onDblClick={setEditingToDo}
          />
        ))}
      </ul>
      <div className="todos-controls">
        <span className="todos-counter">{itemsLeftString}</span>
        <Filters
          options={TODOS_FILTER_TYPE_OPTIONS}
          setFilterType={setFilterType}
          selectedType={filterType}
        />
        <button
          className={`todos-clear-btn button ${hasAtLeastOneCompleted ? '' : 'hidden'}`}
          type="button"
          onClick={() => { onClearBtnClick(); setEditingToDo(0); }}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};
export default memo(ToDos);
