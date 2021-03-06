import React, { memo, useCallback, useEffect } from 'react';
import { ToDos } from './components';
import {
  processValidationsArray,
  isEmpty,
  hasSymbols,
} from '../../util/validations';
import { connect } from 'react-redux';
import {
  CHANGE_TODO,
  TOGGLE_ALL_TODOS_STATUS,
  CLEAR_ALL_COMPLETED,
  ADD_TODO,
  REMOVE_TODO,
  SET_TODO_VALIDATION_ERROR,
  FETCH_ALL_TODOS,
} from '../../app/todos/actionTypes';
import {
  isAllToDosCompleted,
  hasAtLeastOneCompleted,
  getActivesToDosString,
} from '../../app/todos/selectors';

const Home = ({
  filterType,
  todos,
  isAllCompleted,
  hasAtLeastOneCompleted,
  changeToDo,
  toggleAllToDos,
  clearCompleted,
  addToDo,
  removeToDo,
  toDoError,
  setToDoError,
  itemsLeftString,
  getAllToDos,
  totalPages,
  currentPage,
}) => {
  useEffect(() => {
    getAllToDos({ page: 1 });
  }, []);

  const handleAddToDo = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        const title = e.target.value;

        addToDo({ title });

        e.target.value = '';
      }
    },
    [addToDo]
  );

  const updateToDoInputError = useCallback(
    (e) => {
      const errorMsg = processValidationsArray(
        [isEmpty, hasSymbols],
        e.target.value.trim()
      );

      if (errorMsg) {
        return setToDoError(errorMsg);
      }

      setToDoError('');
    },
    [setToDoError]
  );

  return (
    <ToDos
      todos={todos}
      removeToDo={removeToDo}
      onKeyDown={handleAddToDo}
      onAllBtnClick={toggleAllToDos}
      onClearBtnClick={clearCompleted}
      hasAtLeastOneCompleted={hasAtLeastOneCompleted}
      changeToDo={changeToDo}
      itemsLeftString={itemsLeftString}
      isAllCompleted={isAllCompleted}
      filterType={filterType}
      toDoError={toDoError}
      onInput={updateToDoInputError}
      loadMoreTodos={getAllToDos}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos.list,
  isAuthenticated: state.authentication.isAuthenticated,
  isAllCompleted: isAllToDosCompleted(state),
  hasAtLeastOneCompleted: hasAtLeastOneCompleted(state),
  toDoError: state.todos.error,
  itemsLeftString: getActivesToDosString(state),
  totalPages: state.todos.totalPages,
  currentPage: state.todos.page,
});

const mapDispatchToProps = (dispatch) => ({
  changeToDo: (todo) =>
    dispatch({ type: CHANGE_TODO.REQUEST, payload: { todo } }),
  toggleAllToDos: () => dispatch({ type: TOGGLE_ALL_TODOS_STATUS.REQUEST }),
  clearCompleted: () => dispatch({ type: CLEAR_ALL_COMPLETED.REQUEST }),
  addToDo: (todo) => dispatch({ type: ADD_TODO.REQUEST, payload: { todo } }),
  removeToDo: (id) => dispatch({ type: REMOVE_TODO.REQUEST, payload: { id } }),
  setToDoError: (error) =>
    dispatch({ type: SET_TODO_VALIDATION_ERROR.REQUEST, payload: { error } }),
  getAllToDos: ({ page }) => {
    dispatch({ type: FETCH_ALL_TODOS.REQUEST, payload: { page } });
  },
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default memo(HomeContainer);
