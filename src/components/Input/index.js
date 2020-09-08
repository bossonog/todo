import React, { memo, useEffect } from 'react';

import './index.scss';

const Input = React.forwardRef(
  (
    {
      type,
      placeholder,
      className,
      value,
      name,
      error,
      defaultValue,
      isFocused,
    },
    ref
  ) => {
    useEffect(() => {
      if (isFocused) {
        ref.current.focus();
      }
    }, [isFocused]);

    return (
      <div className={className}>
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="input-control input"
          name={name}
          value={value}
          ref={ref}
        />
        <div className="input-error">{error}</div>
      </div>
    );
  }
);

export default memo(Input);
