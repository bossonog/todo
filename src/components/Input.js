export class Input {
  constructor({
    elem,
    type = 'text',
    placeholder = '',
    classList = '',
    isFocused = false,
    validationFunctions = [],
    value = '',
    onInput = () => { },
    onSubmit = () => { },
  }) {
    this.elem = elem;
    this.type = type;
    this.placeholder = placeholder;
    this.classList = classList;
    this.isFocused = isFocused;
    this.validationFunctions = validationFunctions;
    this.value = value;
    this.onInput = onInput;
    this.onSubmit = onSubmit;

    this.wrapper = null;
    this.input = null;
    this.errorBox = null;

    this.init();
  }

  init = () => {
    this.wrapper = document.createElement('div');

    this.wrapper.classList.add('input');

    this.classList.forEach((c) => this.wrapper.classList.add(c));

    this.input = document.createElement('input');

    this.input.type = this.type;
    this.input.placeholder = this.placeholder;
    this.input.autofocus = this.isFocused;

    this.input.classList.add('input-control');

    this.input.addEventListener('input', this.handleChange);
    this.input.addEventListener('keydown', this.handleSubmit);

    this.errorBox = document.createElement('div');

    this.errorBox.classList.add('input-error');

    this.wrapper.append(this.input);
    this.wrapper.append(this.errorBox);
  }

  handleChange = (e) => {
    this.value = e.target.value;

    const error = this.validateValue(this.value);

    if (!error) {
      this.errorBox.textContent = '';

      return this.onInput(e);
    }

    this.errorBox.textContent = error;
  }

  handleSubmit = (e) => {
    this.value = e.target.value;

    const error = this.validateValue(this.value);

    if (!error) {
      this.errorBox.textContent = '';

      return this.onSubmit(e);
    }

    this.errorBox.textContent = error;
  }

  validateValue = (value) => {
    for (let validate of this.validationFunctions) {
      const error = validate(value);

      if (error) {
        return error;
      }
    }
  }

  updateError = () => {
    const error = this.validateValue(this.value);

    this.errorBox.textContent = error;

    return error;
  }

  render = () => {
    this.elem.append(this.wrapper);
  }
}