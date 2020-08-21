import React, { memo } from 'react';

import './index.scss';
import { connect } from 'react-redux';
import { SET_FILTER_TYPE } from '../../app/todos/actionTypes';

const Filters = ({ selectedType, options, setFilterType }) => (
  <div className="todos-filters">
    {Object.keys(options).map((type) => (
      <button
        type="button"
        className={`todos-filter-btn button ${
          type === selectedType ? 'active' : ''
        }`}
        key={options[type].id}
        onClick={() => setFilterType(type)}
      >
        {options[type].title}
      </button>
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  selectedType: state.todos.filterType,
});

const mapDispatchToProps = (dispatch) => ({
  setFilterType: (filterType) =>
    dispatch({ type: SET_FILTER_TYPE.REQUEST, payload: { filterType } }),
});

const FiltersContainer = connect(mapStateToProps, mapDispatchToProps)(Filters);

export default memo(FiltersContainer);
