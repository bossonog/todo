import { createSelector } from 'reselect';

// export const getActiveToDos = (state) => state.todos.todos.filter((todo) => !todo.completed);
// export const getCompletedToDos = (state) => state.todos.todos.filter((todo) => todo.completed);
// export const getCompletedToDosLength = (state) => getActiveToDos(state).length;

export const isAllToDosCompleted = (state) =>
  state.todos.list.every((todo) => todo.completed);

export const getToDos = (state) => state.todos.list;

export const hasAtLeastOneCompleted = (state) =>
  state.todos.list.some((todo) => todo.completed);

export const getActivesToDosString = createSelector([getToDos], (todos) => {
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  if (itemsLeft === 0 || itemsLeft > 1) {
    return `${itemsLeft} items left`;
  }

  return `${itemsLeft} item left`;
});
