import React from 'react';

import './index.scss';

const Filters = ({ selectedType, options, setFilterType }) => (
  <div className="todos-filters">
    {Object.keys(options).map((type) => (
      <button
        type="button"
        className={`todos-filter-btn button ${type === selectedType ? 'active' : ''}`}
        key={options[type].id}
        onClick={() => setFilterType(type)}
      >
        {options[type].title}
      </button>
    ))}
  </div>
);

export default Filters;
