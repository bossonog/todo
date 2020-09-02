import React from 'react';

import './index.scss';

const ErrorBox = ({ className, error }) => (
  <div className={`${className} error-box`}>{error}</div>
);

export default ErrorBox;
