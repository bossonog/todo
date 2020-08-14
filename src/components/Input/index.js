import React, {
  useRef,
  useEffect,
  memo,
  useState,
} from 'react';

import { processValidationsArray } from '../../util/validations';

import './index.scss';

const Input = ({
  type,
  placeholder,
  className,
  validationFunctions = [],
  value,
  isFocused,
  onSubmit,
  onInput,
  onBlur,
}) => {
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const validate = (val) => processValidationsArray(validationFunctions, val);

  const handleSubmit = (e) => {
    if (e.keyCode === 13) {
      const str = e.target.value.trim();
      const errorMsg = validate(str);

      if (!errorMsg) {
        setError('');

        return onSubmit(e);
      }

      setError(errorMsg);
    }
  };

  const handleInput = (e) => {
    const str = e.target.value.trim();
    const errorMsg = validate(str);

    if (!errorMsg) {
      setError('');

      return onInput(e);
    }

    setError(errorMsg);
  };

  return (
    <div className={className}>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="input-control input"
        onKeyDown={handleSubmit}
        onInput={handleInput}
        onBlur={onBlur}
        ref={inputRef}
      />
      <div className="input-error">
        {error}
      </div>
    </div>
  );
};

export default memo(Input);
