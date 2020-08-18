import React, { memo } from 'react';

import './index.scss';

const Button = ({ title, className, onClick }) => (
  <button
    type="button"
    className={`button ${className}`}
    onClick={onClick}
  >
    {title}
  </button>
);

export default memo(Button);
