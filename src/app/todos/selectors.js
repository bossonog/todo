import { createSelector } from 'reselect';
import { TODO_STATUS } from '../../constants/todos';

export const isAllToDosCompleted = (state) =>
  state.todos.list.every((todo) => todo.status === TODO_STATUS.COMPLETED);

export const getToDos = (state) => state.todos.list;

export const hasAtLeastOneCompleted = (state) =>
  state.todos.list.some((todo) => todo.status === TODO_STATUS.COMPLETED);

export const getFilterType = (state) => state.todos.filterType;

export const getCurrentPage = (state) => state.todos.page;

export const getActivesToDosString = createSelector([getToDos], (todos) => {
  const itemsLeft = todos.filter(
    (todo) => todo.status === TODO_STATUS.UNCOMPLETED
  ).length;

  if (itemsLeft === 0 || itemsLeft > 1) {
    return `${itemsLeft} items left`;
  }

  return `${itemsLeft} item left`;
});
