import { createSelector } from 'reselect';

// export const getActiveToDos = (state) => state.todos.todos.filter((todo) => !todo.completed);
// export const getCompletedToDos = (state) => state.todos.todos.filter((todo) => todo.completed);
// export const getCompletedToDosLength = (state) => getActiveToDos(state).length;

export const isAllToDosCompleted = (state) =>
  state.todos.todos.every((todo) => todo.completed);

export const getToDos = (state) => state.todos.todos;

export const hasAtLeastOneCompleted = (state) =>
  state.todos.todos.find((todo) => todo.completed);

export const getActivesToDosString = createSelector([getToDos], (todos) => {
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  let itemsLeftString = '';

  if (itemsLeft === 0 || itemsLeft > 1) {
    itemsLeftString = `${itemsLeft} items left`;
  } else {
    itemsLeftString = `${itemsLeft} item left`;
  }

  return itemsLeftString;
});
